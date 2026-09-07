/* global Swiper */
document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. Слайдер проектов на главной странице (#examples)
    // =========================================================================
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        const API_URL = '/api/v4/public/preview';
        const categoryLinks = document.querySelectorAll('#project-categories .header__nav-link');

        let allProjects = [];
        let swiperInstance = null;

        const activeLangBtn = document.querySelector('.js-lang-switcher .header__lang-btn--active');
        let currentLang = activeLangBtn ? activeLangBtn.getAttribute('data-lang') : (document.documentElement.lang || 'ru');

        const backupData = {
            projects: [
                { id: '092bacc5-c98a-4709-b67d-7455fd4588e4', name: { ru: 'Измерение интенсивности радиационного фона', en: 'Radiation background intensity measurement' }, category: 'lab', projectType: 'markdown', logoUrl: 'https://labkeeper.io/assets/img/case1.png' },
                { id: '1acb4436-d4d6-4f40-9fc2-92039adff180', name: { ru: 'Статистическая обработка результатов многократных измерений', en: 'Statistical processing of multiple measurement results' }, category: 'lab', projectType: 'markdown', logoUrl: 'https://labkeeper.io/assets/img/case2.png' },
                { id: 'c4c71322-14da-4394-b546-2ed0ace1ebfa', name: { ru: 'Определение систематических и случайных погрешностей', en: 'Determination of systematic and random errors' }, category: 'lab', projectType: 'markdown', logoUrl: 'https://labkeeper.io/assets/img/case4.png' },
                { id: 'd24a814f-ff8f-4b8c-8267-f824cf8c7b6b', name: { ru: 'Изучение линейной временной модальной логики', en: 'Study of linear temporal modal logic' }, category: 'diploma', projectType: 'latex', logoUrl: 'https://labkeeper.io/assets/img/case3.png' }
            ]
        };

        function initSwiper() {
            if (swiperInstance) {
                swiperInstance.destroy(true, true);
            }

            swiperInstance = new Swiper('#examples .examples__swiper', {
                slidesPerView: 'auto',
                spaceBetween: 16,
                loop: false,
                grabCursor: true,
                navigation: {
                    nextEl: '#examples .examples__arrow--next',
                    prevEl: '#examples .examples__arrow--prev'
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        allowTouchMove: true
                    }
                }
            });
        }

        function getActiveCategory() {
            const activeTab = document.querySelector('#project-categories .header__nav-link--active');
            return activeTab ? activeTab.getAttribute('data-category') : 'all';
        }

        function renderProjects(projects) {
            projectsContainer.innerHTML = '';

            if (!projects || projects.length === 0) {
                const noProjectsText = currentLang === 'ru' ? 'Нет проектов в данной категории' : 'No projects in this category';
                projectsContainer.innerHTML = `<div class="loading-placeholder">${noProjectsText}</div>`;
                return;
            }

            projects.forEach((project) => {
                const projectName = project.name?.[currentLang] || project.name?.ru || project.name?.en || 'Untitled';

                const hasLogo = Boolean(project.logoUrl);
                const imgSrc = hasLogo ? project.logoUrl : 'assets/img/logo.svg';
                const imgClass = hasLogo ? 'example-card__image' : 'example-card__image example-card__image--placeholder';

                let categoryText = '';
                if (project.category === 'lab') {
                    categoryText = currentLang === 'ru' ? 'Лабораторная работа' : 'Laboratory work';
                } else if (project.category === 'diploma') {
                    categoryText = currentLang === 'ru' ? 'Дипломный проект' : 'Diploma project';
                } else {
                    categoryText = project.category || '';
                }

                const cardHtml = `
                    <div class="swiper-slide">
                        <a href="https://labkeeper.io/project/${project.id}" class="example-card" target="_blank">
                            <div class="example-card__visual">
                                <img src="${imgSrc}" alt="${projectName}" class="${imgClass}" loading="lazy">
                                <img src="assets/img/target.svg" alt="open" class="example-card__external-icon" width="16" height="16">
                            </div>
                            <div class="example-card__content">
                                <h3 class="example-card__title">${projectName}</h3>
                                <p class="example-card__text">${categoryText}</p>
                            </div>
                        </a>
                    </div>
                `;
                projectsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });

            initSwiper();
        }

        function updateSliderDisplay() {
            const selectedCategory = getActiveCategory();
            if (selectedCategory === 'all') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter((project) => project.category === selectedCategory);
                renderProjects(filtered);
            }
        }

        async function fetchProjects() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }

                const data = await response.json();
                allProjects = data.projects || [];
                renderProjects(allProjects);
            } catch (error) {
                console.warn('Локальный тест (или ошибка CORS). Используются резервные данные:', error);
                allProjects = backupData.projects;
                renderProjects(allProjects);
            }
        }

        categoryLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach((l) => l.classList.remove('header__nav-link--active'));
                link.classList.add('header__nav-link--active');
                updateSliderDisplay();
            });
        });

        const langSwitchers = document.querySelectorAll('.js-lang-switcher');
        langSwitchers.forEach((switcher) => {
            switcher.addEventListener('click', (e) => {
                const btn = e.target.closest('.header__lang-btn');
                if (!btn) {
                    return;
                }

                const newLang = btn.getAttribute('data-lang');
                if (newLang && newLang !== currentLang) {
                    currentLang = newLang;
                    updateSliderDisplay();
                }
            });
        });

        fetchProjects();
    }

    // =========================================================================
    // 2. Реестр всех статей блога
    // =========================================================================
    const ALL_BLOG_ARTICLES = [
        {
            url: '/blog/resume-language-skills-cefr-scale-a1-c2',
            title: 'Языки в резюме (Шкала CEFR)',
            text: 'Как грамотно указать уровни языков A1-C2 в резюме для зарубежных и РФ компаний.'
        },
        {
            url: '/blog/indirect-measurement-error-calculation-lab-report',
            title: 'Погрешности косвенных измерений',
            text: 'Шаблон расчета погрешностей косвенных измерений с частными производными.'
        },
        {
            url: '/blog/latex-pgfplotstable-import-excel-csv-tables',
            title: 'Импорт Excel/CSV в LaTeX',
            text: 'Прямое чтение CSV-таблиц из Excel с пакетом pgfplotstable в LaTeX.'
        },
        {
            url: '/blog/latex-multicol-multi-column-layout-journal',
            title: 'Многоколоночный текст (multicol)',
            text: 'Как верстать текст в 2 и 3 колонки с балансировкой высоты в LaTeX.'
        },
        {
            url: '/blog/latex-rotating-package-sidewaystable-rotate-90',
            title: 'Вращение таблиц (rotating)',
            text: 'Как повернуть широкую таблицу на 90 градусов с помощью sidewaystable.'
        },
        {
            url: '/blog/latex-arraystretch-table-row-height-spacing',
            title: 'Высота строк в таблицах (arraystretch)',
            text: 'Как сделать таблицы просторными и читаемыми с помощью переопределения arraystretch.'
        },
        {
            url: '/blog/latex-hyperref-pdf-bookmarks-navigation',
            title: 'Закладки в PDF (hyperref)',
            text: 'Интерактивная навигация по документу, дерево закладок и цветные ссылки.'
        },
        {
            url: '/blog/latex-algorithm2e-pseudocode-algorithms',
            title: 'Алгоритмы algorithm2e в LaTeX',
            text: 'Красивый псевдокод с нумерацией строк, условиями и циклами в LaTeX.'
        },
        {
            url: '/blog/rinc-vak-scientific-article-template-fonts-margins',
            title: 'Публикации для базы РИНЦ/ВАК',
            text: 'Шаблон научной статьи РИНЦ и ВАК: требования к шрифтам, УДК и ГОСТ.'
        },
        {
            url: '/blog/modern-it-resume-markdown-cv-as-code',
            title: 'IT-резюме в Markdown (CV as Code)',
            text: 'Как писать резюме разработчика как код с контролем версий и ATS-версткой.'
        },
        {
            url: '/blog/word-formatting-issues-diploma-lightweight-markup-alternative',
            title: 'Word съезжает в дипломе: решение',
            text: 'Почему ломается форматирование в Word и как спасает легкая разметка.'
        },
        {
            url: '/blog/ideal-lab-report-template-gost-online',
            title: 'Шаблон отчета по лабораторной ГОСТ',
            text: 'Готовый шаблон лабораторной работы с формулами, таблицами и графиками по ГОСТ.'
        },
        {
            url: '/blog/complex-markdown-tables-syntax-online-generator',
            title: 'Сложные таблицы в Markdown',
            text: 'Выравнивание, многострочные ячейки и создание таблиц в Markdown онлайн.'
        },
        {
            url: '/blog/imrad-structure-scientific-article-scopus-template',
            title: 'Структура IMRAD для Scopus',
            text: 'Международный стандарт научной статьи: правила наполнения блоков и шаблон.'
        },
        {
            url: '/blog/one-page-resume-cv-template-condensing-experience',
            title: 'Одностраничное резюме (One-Pager)',
            text: 'Как уместить 10 лет стажа на одной странице А4 по стандартам FAANG.'
        },
        {
            url: '/blog/student-no-experience-resume-cv-template',
            title: 'Резюме студента без опыта',
            text: 'Что писать в CV при поиске первой работы и стажировки: курсовые, пет-проекты и стек.'
        },
        {
            url: '/blog/frontend-backend-developer-resume-tech-stack-ats',
            title: 'Резюме Frontend/Backend в Markdown',
            text: 'Примеры оформления технологического стека и проектов в резюме под ATS.'
        },
        {
            url: '/blog/how-to-write-it-cover-letter-structure-template',
            title: 'Cover Letter для IT-вакансий',
            text: 'Структура, убедительные метрики и англоязычный шаблон сопроводительного письма.'
        },
        {
            url: '/blog/diploma-annotation-abstract-russian-english',
            title: 'Аннотация к диплому (Abstract)',
            text: 'Как грамотно составить аннотацию на русском и перевести Abstract для диплома.'
        },
        {
            url: '/blog/supervisor-review-external-evaluation-diploma-templates',
            title: 'Отзыв и рецензия на диплом',
            text: 'Шаблоны отзыва научного руководителя и внешней рецензии на дипломную работу.'
        },
        {
            url: '/blog/diploma-assignment-form-calendar-schedule-gost',
            title: 'Бланк задания на ВКР',
            text: 'Шаблоны задания и календарного графика диплома с правильным оформлением по ГОСТ.'
        },
        {
            url: '/blog/how-to-write-lab-report-conclusion-examples',
            title: 'Вывод к лабораторной работе',
            text: 'Готовые шаблоны и фразы-клише для формулировки грамотного вывода по ГОСТ.'
        },
        {
            url: '/blog/physics-lab-measurement-graphs-formatting-gost',
            title: 'Графики измерений по физике',
            text: 'Как грамотно разметить оси, нанести погрешности и провести прямую МНК.'
        },
        {
            url: '/blog/latex-russian-cyrillic-code-listings-minted',
            title: 'Русский язык в коде LaTeX',
            text: 'Настройка пакетов listings и minted для поддержки русских комментариев без ошибок.'
        },
        {
            url: '/blog/markdown-superscript-subscript-indices',
            title: 'Индексы sup и sub в Markdown',
            text: 'Как писать верхние и нижние индексы через теги sub/sup и формульный синтаксис.'
        },
        {
            url: '/blog/biblatex-biber-advanced-bibliography-management',
            title: 'Библиография biblatex и biber',
            text: 'Пакет biblatex, движок biber, стили biblatex-gost и сортировка источников.'
        },
        {
            url: '/blog/footnotes-bottom-page-law-history-coursework-gost',
            title: 'Постраничные сноски по ГОСТ в курсовых',
            text: 'Подстрочные сноски внизу страницы, оборот «Там же» и команда footnote.'
        },
        {
            url: '/blog/table-continuation-multipage-gost-diploma',
            title: 'Перенос таблиц по ГОСТ («Продолжение...»)',
            text: 'Фраза «Продолжение таблицы», повтор номеров колонок и пакет longtable.'
        },
        {
            url: '/blog/justified-text-spacing-hyphenation-latex-vs-word',
            title: 'Выравнивание по ширине без пробелов',
            text: 'Алгоритм Кнута-Пласса, пакет microtype и устранение «дыр» в абзацах.'
        },
        {
            url: '/blog/figure-double-numbering-chapters-gost',
            title: 'Двойная нумерация рисунков по ГОСТ',
            text: 'Нумерация по главам (Рисунок 1.1), сброс счетчиков и пакет caption.'
        },
        {
            url: '/blog/literature-review-structure-diploma-citation',
            title: 'Литературный обзор в дипломе и ВКР',
            text: 'Структура главы 1, аналитическое цитирование и выявление пробела в науке.'
        },
        {
            url: '/blog/legal-regulatory-acts-bibliography-diploma-gost',
            title: 'Нормативные акты в списке по ГОСТ',
            text: 'Иерархия законов, Конституция, кодексы, ГОСТы и правила описания.'
        },
        {
            url: '/blog/master-thesis-title-page-gost',
            title: 'Титульный лист магистерской ВКР',
            text: 'Стандарты оформления магистратуры, гриф допуска, коды направлений подготовки.'
        },
        {
            url: '/blog/lab-report-bibliography-gost-2008',
            title: 'Список источников по ГОСТ 2008',
            text: 'Стандарт ГОСТ Р 7.0.5-2008, оформление методичек, книг и статей в отчетах.'
        },
        {
            url: '/blog/formula-variable-explanation-where-gost',
            title: 'Пояснения к формулам по ГОСТ («где...»)',
            text: 'Слово «где» без двоеточия, тире, единицы измерений и порядок переменных.'
        },
        {
            url: '/blog/software-screenshots-report-gost-caption',
            title: 'Оформление скриншотов по ГОСТ',
            text: 'Нумерация скриншотов, подписи под рисунками, кадрирование окон по ГОСТ 7.32.'
        },
        {
            url: '/blog/markdown-image-size-width-height',
            title: 'Размер изображений в Markdown',
            text: 'Настройка width и height, стили CSS, тег img и центрирование картинок.'
        },
        {
            url: '/blog/markdown-multiline-formulas-matrices-mathjax',
            title: 'Матрицы и длинные формулы в Markdown',
            text: 'Окружения pmatrix, bmatrix, выравнивание aligned и системы cases.'
        },
        {
            url: '/blog/overleaf-alternatives-russia-online-latex',
            title: 'Альтернативы Overleaf в России',
            text: 'Онлайн-редакторы LaTeX без блокировок, поддержка ГОСТ и компиляция в РФ.'
        },
        {
            url: '/blog/latex-tcolorbox-theorems-callouts',
            title: 'Цветные рамки и теоремы (tcolorbox)',
            text: 'Современные плашки callouts, стилизация теорем, определения и тени.'
        },
        {
            url: '/blog/latex-multi-file-document-input-include',
            title: 'Сборка документа из файлов (include)',
            text: 'Модульная структура диплома, команды include, input и includeonly.'
        },
        {
            url: '/blog/latex-custom-rgb-hex-colors-xcolor',
            title: 'Пользовательские цвета RGB и HEX в LaTeX',
            text: 'Объявление HEX и RGB оттенков, брендовые цвета и палитры xcolor.'
        },
        {
            url: '/blog/latex-minipage-images-tables-side-by-side',
            title: 'Картинки и таблицы рядом (minipage)',
            text: 'Окружение minipage, две картинки в строку и текст рядом с таблицей.'
        },
        {
            url: '/blog/essay-report-titlepage-format',
            title: 'Титульный лист реферата и эссе',
            text: 'Шапка министерства, реквизиты студента, канонический шаблон по ГОСТ.'
        },
        {
            url: '/blog/diploma-appendices-listings-diagrams-gost',
            title: 'Оформление приложений по ГОСТ',
            text: 'Буквенная нумерация А, Б, В, вынос листингов кода и схем в приложения.'
        },
        {
            url: '/blog/automatic-table-of-contents-diploma-gost',
            title: 'Автоматическое оглавление по ГОСТ',
            text: 'Команда tableofcontents, отточия, глубина tocdepth и пакет tocloft.'
        },
        {
            url: '/blog/github-readme-template-badges-spoilers',
            title: 'Оформление README.md на GitHub',
            text: 'Бейджи Shields.io, спойлеры details, структура проекта и блок установки.'
        },
        {
            url: '/blog/markdown-mathjax-katex-latex-math',
            title: 'Формулы в Markdown (MathJax & KaTeX)',
            text: 'Синтаксис долларов $$, ввод дробей, греческих символов и матриц.'
        },
        {
            url: '/blog/electronic-resources-bibliography-gost-7-0-100',
            title: 'Электронные ресурсы по ГОСТ 7.0.100',
            text: 'Правила библиографии для веб-страниц, дата обращения и режим доступа.'
        },
        {
            url: '/blog/scientific-article-annotation-abstract-keywords-vak',
            title: 'Аннотация и ключевые слова по ГОСТ',
            text: 'Структура Abstract, правила подбора ключевых слов ВАК и примеры формулировок.'
        },
        {
            url: '/blog/it-english-cv-resume-template',
            title: 'Шаблон IT-резюме на английском языке',
            text: 'Одностраничный CV, оптимизация под ATS-роботов, разделы опыта и стека.'
        },
        {
            url: '/blog/a4-frames-eskd-stamp-technical-diploma',
            title: 'Рамки ЕСКД и штампы А4 для ВКР',
            text: 'Формы 2 и 2а, поля 20-5-5-5 мм, графы штампа и автоматическое заполнение.'
        },
        {
            url: '/blog/paragraph-indent-1-25-gost',
            title: 'Абзацный отступ 1.25 см по ГОСТ',
            text: 'Красная строка 1.25 см, пакет indentfirst и каноническое выравнивание по ширине.'
        },
        {
            url: '/blog/diploma-page-numbering-second-page',
            title: 'Нумерация страниц диплома по ГОСТ',
            text: 'Скрытие номера на титульнике, нумерация со страницы 2 и колонтитулы ВКР.'
        },
        {
            url: '/blog/lab-report-bibliography-gost-7-1',
            title: 'Список литературы по ГОСТ 7.1',
            text: 'Примеры библиографических записей книг, методичек и ГОСТ для отчетов.'
        },
        {
            url: '/blog/student-confidence-intervals-error-calculation',
            title: 'Погрешности и критерий Стьюдента',
            text: 'Формулы СКО, таблица коэффициентов Стьюдента и оформление интервалов по ГОСТ.'
        },
        {
            url: '/blog/formula-numbering-lab-reports-gost',
            title: 'Нумерация формул по ГОСТ в отчетах',
            text: 'Сквозная нумерация, привязка к разделам, макросы amsmath и eqref.'
        },
        {
            url: '/blog/algorithm-flowcharts-gost-markdown-latex',
            title: 'Блок-схемы по ГОСТ в отчетах',
            text: 'Стандарт ГОСТ 19.701, отрисовка схем в TikZ и Mermaid, готовые шаблоны.'
        },
        {
            url: '/blog/programming-lab-report-code-listings-gost',
            title: 'Листинги кода по ГОСТ в отчетах',
            text: 'Пакет listings, правила ГОСТ 7.32, моноширинные шрифты и шаблоны отчетов.'
        },
        {
            url: '/blog/latex-tikz-automata-graphs',
            title: 'Конечные автоматы и графы (TikZ)',
            text: 'Библиотека automata, узлы состояний, дуги переходов и стильные петли.'
        },
        {
            url: '/blog/latex-prevent-hyphenation-linebreaks',
            title: 'Запрет переносов и тильда в LaTeX',
            text: 'Неразрывные пробелы, запрет дефисных переносов и связывание формул.'
        },
        {
            url: '/blog/latex-longtable-multipage',
            title: 'Многостраничные таблицы (longtable)',
            text: 'Автоматический перенос строк, повтор шапки таблицы и правила оформления ГОСТ.'
        },
        {
            url: '/blog/latex-sans-serif-fonts',
            title: 'Шрифты без засечек (Sans Serif) в LaTeX',
            text: 'Глобальная смена шрифта на гротеск, пакеты helvet, cmbright и математика.'
        },
        {
            url: '/blog/latex-forest-trees',
            title: 'Деревья и графы в LaTeX (forest)',
            text: 'Скобочная нотация, автоматическая упаковка узлов и синтаксические деревья.'
        },
        {
            url: '/blog/latex-draftwatermark',
            title: 'Водяные знаки в LaTeX (draftwatermark)',
            text: 'Фоновые надписи «Черновик», конфиденциальные метки и настройка прозрачности.'
        },
        {
            url: '/blog/latex-wrapfig-text-flow',
            title: 'Обтекание текста картинкой в LaTeX',
            text: 'Пакет wrapfig, позиционирование картинок справа и слева от абзаца.'
        },
        {
            url: '/blog/latex-xcolor-text-background',
            title: 'Цвет текста и таблиц в LaTeX',
            text: 'Пакет xcolor, цветные таблицы, фон ячеек и градиенты в академических документах.'
        },
        {
            url: '/blog/latex-pgfplots-function-graphs',
            title: 'Точные графики с pgfplots в LaTeX',
            text: 'Векторные математические функции, графики по точкам и полная кастомизация осей.'
        },
        {
            url: '/blog/latex-line-spacing-1-5-setspace-gost',
            title: 'Полуторный интервал 1.5 в&nbsp;LaTeX (setspace)',
            text: 'Настройка полуторного интервала по ГОСТ без поломки таблиц и сносок.'
        },
        {
            url: '/blog/latex-nested-lists-enumerate-itemize',
            title: 'Многоуровневые списки в&nbsp;LaTeX',
            text: 'Настройка вложенности, иерархических меток и маркеров по ГОСТ.'
        },
        {
            url: '/blog/latex-geometry-margins-gost',
            title: 'Поля страницы по&nbsp;ГОСТ в&nbsp;LaTeX (geometry)',
            text: 'Точная настройка геометрии листа А4 под строгие нормоконтроли вузов.'
        },
        {
            url: '/blog/latex-newcommand-macros',
            title: 'Собственные макросы \newcommand в&nbsp;LaTeX',
            text: 'Создание команд с аргументами, сокращение формул и ускорение набора.'
        },
        {
            url: '/blog/markdown-spoilers-details-summary',
            title: 'Спойлеры и&nbsp;скрытый текст в&nbsp;Markdown',
            text: 'Оформление details и summary для компактных интерактивных конспектов.'
        },
        {
            url: '/blog/markdown-table-merge-cells-rowspan-colspan',
            title: 'Объединение ячеек таблиц в&nbsp;Markdown',
            text: 'Синтаксис Colspan и Rowspan, составные шапки и таблицы сложных отчетов.'
        },
        {
            url: '/blog/markdown-raw-html-integration',
            title: 'Вставка чистого HTML в&nbsp;Markdown',
            text: 'Кастомные стили, выравнивание текста, цветные блоки и мультимедиа.'
        },
        {
            url: '/blog/markdown-to-pdf-export',
            title: 'Конвертация Markdown в&nbsp;PDF онлайн',
            text: 'Мгновенный экспорт .md в PDF с формулами, разметкой таблиц и полями А4.'
        },
        {
            url: '/blog/markdown-strikethrough-underline-highlight',
            title: 'Зачеркивание и&nbsp;подчеркивание в&nbsp;Markdown',
            text: 'Синтаксис ~~зачеркивания~~, подчеркивание и текстовыделитель для заметок.'
        },
        {
            url: '/blog/markdown-code-syntax-highlighting',
            title: 'Подсветка синтаксиса кода в&nbsp;Markdown',
            text: 'Оформление блоков кода, указатели языков и читаемые листинги для отчетов.'
        },
        {
            url: '/blog/markdown-task-lists',
            title: 'Списки задач и&nbsp;чек-листы в&nbsp;Markdown',
            text: 'Синтаксис галочек [x], вложенные подзадачи и оформление чек-листов для отчетов.'
        },
        {
            url: '/blog/markdown-footnotes',
            title: 'Кликабельные сноски в&nbsp;Markdown',
            text: 'Синтаксис footnote [^1], многострочные сноски внизу страницы и рендеринг в PDF.'
        },
        {
            url: '/blog/latex-gost-bibliography',
            title: 'Список литературы по&nbsp;ГОСТ 7.0.5',
            text: 'Оформление списка источников и цитирований по ГОСТ 7.0.5 с пакетом biblatex-gost.'
        },
        {
            url: '/blog/latex-diploma-gost',
            title: 'Диплом и&nbsp;курсовая по&nbsp;ГОСТ в&nbsp;LaTeX',
            text: 'Пошаговый онлайн-гайд по настройке шаблона дипломной работы по ГОСТ 7.32.'
        },
        {
            url: '/blog/latex-titlepage',
            title: 'Титульный лист по&nbsp;ГОСТ в&nbsp;LaTeX',
            text: 'Как создать титульный лист по российским стандартам в онлайн LaTeX.'
        },
        {
            url: '/blog/latex-dissertation',
            title: 'Автореферат и&nbsp;диссертация ВАК в&nbsp;LaTeX',
            text: 'Структура, рамки и ссылки для автореферата и кандидатской диссертации в онлайн LaTeX.'
        },
        {
            url: '/blog/latex-lab-reports',
            title: 'Оформление лабораторных работ',
            text: 'Таблицы, расчет погрешностей и формулы для отчетов по физике и химии.'
        },
        {
            url: '/blog/latex-chemfig',
            title: 'Химические формулы и&nbsp;реакции (chemfig)',
            text: 'Редактор химических формул: циклические молекулы, реакции и полимеры.'
        },
        {
            url: '/blog/latex-fancyhdr',
            title: 'Колонтитулы и&nbsp;нумерация (fancyhdr)',
            text: 'Настройка колонтитулов в стиле научных журналов, четные и нечетные страницы.'
        },
        {
            url: '/blog/latex-siunitx',
            title: 'Физические величины и&nbsp;единицы (siunitx)',
            text: 'Единицы СИ, погрешности и автоматическое выравнивание чисел в таблицах по ГОСТ.'
        },
        {
            url: '/blog/latex-word-to-latex',
            title: 'Перенос документов из&nbsp;Word в&nbsp;LaTeX',
            text: 'Экспорт уравнений Word в TeX, конвертация через Pandoc и импорт docx без потерь.'
        },
        {
            url: '/blog/latex-scopus-wos',
            title: 'Шаблон статьи Scopus / Web of Science',
            text: 'Базовый шаблон LaTeX для публикации в международных журналах Scopus и WoS.'
        },
        {
            url: '/blog/latex-list-of-figures-tables',
            title: 'Список иллюстраций и&nbsp;таблиц по&nbsp;ГОСТ',
            text: 'Автоматическая генерация перечня рисунков и таблиц (LoF / LoT) по ГОСТ 7.32.'
        },
        {
            url: '/blog/latex-systems-equations',
            title: 'Системы уравнений и&nbsp;фигурные скобки',
            text: 'Кусочные функции cases, выравнивание aligned и нумерация строк subequations.'
        },
        {
            url: '/blog/latex-cv-resume',
            title: 'Академическое резюме (CV) в&nbsp;LaTeX',
            text: 'Верстка резюме на пакете moderncv для аспирантуры, стажировок и грантов.'
        },
        {
            url: '/blog/latex-amsthm',
            title: 'Теоремы, леммы и&nbsp;доказательства (amsthm)',
            text: 'Оформление математических утверждений по стандартам AMS и знак доказательства Q.E.D.'
        },
        {
            url: '/blog/latex-eskd',
            title: 'Рамки и&nbsp;штампы по&nbsp;ЕСКД/СПДС (eskdx)',
            text: 'Верстка расчетно-пояснительных записок, рамки 20-5-5-5 мм и штампы по ГОСТ 2.104.'
        },
        {
            url: '/blog/latex-formulas',
            title: 'Формулы и&nbsp;уравнения (пакет amsmath)',
            text: 'Полное руководство по математическому режиму, выравниванию формул и дробям в LaTeX.'
        }
    ];
    window.ALL_BLOG_ARTICLES = ALL_BLOG_ARTICLES;

    // =========================================================================
    // 3. Слайдер статей (внутренние страницы статей)
    // =========================================================================
    const audienceSwiperEl = document.querySelector('.audience__swiper');
    if (audienceSwiperEl) {
        const currentPath = window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '');

        const eligibleArticles = ALL_BLOG_ARTICLES.filter((article) => {
            const articleNormalized = article.url.replace(/\/+$/, '').replace(/\.html$/, '');
            return !currentPath.endsWith(articleNormalized);
        });

        const shuffle = (array) => {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        const randomArticles = shuffle(eligibleArticles).slice(0, 30);

        const swiperWrapper = audienceSwiperEl.querySelector('.swiper-wrapper');
        if (swiperWrapper && randomArticles.length > 0) {
            swiperWrapper.innerHTML = randomArticles.map((article) => `
                <div class="swiper-slide">
                    <a href="${article.url}" class="audience-card">
                        <p class="audience-card__title">${article.title}</p>
                        <p class="audience-card__text">${article.text}</p>
                    </a>
                </div>
            `).join('');
        }

        new Swiper(audienceSwiperEl, {
            slidesPerView: 1.18,
            spaceBetween: 16,
            loop: false,
            grabCursor: true,
            navigation: {
                nextEl: '.audience__arrow--next',
                prevEl: '.audience__arrow--prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    allowTouchMove: true
                }
            }
        });
    }

    // =========================================================================
    // 4. Бегущая строка блога (если присутствует в DOM)
    // =========================================================================
    const blogTickerTrack = document.querySelector('.js-blog-ticker-track');
    const blogTickerViewport = document.querySelector('.blog-ticker__viewport');

    if (blogTickerTrack) {
        let totalCount = 0;
        const existingItems = blogTickerTrack.querySelectorAll('.blog-ticker__item');
        if (existingItems.length > 0) {
            const itemsHtml = blogTickerTrack.innerHTML;
            blogTickerTrack.innerHTML = itemsHtml + itemsHtml;
            totalCount = existingItems.length * 2;
        } else if (Array.isArray(ALL_BLOG_ARTICLES) && ALL_BLOG_ARTICLES.length > 0) {
            const latestArticles = ALL_BLOG_ARTICLES.slice(-50);
            const itemsHtml = latestArticles.map((article) => `
                <a href="${article.url}" class="blog-ticker__item">
                    <span class="blog-ticker__text">${article.title}</span>
                    <span class="blog-ticker__arrow">→</span>
                </a>
            `).join('');

            const repeatCount = latestArticles.length < 10 ? 4 : 2;
            let trackHtml = '';
            for (let i = 0; i < repeatCount; i++) {
                trackHtml += itemsHtml;
            }

            blogTickerTrack.innerHTML = trackHtml;
            totalCount = latestArticles.length * repeatCount;
        }

        const duration = Math.max(35, Math.round(totalCount * 2.2));
        blogTickerTrack.style.animationDuration = `${duration}s`;

        if (blogTickerViewport) {
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let initialTranslateX = 0;
            let isHorizontalSwipe = false;
            let dragDistance = 0;

            const getCurrentTranslateX = () => {
                const style = window.getComputedStyle(blogTickerTrack);
                const transform = style.transform || style.webkitTransform;
                if (!transform || transform === 'none') {
                    return 0;
                }
                try {
                    const matrix = new window.DOMMatrixReadOnly(transform);
                    return matrix.m41;
                    // eslint-disable-next-line no-unused-vars
                } catch (err) {
                    const values = transform.match(/matrix.*\((.+)\)/);
                    if (values && values[1]) {
                        const parts = values[1].split(', ');
                        return parseFloat(parts[4]) || 0;
                    }
                    return 0;
                }
            };

            const applyAnimationAtPosition = (currentX) => {
                const halfWidth = blogTickerTrack.scrollWidth / 2;
                if (!halfWidth) {
                    return;
                }
                let normalizedX = currentX % halfWidth;
                if (normalizedX > 0) {
                    normalizedX -= halfWidth;
                }

                const fraction = (normalizedX + halfWidth) / halfWidth;
                const delay = -(fraction * duration);

                blogTickerTrack.style.animation = 'none';
                void blogTickerTrack.offsetWidth;
                blogTickerTrack.style.animation = `blogTickerLtr ${duration}s linear infinite`;
                blogTickerTrack.style.animationDelay = `${delay}s`;
                blogTickerTrack.style.transform = '';
            };

            blogTickerViewport.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) {
                    return;
                }
                isDragging = true;
                isHorizontalSwipe = false;
                dragDistance = 0;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                initialTranslateX = getCurrentTranslateX();

                blogTickerTrack.style.animation = 'none';
                blogTickerTrack.style.transform = `translateX(${initialTranslateX}px)`;
            }, { passive: true });

            blogTickerViewport.addEventListener('touchmove', (e) => {
                if (!isDragging || e.touches.length !== 1) {
                    return;
                }
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = currentX - startX;
                const diffY = currentY - startY;

                if (!isHorizontalSwipe) {
                    if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
                        isHorizontalSwipe = true;
                    } else if (Math.abs(diffY) > 8) {
                        isDragging = false;
                        applyAnimationAtPosition(initialTranslateX);
                        return;
                    }
                }

                if (isHorizontalSwipe) {
                    dragDistance = diffX;
                    const halfWidth = blogTickerTrack.scrollWidth / 2;
                    let targetX = initialTranslateX + diffX;
                    if (halfWidth > 0) {
                        while (targetX > 0) {
                            targetX -= halfWidth;
                        }
                        while (targetX < -halfWidth) {
                            targetX += halfWidth;
                        }
                    }
                    blogTickerTrack.style.transform = `translateX(${targetX}px)`;
                }
            }, { passive: true });

            const handleTouchEnd = () => {
                if (!isDragging) {
                    return;
                }
                isDragging = false;
                const finalX = getCurrentTranslateX();
                applyAnimationAtPosition(finalX);
            };

            blogTickerViewport.addEventListener('touchend', handleTouchEnd, { passive: true });
            blogTickerViewport.addEventListener('touchcancel', handleTouchEnd, { passive: true });

            blogTickerTrack.addEventListener('click', (e) => {
                if (Math.abs(dragDistance) > 10) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }
    }

    // =========================================================================
    // 5. Логика табов Преимуществ (Плавный Cross-fade)
    // =========================================================================
    const tabButtons = document.querySelectorAll('.features__tab-btn');
    const tabSlides = document.querySelectorAll('.features__slide');

    if (tabButtons.length > 0 && tabSlides.length > 0) {
        const TAB_DURATION = 6000;
        let currentTabIndex = 0;
        let tabTimer = null;

        const setActiveTab = (index) => {
            currentTabIndex = index;

            tabButtons.forEach((btn, i) => {
                const isActive = (i === index);
                btn.classList.toggle('is-active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

                const progress = btn.querySelector('.features__tab-progress');
                if (progress) {
                    progress.style.transition = 'none';
                    progress.style.width = '0%';
                    void progress.offsetWidth;

                    if (isActive) {
                        progress.style.transition = `width ${TAB_DURATION}ms linear`;
                        progress.style.width = '100%';
                    }
                }
            });

            tabSlides.forEach((slide, i) => {
                const isActive = (i === index);
                slide.classList.toggle('is-active', isActive);

                if (isActive) {
                    const bullets = slide.querySelectorAll('.features__bullet-item');
                    bullets.forEach((b) => {
                        b.style.animation = 'none';
                        void b.offsetWidth;
                        b.style.animation = '';
                    });
                }
            });

            startTabAutoplay();
        };

        const startTabAutoplay = () => {
            clearTimeout(tabTimer);
            tabTimer = setTimeout(() => {
                const nextIndex = (currentTabIndex + 1) % tabButtons.length;
                setActiveTab(nextIndex);
            }, TAB_DURATION);
        };

        tabButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                setActiveTab(index);
            });
        });

        setActiveTab(0);
    }

    // =========================================================================
    // 6. Инициализация слайдера «База знаний» (#knowledge)
    // =========================================================================
    const knowledgeSection = document.getElementById('knowledge');
    if (knowledgeSection) {
        const knowledgeSwiper = new Swiper('#knowledge .knowledge__swiper', {
            slidesPerView: 1.18,
            spaceBetween: 16,
            loop: false,
            grabCursor: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '#knowledge .knowledge__arrow--next',
                prevEl: '#knowledge .knowledge__arrow--prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    allowTouchMove: true
                }
            }
        });

        window.addEventListener('load', () => {
            knowledgeSwiper.update();
            if (knowledgeSwiper.navigation) {
                knowledgeSwiper.navigation.update();
            }
        });

        setTimeout(() => {
            knowledgeSwiper.update();
            if (knowledgeSwiper.navigation) {
                knowledgeSwiper.navigation.update();
            }
        }, 300);
    }
});