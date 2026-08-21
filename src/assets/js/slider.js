/* global Swiper */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Слайдер проектов на главной странице ---
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        const API_URL = '/api/v4/public/preview';
        const categoryLinks = document.querySelectorAll('#project-categories .header__nav-link');
        
        let allProjects = []; 
        let swiperInstance = null;
        
        // 1. Определяем язык по умолчанию из шапки сайта (или из тега html)
        const activeLangBtn = document.querySelector('.js-lang-switcher .header__lang-btn--active');
        let currentLang = activeLangBtn ? activeLangBtn.getAttribute('data-lang') : (document.documentElement.lang || 'ru');

        // 2. Резервные данные (с реальными картинками) на случай блокировки сети при локальной разработке
        const backupData = {
            "projects": [
                { "id": "092bacc5-c98a-4709-b67d-7455fd4588e4", "name": { "ru": "Измерение интенсивности радиационного фона", "en": "Radiation background intensity measurement" }, "category": "lab", "projectType": "markdown", "logoUrl": "https://labkeeper.io/assets/img/case1.png" },
                { "id": "1acb4436-d4d6-4f40-9fc2-92039adff180", "name": { "ru": "Статистическая обработка результатов многократных измерений", "en": "Statistical processing of multiple measurement results" }, "category": "lab", "projectType": "markdown", "logoUrl": "https://labkeeper.io/assets/img/case2.png" },
                { "id": "c4c71322-14da-4394-b546-2ed0ace1ebfa", "name": { "ru": "Определение систематических и случайных погрешностей", "en": "Determination of systematic and random errors" }, "category": "lab", "projectType": "markdown", "logoUrl": "https://labkeeper.io/assets/img/case4.png" },
                { "id": "d24a814f-ff8f-4b8c-8267-f824cf8c7b6b", "name": { "ru": "Изучение линейной временной модальной логики", "en": "Study of linear temporal modal logic" }, "category": "diploma", "projectType": "latex", "logoUrl": "https://labkeeper.io/assets/img/case3.png" }
            ]
        };

        // 3. Инициализация Swiper
        function initSwiper() {
            if (swiperInstance) {
                swiperInstance.destroy(true, true);
            }

            swiperInstance = new Swiper('.examples__swiper', {
                // На мобильных включаем авто-расчет ширины слайдов, чтобы управлять ими через CSS
                slidesPerView: 'auto', 
                spaceBetween: 16, // Отступ между карточками на мобильных устройствах
                loop: false, // Отключили зацикливание для корректной работы неактивного состояния стрелок
                grabCursor: true,
                navigation: {
                    nextEl: '.examples__arrow--next',
                    prevEl: '.examples__arrow--prev',
                },
                breakpoints: {
                    // Начиная с десктопной ширины возвращаем строгую сетку на 4 карточки
                    1024: { 
                        slidesPerView: 4, 
                        spaceBetween: 30, // Расстояние между карточками на ПК
                        allowTouchMove: true 
                    }
                }
            });
        }

        // 4. Получение текущей активной категории из табов
        function getActiveCategory() {
            const activeTab = document.querySelector('#project-categories .header__nav-link--active');
            return activeTab ? activeTab.getAttribute('data-category') : 'all';
        }

        // 5. Функция рендеринга HTML-карточек
        function renderProjects(projects) {
            projectsContainer.innerHTML = '';

            if (!projects || projects.length === 0) {
                const noProjectsText = currentLang === 'ru' ? 'Нет проектов в данной категории' : 'No projects in this category';
                projectsContainer.innerHTML = `<div class="loading-placeholder">${noProjectsText}</div>`;
                return;
            }

            projects.forEach((project) => {
                const projectName = project.name?.[currentLang] || project.name?.['ru'] || project.name?.['en'] || 'Untitled';
                
                const hasLogo = project.logoUrl ? true : false;
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

        // 6. Обновление отображения при фильтрации или смене языка
        function updateSliderDisplay() {
            const selectedCategory = getActiveCategory();
            if (selectedCategory === 'all') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter(project => project.category === selectedCategory);
                renderProjects(filtered);
            }
        }

        // 7. Основная функция получения данных от бэкенда
        async function fetchProjects() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`Status: ${response.status}`);
                
                const data = await response.json();
                allProjects = data.projects || [];
                renderProjects(allProjects);
            } catch (error) {
                console.warn('Локальный тест (или ошибка CORS). Используются резервные данные:', error);
                allProjects = backupData.projects;
                renderProjects(allProjects);
            }
        }

        // 8. Обработка кликов по табам-категориям
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('header__nav-link--active'));
                link.classList.add('header__nav-link--active');
                updateSliderDisplay();
            });
        });

        // 9. Интеграция мультиязычности с переключателем в шапке
        const langSwitchers = document.querySelectorAll('.js-lang-switcher');
        langSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                const btn = e.target.closest('.header__lang-btn');
                if (!btn) return;

                const newLang = btn.getAttribute('data-lang');
                if (newLang && newLang !== currentLang) {
                    currentLang = newLang;
                    updateSliderDisplay();
                }
            });
        });

        // Старт процесса
        fetchProjects();
    }

    // --- 2. Реестр всех статей блога ---
    const ALL_BLOG_ARTICLES = [
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

    // --- 3. Слайдер статей / материалов (блок «Другие статьи» на страницах статей) ---
    const audienceSwiperEl = document.querySelector('.audience__swiper');
    if (audienceSwiperEl) {
        // Определяем текущий путь страницы, чтобы исключить текущую статью
        const currentPath = window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '');

        // Фильтруем (исключаем текущую)
        const eligibleArticles = ALL_BLOG_ARTICLES.filter(article => {
            const articleNormalized = article.url.replace(/\/+$/, '').replace(/\.html$/, '');
            return !currentPath.endsWith(articleNormalized);
        });

        // Функция перемешивания Фишера-Йетса
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // Выбираем до 30 случайных статей
        const randomArticles = shuffle(eligibleArticles).slice(0, 30);

        const swiperWrapper = audienceSwiperEl.querySelector('.swiper-wrapper');
        if (swiperWrapper && randomArticles.length > 0) {
            swiperWrapper.innerHTML = randomArticles.map(article => `
                <div class="swiper-slide">
                    <a href="${article.url}" class="audience-card">
                        <p class="audience-card__title">${article.title}</p>
                        <p class="audience-card__text">${article.text}</p>
                    </a>
                </div>
            `).join('');
        }

        new Swiper(audienceSwiperEl, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: false,
            grabCursor: true,
            navigation: {
                nextEl: '.audience__arrow--next',
                prevEl: '.audience__arrow--prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    allowTouchMove: true
                }
            }
        });
    }

    // --- 4. Бегущая строка статей блога на главной странице с поддержкой свайпа/перетаскивания ---
    const blogTickerTrack = document.querySelector('.js-blog-ticker-track');
    const blogTickerViewport = document.querySelector('.blog-ticker__viewport');

    if (blogTickerTrack) {
        let totalCount = 0;
        const existingItems = blogTickerTrack.querySelectorAll('.blog-ticker__item');
        if (existingItems.length > 0) {
            // Клонируем существующие в HTML карточки для бесшовного зацикливания ленты
            const itemsHtml = blogTickerTrack.innerHTML;
            blogTickerTrack.innerHTML = itemsHtml + itemsHtml;
            totalCount = existingItems.length * 2;
        } else if (Array.isArray(ALL_BLOG_ARTICLES) && ALL_BLOG_ARTICLES.length > 0) {
            // Берем до 50 последних добавленных статей
            const latestArticles = ALL_BLOG_ARTICLES.slice(-50);
            const itemsHtml = latestArticles.map(article => `
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

        // Реализация свайпа влево и вправо (Touch / Mobile swipe)
        if (blogTickerViewport) {
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let initialTranslateX = 0;
            let isHorizontalSwipe = false;
            let dragDistance = 0;

            function getCurrentTranslateX() {
                const style = window.getComputedStyle(blogTickerTrack);
                const transform = style.transform || style.webkitTransform;
                if (!transform || transform === 'none') return 0;
                try {
                    const matrix = new DOMMatrixReadOnly(transform);
                    return matrix.m41;
                } catch (e) {
                    const values = transform.match(/matrix.*\((.+)\)/);
                    if (values && values[1]) {
                        const parts = values[1].split(', ');
                        return parseFloat(parts[4]) || 0;
                    }
                    return 0;
                }
            }

            function applyAnimationAtPosition(currentX) {
                const halfWidth = blogTickerTrack.scrollWidth / 2;
                if (!halfWidth) return;
                let normalizedX = currentX % halfWidth;
                if (normalizedX > 0) normalizedX -= halfWidth;

                const fraction = (normalizedX + halfWidth) / halfWidth; // 0..1
                const delay = -(fraction * duration);

                blogTickerTrack.style.animation = 'none';
                void blogTickerTrack.offsetWidth; // Force reflow
                blogTickerTrack.style.animation = `blogTickerLtr ${duration}s linear infinite`;
                blogTickerTrack.style.animationDelay = `${delay}s`;
                blogTickerTrack.style.transform = '';
            }

            // Touch события для смартфонов и планшетов
            blogTickerViewport.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
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
                if (!isDragging || e.touches.length !== 1) return;
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
                        while (targetX > 0) targetX -= halfWidth;
                        while (targetX < -halfWidth) targetX += halfWidth;
                    }
                    blogTickerTrack.style.transform = `translateX(${targetX}px)`;
                }
            }, { passive: true });

            const handleTouchEnd = () => {
                if (!isDragging) return;
                isDragging = false;
                const finalX = getCurrentTranslateX();
                applyAnimationAtPosition(finalX);
            };

            blogTickerViewport.addEventListener('touchend', handleTouchEnd, { passive: true });
            blogTickerViewport.addEventListener('touchcancel', handleTouchEnd, { passive: true });

            // Блокировка случайного перехода по ссылке при активном жесте свайпа
            blogTickerTrack.addEventListener('click', (e) => {
                if (Math.abs(dragDistance) > 10) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        }
    }
});
