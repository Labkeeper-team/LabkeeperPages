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
const { buildExampleUrl, escapeHtml, prepareArticleHtml } = require('./article-tools');
const examples = require('./editor-examples');
const { vendorMath } = require('./vendor-math');

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
            } catch {
                // ignore
            }
        }
    }
    return latestBatch;
}

// Генерация одного HTML-файла статьи
function generateArticleHtml(article, template, example = examples[article.slug]) {
    const slug = article.slug;
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error('Article slug must contain lowercase letters, numbers and hyphens');
    }
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
        ? `    <!-- SEO Ключи: ${escapeHtml(keywordsStr)} -->\n    <meta name="keywords" content="${escapeHtml(keywordsStr)}" />`
        : '';

    const batchNum = article.batch && article.batch !== 'auto' ? article.batch : getLatestArticleBatchNumber();
    const batchComment = article.batchComment || `Пачка ${batchNum}`;

    const values = {
        BATCH_COMMENT: batchComment,
        PAGE_TITLE: escapeHtml(pageTitle),
        META_DESCRIPTION: escapeHtml(metaDescription),
        KEYWORDS_META: keywordsMeta,
        SLUG: slug,
        JSON_HEADLINE: JSON.stringify(article.title).replace(/</g, '\\u003c'),
        JSON_DESCRIPTION: JSON.stringify(metaDescription).replace(/</g, '\\u003c'),
        DATE_PUBLISHED: datePublished,
        DATE_MODIFIED: dateModified,
        JSON_ARTICLE_SECTION: articleSectionJson,
        JSON_BREADCRUMB_TITLE: JSON.stringify(breadcrumbTitle).replace(/</g, '\\u003c'),
        BREADCRUMB_TITLE: breadcrumbTitle,
        H1: h1,
        TAGS_HTML: tagsHtml,
        DATE_DISPLAY: dateDisplay,
        READING_TIME: readingTime,
        TOC_HTML: tocHtml,
        SECTIONS_HTML: sectionsHtml,
        TIPS_HTML: tipsHtml,
        SIDEBAR_TEXT: sidebarText,
        CTA_TITLE: ctaTitle,
        CTA_TEXT: ctaText,
        EDITOR_EXAMPLE_URL: escapeHtml(buildExampleUrl(example, slug))
    };
    // A callback preserves $$, $&, backslashes and placeholder-like article text.
    const html = template.replace(/\{\{([A-Z][A-Z0-9_]*)\}\}/g, (match, key) => {
        if (!Object.hasOwn(values, key)) throw new Error(`Unknown template placeholder: ${key}`);
        return values[key];
    });
    return prepareArticleHtml(html, example, slug);
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
    const args = process.argv.slice(2);
    const check = args.includes('--check');
    const cliArg = args.find(arg => arg !== '--check');
    if (args.filter(arg => arg !== '--check').length > 1 || cliArg?.startsWith('--')) {
        throw new Error('Usage: node scripts/blog-generator/generate.js [articles.json] [--check]');
    }
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
            throw new Error(`Article data directory not found: ${DATA_DIR}`);
        }
        articleFiles = fs.readdirSync(DATA_DIR)
            .filter(f => f.endsWith('.json'))
            .map(f => path.join(DATA_DIR, f));
    }

    if (articleFiles.length === 0) {
        throw new Error(`No article JSON files found in ${DATA_DIR}`);
    }

    // Validate every page before writing any output. A broken example must not
    // leave half of the site regenerated or report a successful build.
    const pages = new Map();
    const sourceArticles = [];
    for (const filePath of articleFiles) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        for (const article of Array.isArray(data) ? data : [data]) {
            if (pages.has(article.slug)) throw new Error(`Duplicate article: ${article.slug}`);
            pages.set(article.slug, generateArticleHtml(article, template));
            sourceArticles.push(article);
        }
    }
    if (!cliArg) {
        // Legacy articles have no JSON source. Preserve their content and SEO.
        for (const file of fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.html'))) {
            const slug = file.slice(0, -5);
            if (!pages.has(slug)) {
                const html = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
                pages.set(slug, prepareArticleHtml(html, examples[slug], slug));
            }
        }
        for (const slug of Object.keys(examples)) {
            if (!pages.has(slug)) throw new Error(`Example without an article: ${slug}`);
        }
    }
    if (check) {
        const stale = [...pages].filter(([slug, html]) => {
            const file = path.join(BLOG_DIR, `${slug}.html`);
            return !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== html;
        }).map(([slug]) => slug);
        if (stale.length) throw new Error(`Run npm run blog:generate. Outdated articles: ${stale.join(', ')}`);
        console.log(`Checked ${pages.size} articles and editor examples.`);
        return;
    }

    vendorMath();
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    for (const [slug, html] of pages) {
        const outPath = path.join(BLOG_DIR, `${slug}.html`);
        if (!fs.existsSync(outPath) || fs.readFileSync(outPath, 'utf8') !== html) {
            fs.writeFileSync(outPath, html, 'utf8');
        }
    }

    const createdCount = pages.size;
    let updatedCards = 0;
    let updatedIndexCards = 0;
    let updatedSliders = 0;

    sourceArticles.forEach(article => {
        if (addCardToBlogHtml(article)) {
            console.log('   └─ Карточка добавлена в каталог (src/blog.html)');
            updatedCards++;
        }
        if (addCardToIndexHtml(article)) {
            console.log('   └─ Карточка добавлена в блок знаний на главной (src/index.html)');
            updatedIndexCards++;
        }
        if (addToSliderJs(article)) {
            console.log('   └─ Добавлена в реестр slider.js');
            updatedSliders++;
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

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error(`[ERROR] ${error.message}`);
        process.exitCode = 1;
    }
}
module.exports = { generateArticleHtml, loadTemplate };
