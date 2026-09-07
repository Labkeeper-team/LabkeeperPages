/* eslint-disable */
/**
 * Labkeeper Blog Generator
 * Скрипт автоматической генерации статей блога для Labkeeper.
 * 
 * Что делает:
 * 1. Читает статьи из JSON-файлов в папке articles-data/ (или переданного через аргумент).
 * 2. Генерирует чистовые страницы в src/blog/<slug>.html на основе template.html.
 * 3. Добавляет карточку статьи в src/blog.html (если её там еще нет).
 * 4. Добавляет статью в реестр ALL_BLOG_ARTICLES в src/assets/js/slider.js (для блока «Другие статьи»).
 * 5. Автоматически перегенерирует src/sitemap.xml через npm run sitemap.
 * 
 * Запуск:
 *   node scripts/blog-generator/generate.js
 *   node scripts/blog-generator/generate.js path/to/articles.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Пути
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const DATA_DIR = path.join(__dirname, 'articles-data');
const BLOG_DIR = path.join(SRC_DIR, 'blog');
const BLOG_HTML_PATH = path.join(SRC_DIR, 'blog.html');
const INDEX_HTML_PATH = path.join(SRC_DIR, 'index.html');
const SLIDER_JS_PATH = path.join(SRC_DIR, 'assets', 'js', 'slider.js');

// Соответствие категорий
const CATEGORY_NAMES = {
    'latex': 'Работа с LaTeX',
    'markdown': 'Работа с Markdown',
    'labs': 'Лабораторные работы',
    'diploma': 'Дипломные работы',
    'cv': 'Оформление резюме / CV',
    'articles': 'Оформление научных статей'
};

const MONTHS_RU = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function formatDisplayDate(dateStr) {
    if (!dateStr) {
        const now = new Date();
        return `${now.getDate()} ${MONTHS_RU[now.getMonth()]} ${now.getFullYear()}`;
    }
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    return `${day} ${MONTHS_RU[month - 1]} ${year}`;
}

function getIsoDate(dateStr) {
    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
    }
    return new Date().toISOString().split('T')[0];
}

// Загрузка шаблона
function loadTemplate() {
    if (!fs.existsSync(TEMPLATE_PATH)) {
        throw new Error(`Шаблон не найден по пути: ${TEMPLATE_PATH}`);
    }
    return fs.readFileSync(TEMPLATE_PATH, 'utf8');
}

// Сборка HTML тегов
function renderTags(categories) {
    return categories
        .filter(cat => CATEGORY_NAMES[cat])
        .map(cat => `                        <a href="/blog#${cat}" class="article-tag">${CATEGORY_NAMES[cat]}</a>`)
        .join('\n');
}

// Сборка оглавления (TOC)
function renderToc(tocList, sections) {
    const items = tocList || sections.map(s => ({ id: s.id, title: s.title }));
    return items
        .map(item => `                            <li><a href="#${item.id}" class="article-toc__link">${sanitizeCardText(item.title)}</a></li>`)
        .join('\n');
}

// Сборка секций статьи
function renderSections(sections) {
    return sections.map(section => {
        return `                    <section class="article-section" id="${section.id}">
                        <h2 class="article-section__title">${sanitizeCardText(section.title)}</h2>
${section.html}
                    </section>`;
    }).join('\n\n');
}

// Сборка блока практических советов
function renderTips(tips) {
    if (!tips || tips.length === 0) return '';

    const tipsHtml = tips.map((tip, idx) => `                            <div class="article-tip">
                                <div class="article-tip__number">${idx + 1}</div>
                                <div class="article-tip__content">
                                    <h3>${tip.title}</h3>
                                    ${tip.html}
                                </div>
                            </div>`).join('\n');

    return `                    <section class="article-section" id="tips">
                        <h2 class="article-section__title">Практические советы</h2>
                        <div class="article-tips">
${tipsHtml}
                        </div>
                    </section>`;
}

// Определение номера пачки по статье с самой свежей датой
function getLatestArticleBatchNumber() {
    let latestDate = '';
    let latestBatch = 1;

    if (fs.existsSync(BLOG_DIR)) {
        const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html'));
        for (const file of files) {
            try {
                const fullPath = path.join(BLOG_DIR, file);
                const content = fs.readFileSync(fullPath, 'utf8');

                // Извлекаем номер пачки из начала файла
                const batchMatch = content.match(/<!--\s*Пачка\s*(\d+)\s*-->/i);
                const batchNum = batchMatch ? parseInt(batchMatch[1], 10) : 1;

                // Извлекаем дату публикации или изменения из Schema.org
                const dateMatch = content.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/i) ||
                                  content.match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})"/i);

                let articleDate = dateMatch ? dateMatch[1] : '';

                // Если даты в JSON-LD нет, берем время изменения файла на диске
                if (!articleDate) {
                    const stats = fs.statSync(fullPath);
                    articleDate = stats.mtime.toISOString().split('T')[0];
                }

                if (articleDate > latestDate) {
                    latestDate = articleDate;
                    latestBatch = batchNum;
                }
            } catch (e) {
                // ignore
            }
        }
    }
    return latestBatch;
}

// Генерация одного HTML-файла статьи
function generateArticleHtml(article, template) {
    const slug = article.slug.trim();
    const pageTitle = article.pageTitle || `${article.title} — Labkeeper`;
    const metaDescription = article.metaDescription || article.description;
    const breadcrumbTitle = article.breadcrumbTitle || article.shortTitle || article.title;
    const h1 = article.h1 || article.title;
    const categories = Array.isArray(article.categories) ? article.categories : [article.category || 'latex'];
    const articleSectionJson = JSON.stringify(categories.map(c => CATEGORY_NAMES[c] || c));
    const datePublished = getIsoDate(article.datePublished);
    const dateModified = getIsoDate(article.dateModified || article.datePublished);
    const dateDisplay = formatDisplayDate(dateModified);
    const readingTime = article.readingTime || '7 мин';

    const tagsHtml = renderTags(categories);
    const tocHtml = renderToc(article.toc, article.sections);
    const sectionsHtml = renderSections(article.sections);
    const tipsHtml = renderTips(article.tips);

    const sidebarText = article.sidebarText ||
        'Онлайн-редактор LaTeX с&nbsp;компиляцией в&nbsp;PDF, AI-ассистентом и&nbsp;поддержкой пакетов — без установки, сразу в&nbsp;браузере.';
    const ctaTitle = article.ctaTitle || 'Набирайте сложные работы в&nbsp;Labkeeper';
    const ctaText = article.ctaText ||
        'Онлайн-редактор LaTeX с&nbsp;компиляцией в&nbsp;PDF, поддержкой ГОСТ и&nbsp;AI-ассистентом — без&nbsp;установки программ, сразу в&nbsp;браузере.';

    const keywordsList = Array.isArray(article.keywords)
        ? article.keywords
        : (article.keywords ? [article.keywords] : []);
    const keywordsStr = keywordsList.join(', ');
    const keywordsMeta = keywordsStr
        ? `    <!-- SEO Ключи: ${keywordsStr} -->\n    <meta name="keywords" content="${keywordsStr}" />`
        : '';

    const batchNum = article.batch && article.batch !== 'auto' ? article.batch : getLatestArticleBatchNumber();
    const batchComment = article.batchComment || `Пачка ${batchNum}`;

    let html = template;
    html = html.replace(/\{\{BATCH_COMMENT\}\}/g, batchComment);
    html = html.replace(/\{\{PAGE_TITLE\}\}/g, pageTitle);
    html = html.replace(/\{\{META_DESCRIPTION\}\}/g, metaDescription);
    html = html.replace(/\{\{KEYWORDS_META\}\}/g, keywordsMeta);
    html = html.replace(/\{\{SLUG\}\}/g, slug);
    html = html.replace(/\{\{JSON_HEADLINE\}\}/g, JSON.stringify(article.title));
    html = html.replace(/\{\{JSON_DESCRIPTION\}\}/g, JSON.stringify(metaDescription));
    html = html.replace(/\{\{DATE_PUBLISHED\}\}/g, datePublished);
    html = html.replace(/\{\{DATE_MODIFIED\}\}/g, dateModified);
    html = html.replace(/\{\{JSON_ARTICLE_SECTION\}\}/g, articleSectionJson);
    html = html.replace(/\{\{JSON_BREADCRUMB_TITLE\}\}/g, JSON.stringify(breadcrumbTitle));
    html = html.replace(/\{\{BREADCRUMB_TITLE\}\}/g, breadcrumbTitle);
    html = html.replace(/\{\{H1\}\}/g, h1);
    html = html.replace(/\{\{TAGS_HTML\}\}/g, tagsHtml);
    html = html.replace(/\{\{DATE_DISPLAY\}\}/g, dateDisplay);
    html = html.replace(/\{\{READING_TIME\}\}/g, readingTime);
    html = html.replace(/\{\{TOC_HTML\}\}/g, tocHtml);
    html = html.replace(/\{\{SECTIONS_HTML\}\}/g, sectionsHtml);
    html = html.replace(/\{\{TIPS_HTML\}\}/g, tipsHtml);
    html = html.replace(/\{\{SIDEBAR_TEXT\}\}/g, sidebarText);
    html = html.replace(/\{\{CTA_TITLE\}\}/g, ctaTitle);
    html = html.replace(/\{\{CTA_TEXT\}\}/g, ctaText);

    return html;
}

// Безопасное экранирование непарных тегов в текстах карточек и заголовках
function sanitizeCardText(text) {
    if (!text) return '';
    return text.replace(/<(?!\/?(span|strong|b|em|code)\b)[^>]*>/gi, (match) => {
        return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });
}

// Вставка карточки в src/blog.html
function addCardToBlogHtml(article) {
    if (!fs.existsSync(BLOG_HTML_PATH)) {
        console.warn(`[WARN] blog.html не найден по пути: ${BLOG_HTML_PATH}`);
        return false;
    }

    let blogHtml = fs.readFileSync(BLOG_HTML_PATH, 'utf8');
    const slug = article.slug;
    const articleLink = `/blog/${slug}`;

    if (blogHtml.includes(`href="${articleLink}"`)) {
        return false; // Уже существует
    }

    const categories = Array.isArray(article.categories) ? article.categories : [article.category || 'latex'];
    const categoriesAttr = categories.join(' ');
    const tagsHtml = categories
        .filter(c => CATEGORY_NAMES[c])
        .map(c => `                        <span class="blog-card__tag">${CATEGORY_NAMES[c]}</span>`)
        .join('\n');

    const cardTitle = sanitizeCardText(article.cardTitle || article.title);
    const cardDescription = sanitizeCardText(article.cardDescription || article.metaDescription || article.description);

    const cardSnippet = `\n            <!-- ${cardTitle} -->
            <article class="blog-item" data-category="${categoriesAttr}">
                <a href="${articleLink}" class="blog-card">
                    <div class="blog-card__top">
${tagsHtml}
                    </div>
                    <h2 class="blog-card__title">${cardTitle}</h2>
                    <p class="blog-card__text">${cardDescription}</p>
                    <div class="blog-card__footer">
                        <span>Читать статью</span>
                        <span class="blog-card__arrow">→</span>
                    </div>
                </a>
            </article>\n`;

    const gridMarker = '<div class="blog-grid" id="blog-grid">';
    const gridIndex = blogHtml.indexOf(gridMarker);

    if (gridIndex === -1) {
        console.error('[ERROR] Не найден блок <div class="blog-grid" id="blog-grid"> в src/blog.html');
        return false;
    }

    const insertPos = gridIndex + gridMarker.length;
    blogHtml = blogHtml.slice(0, insertPos) + cardSnippet + blogHtml.slice(insertPos);

    fs.writeFileSync(BLOG_HTML_PATH, blogHtml, 'utf8');
    return true;
}

// Вставка карточки в блок знаний на главной странице (src/index.html)
function addCardToIndexHtml(article) {
    if (!fs.existsSync(INDEX_HTML_PATH)) {
        console.warn(`[WARN] index.html не найден по пути: ${INDEX_HTML_PATH}`);
        return false;
    }

    let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
    const slug = article.slug;
    const articleLink = `/blog/${slug}`;

    if (indexHtml.includes(`href="${articleLink}"`)) {
        return false; // Уже существует на главной
    }

    const categories = Array.isArray(article.categories) ? article.categories : [article.category || 'latex'];
    const tagsHtml = categories
        .filter(c => CATEGORY_NAMES[c])
        .map(c => `                                        <span class="blog-card__tag">${CATEGORY_NAMES[c]}</span>`)
        .join('\n');

    const cardTitle = sanitizeCardText(article.cardTitle || article.title);
    const cardDescription = sanitizeCardText(article.cardDescription || article.metaDescription || article.description);

    const slideSnippet = `\n                            <!-- ${cardTitle} -->
                            <div class="swiper-slide">
                                <article class="blog-card">
                                    <div class="blog-card__top">
${tagsHtml}
                                    </div>
                                    <h3 class="blog-card__title">${cardTitle}</h3>
                                    <p class="blog-card__text">${cardDescription}</p>
                                    <a href="${articleLink}" class="blog-card__footer">
                                        <span>Читать статью</span>
                                        <span class="blog-card__arrow">→</span>
                                    </a>
                                </article>
                            </div>\n`;

    const marker = '<div class="swiper knowledge__swiper">\n                        <div class="swiper-wrapper">';
    let markerIndex = indexHtml.indexOf(marker);

    if (markerIndex === -1) {
        const regex = /<div class="swiper knowledge__swiper">[\s\S]*?<div class="swiper-wrapper">/;
        const match = regex.exec(indexHtml);
        if (match) {
            markerIndex = match.index;
            const insertPos = markerIndex + match[0].length;
            indexHtml = indexHtml.slice(0, insertPos) + slideSnippet + indexHtml.slice(insertPos);
            fs.writeFileSync(INDEX_HTML_PATH, indexHtml, 'utf8');
            return true;
        } else {
            console.error('[ERROR] Не найден блок knowledge__swiper в src/index.html');
            return false;
        }
    } else {
        const insertPos = markerIndex + marker.length;
        indexHtml = indexHtml.slice(0, insertPos) + slideSnippet + indexHtml.slice(insertPos);
        fs.writeFileSync(INDEX_HTML_PATH, indexHtml, 'utf8');
        return true;
    }
}

// Добавление статьи в ALL_BLOG_ARTICLES в slider.js
function addToSliderJs(article) {
    if (!fs.existsSync(SLIDER_JS_PATH)) {
        console.warn(`[WARN] slider.js не найден по пути: ${SLIDER_JS_PATH}`);
        return false;
    }

    let sliderJs = fs.readFileSync(SLIDER_JS_PATH, 'utf8');
    const slug = article.slug;
    const articleUrl = `/blog/${slug}`;

    if (sliderJs.includes(`url: '${articleUrl}'`)) {
        return false; // Уже есть в реестре
    }

    const sliderTitle = article.sliderTitle || article.shortTitle || article.cardTitle || article.title;
    const sliderText = article.sliderText || article.cardDescription || article.metaDescription || article.description;

    const entry = `        {\n            url: '${articleUrl}',\n            title: '${sliderTitle.replace(/'/g, "\\'")}',\n            text: '${sliderText.replace(/'/g, "\\'")}'\n        },\n`;

    const target = 'const ALL_BLOG_ARTICLES = [\n';
    const targetIdx = sliderJs.indexOf(target);

    if (targetIdx === -1) {
        console.warn('[WARN] Не найдена переменная ALL_BLOG_ARTICLES в slider.js');
        return false;
    }

    const insertPos = targetIdx + target.length;
    sliderJs = sliderJs.slice(0, insertPos) + entry + sliderJs.slice(insertPos);

    fs.writeFileSync(SLIDER_JS_PATH, sliderJs, 'utf8');
    return true;
}

// Запуск генератора sitemap
function updateSitemap() {
    try {
        console.log('\n[Sitemap] Обновление sitemap.xml...');
        execSync('node src/assets/js/generate-sitemap.js', { cwd: ROOT_DIR, stdio: 'inherit' });
    } catch (err) {
        console.error('[ERROR] Не удалось автоматически запустить sitemap:', err.message);
    }
}

// Главная функция
function main() {
    console.log('==============================================');
    console.log('🚀 Labkeeper Blog Generator');
    console.log('==============================================\n');

    const template = loadTemplate();

    // Проверяем аргументы командной строки
    const cliArg = process.argv[2];
    let articleFiles = [];

    if (cliArg) {
        const customPath = path.resolve(process.cwd(), cliArg);
        if (fs.existsSync(customPath)) {
            articleFiles = [customPath];
        } else {
            console.error(`[ERROR] Файл не найден: ${customPath}`);
            process.exit(1);
        }
    } else {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        articleFiles = fs.readdirSync(DATA_DIR)
            .filter(f => f.endsWith('.json'))
            .map(f => path.join(DATA_DIR, f));
    }

    if (articleFiles.length === 0) {
        console.log(`[INFO] Нет файлов для обработки в ${DATA_DIR}`);
        console.log('Поместите JSON-файлы со статьями в scripts/blog-generator/articles-data/');
        return;
    }

    let createdCount = 0;
    let updatedCards = 0;
    let updatedIndexCards = 0;
    let updatedSliders = 0;

    articleFiles.forEach(filePath => {
        try {
            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const articles = Array.isArray(data) ? data : [data];

            articles.forEach(article => {
                if (!article.slug) {
                    console.warn(`[SKIP] Пропущена статья без slug в ${filePath}`);
                    return;
                }

                const outPath = path.join(BLOG_DIR, `${article.slug}.html`);
                const html = generateArticleHtml(article, template);
                fs.writeFileSync(outPath, html, 'utf8');
                console.log(`✅ [HTML] Сгенерирована: src/blog/${article.slug}.html`);
                createdCount++;

                const cardAdded = addCardToBlogHtml(article);
                if (cardAdded) {
                    console.log(`   └─ Карточка добавлена в каталог (src/blog.html)`);
                    updatedCards++;
                }

                const indexCardAdded = addCardToIndexHtml(article);
                if (indexCardAdded) {
                    console.log(`   └─ Карточка добавлена в блок знаний на главной (src/index.html)`);
                    updatedIndexCards++;
                }

                const sliderAdded = addToSliderJs(article);
                if (sliderAdded) {
                    console.log(`   └─ Добавлена в реестр slider.js`);
                    updatedSliders++;
                }
            });
        } catch (err) {
            console.error(`[ERROR] Ошибка обработки ${filePath}:`, err.message);
        }
    });

    console.log('\n----------------------------------------------');
    console.log(`Итоги:`);
    console.log(`- Статей сгенерировано: ${createdCount}`);
    console.log(`- Новых карточек в blog.html: ${updatedCards}`);
    console.log(`- Новых карточек в index.html: ${updatedIndexCards}`);
    console.log(`- Новых записей в slider.js: ${updatedSliders}`);

    if (createdCount > 0) {
        updateSitemap();
    }

    console.log('\n🎉 Генерация успешно завершена!');
}

main();
