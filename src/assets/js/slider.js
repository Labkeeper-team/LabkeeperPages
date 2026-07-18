document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://labkeeper.io/api/v4/public/preview';
    const container = document.getElementById('projects-container');
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
        container.innerHTML = '';

        if (!projects || projects.length === 0) {
            const noProjectsText = currentLang === 'ru' ? 'Нет проектов в данной категории' : 'No projects in this category';
            container.innerHTML = `<div class="loading-placeholder">${noProjectsText}</div>`;
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
            container.insertAdjacentHTML('beforeend', cardHtml);
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
});