module.exports = [
    {
        slug: 'modern-it-resume-markdown-cv-as-code',
        batch: 2,
        title: 'Шаблон современного IT-резюме в Markdown: пишем CV как код',
        pageTitle: 'Markdown шаблон резюме разработчика: создать CV в Markdown онлайн — Labkeeper',
        metaDescription: 'Современный Markdown шаблон резюме разработчика под концепцию CV-as-Code. Как создать CV в Markdown онлайн, настроить стили и экспортировать в ATS PDF в Labkeeper.',
        breadcrumbTitle: 'Резюме в Markdown (CV as Code)',
        h1: 'Шаблон современного IT-резюме в&nbsp;Markdown: пишем CV как&nbsp;код',
        categories: ['cv', 'markdown'],
        keywords: [
            'markdown шаблон резюме разработчика',
            'создать cv в markdown онлайн'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '8 мин',
        cardTitle: 'IT-резюме в Markdown: пишем CV как код с контролем версий в Git',
        cardDescription: 'Философия Resume-as-Code: чистый текстовый исходник, автоматическая сборка PDF, отсутствие визуального шума и полная совместимость с ATS.',
        sliderTitle: 'IT-резюме в Markdown (CV as Code)',
        sliderText: 'Как писать резюме разработчика как код с контролем версий и ATS-версткой.',
        sidebarText: 'Верстайте стильные IT-резюме в чистом Markdown в Labkeeper с моментальным экспортом в идеальный PDF.',
        ctaTitle: 'Напишите CV как код в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор для инженеров: лаконичный Markdown, стильные темы оформления и чистый векторный экспорт в PDF.',
        toc: [
            { id: 'concept', title: 'Концепция «CV как код» (Resume as Code)' },
            { id: 'benefits', title: 'Почему Markdown превосходит Canva, Figma и Word' },
            { id: 'markdown-template', title: 'Markdown шаблон резюме разработчика: готовый образец' },
            { id: 'online-creator', title: 'Создать CV в Markdown онлайн: пошаговая настройка в Labkeeper' },
            { id: 'git-automation', title: 'Автоматизация версий через Git и GitHub Actions' }
        ],
        sections: [
            {
                id: 'concept',
                title: 'Концепция «CV как код» (Resume as Code)',
                html: `                        <p>В инженерном сообществе подход <strong>«Резюме как код» (CV as Code)</strong> стал признанным стандартом хорошего тона. Вместо того чтобы тратить часы на выравнивание плашек в графических редакторах Canva или мучиться с непредсказуемой сеткой Word, разработчик хранит резюме в виде чистого текстового файла с разметкой Markdown.</p>
                        <p>Это дает колоссальные преимущества: полный контроль версий через Git, возможность вести разные ветки под разные типы вакансий (например, <code>backend-lead</code> и <code>devops-architect</code>) и быструю компиляцию в финальный документ. О том, как логично сгруппировать навыки, читайте в нашей статье о том, как <a href="/blog/frontend-backend-developer-resume-tech-stack-ats">структурировать стек технологий разработчика</a>.</p>`
            },
            {
                id: 'benefits',
                title: 'Почему Markdown превосходит Canva, Figma и Word',
                html: `                        <ul>
                            <li><strong>100% совместимость с ATS:</strong> системы автоматического скрининга кандидатов обожают структурированный plain text без скрытых графических фреймов;</li>
                            <li><strong>Скорость редактирования:</strong> добавить новый проект или скорректировать цифру метрики можно за 10 секунд прямо из терминала или веб-редактора;</li>
                            <li><strong>Фокус на содержании, а не украшательстве:</strong> технический директор оценивает ваши архитектурные решения и стек, а не цветные иконки и полоски прогресса;</li>
                            <li><strong>Легкая портативность:</strong> из одного <code>.md</code> файла можно мгновенно сгенерировать HTML-страницу, PDF для отклика или plain-text для формы на сайте.</li>
                        </ul>
                        <p>Кроме того, текстовая разметка позволяет легко придерживаться жесткого <a href="/blog/one-page-resume-cv-template-condensing-experience">одностраничного формата резюме One-Pager</a>, принятого в международных компаниях.</p>`
            },
            {
                id: 'markdown-template',
                title: 'Markdown шаблон резюме разработчика: готовый образец',
                html: `                        <p>Практический <strong>markdown шаблон резюме разработчика</strong> с разделением на ключевые секции:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">Markdown CV Template</span></div>
                            <pre><code># Артем Кузнецов — Senior Fullstack Developer
**Специализация:** TypeScript, React, Node.js, Cloud Native  
**Контакты:** artem.dev@example.com | Telegram: @artem_kuznetsov | [GitHub](https://github.com) | [Portfolio](https://example.com)

---

## Краткое резюме
Fullstack разработчик с 6+ годами опыта в проектировании и масштабировании веб-сервисов с высокой нагрузкой. Эксперт в оптимизации производительности фронтенда (Web Vitals), создании отказоустойчивых REST/GraphQL API и микросервисной архитектуре.

## Технический стек
- **Языки:** TypeScript, JavaScript, Python, SQL, HTML5/CSS3
- **Фронтенд:** React, Next.js, Redux Toolkit, TanStack Query, Tailwind CSS
- **Бэкенд:** Node.js (NestJS, Express), PostgreSQL, Redis, RabbitMQ
- **Инфраструктура:** Docker, Kubernetes, CI/CD (GitHub Actions), AWS (S3, EC2), Nginx

## Опыт работы

### Lead Fullstack Engineer — Финтех Платформа *(2022 — настоящее время)*
- Спроектировал клиентскую часть личного кабинета инвестора на Next.js, сократив время первой отрисовки (FCP) с 2.8 до 0.9 секунд.
- Перевел монолитный сервис нотификаций на событийно-ориентированную архитектуру с RabbitMQ, обеспечив обработку до 15 000 сообщений/сек.
- Руководил командой из 5 разработчиков: проводил архитектурные ревью, внедрил автотесты Jest/Playwright (покрытие выросло до 80%).

### Middle Fullstack Developer — SaaS Маркетплейс *(2019 — 2022)*
- Разработал гибкий конструктор форм на React, ускоривший онбординг партнеров на 45%.
- Оптимизировал сложные аналитические запросы в PostgreSQL, снизив утилизацию CPU базы данных на 30%.

## Образование
**МФТИ (ФПМИ)** — Бакалавр прикладной математики и информатики *(2015 — 2019)*</code></pre>
                        </div>`
            },
            {
                id: 'online-creator',
                title: 'Создать CV в Markdown онлайн: пошаговая настройка в Labkeeper',
                html: `                        <p>Чтобы быстро <strong>создать cv в markdown онлайн</strong> без установки локальных утилит Pandoc и Node.js, воспользуйтесь онлайн-редактором Labkeeper:</p>
                        <ol>
                            <li>Откройте новый документ и выберите шаблон «IT Resume»;</li>
                            <li>Вставьте ваши данные, ссылки и проекты;</li>
                            <li>Редактор на лету скомпилирует разметку в элегантный одностраничный или двухстраничный PDF-документ со встроенными векторными шрифтами и кликабельными гиперссылками.</li>
                        </ol>`
            },
            {
                id: 'git-automation',
                title: 'Автоматизация версий через Git и GitHub Actions',
                html: `                        <p>Продвинутый уровень: создайте приватный или публичный репозиторий <code>my-resume</code> на GitHub. Настройте GitHub Action, который при каждом пуше в ветку <code>main</code> компилирует ваш <code>resume.md</code> в свежий <code>resume.pdf</code> и публикует его в GitHub Releases.</p>`
            }
        ],
        tips: [
            {
                title: 'Кликабельные ссылки в шапке',
                html: '<p>Всегда делайте ссылки на почту, Telegram и GitHub кликабельными (<code>[github.com/nick](https://github.com/nick)</code>), чтобы рекрутер мог перейти в ваш профиль в один клик прямо из PDF-ридера.</p>'
            },
            {
                title: 'Компиляция без смещения строк',
                html: '<p>В Labkeeper PDF-генератор настроен на строгое сохранение геометрии текста, исключая появление некрасивых висячих строк на последней странице.</p>'
            }
        ]
    },
    {
        slug: 'rinc-vak-scientific-article-template-fonts-margins',
        batch: 2,
        title: 'Подготовка публикации для базы РИНЦ: шаблон, шрифты и интервалы ВАК',
        pageTitle: 'Шаблон статьи РИНЦ скачать: оформление научной статьи по ГОСТу — Labkeeper',
        metaDescription: 'Скачать шаблон статьи РИНЦ и ВАК по ГОСТу. Точные требования к шрифтам, интервалам, УДК, полям страницы и оформление научной статьи онлайн в Labkeeper.',
        breadcrumbTitle: 'Статья РИНЦ и ВАК по ГОСТ',
        h1: 'Подготовка публикации для базы РИНЦ: шаблон, шрифты и&nbsp;интервалы ВАК',
        categories: ['articles'],
        keywords: [
            'шаблон статьи ринц скачать',
            'оформление научной статьи по госту онлайн'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '8 мин',
        cardTitle: 'Требования РИНЦ и ВАК к оформлению статьи: шрифты, УДК и ГОСТ',
        cardDescription: 'Стандарты издательств ВАК: размер полей, полуторный интервал, УДК, двуязычные метаданные и правила цитирования по ГОСТ Р 7.0.5.',
        sliderTitle: 'Публикации для базы РИНЦ/ВАК',
        sliderText: 'Шаблон научной статьи РИНЦ и ВАК: требования к шрифтам, УДК и ГОСТ.',
        sidebarText: 'В Labkeeper подготовка научной статьи для базы РИНЦ занимает минимум времени благодаря готовым LaTeX и Markdown шаблонам.',
        ctaTitle: 'Оформите статью для РИНЦ в&nbsp;Labkeeper',
        ctaText: 'Онлайн-платформа для ученых: авто-генерация библиографии по ГОСТ 7.0.5, формулы amsmath и точные параметры полей ВАК.',
        toc: [
            { id: 'vak-rules', title: 'Обязательные технические требования ВАК и РИНЦ' },
            { id: 'article-anatomy', title: 'Структура метаданных статьи: УДК, аффилиации и аннотация' },
            { id: 'download-template', title: 'Шаблон статьи РИНЦ: скачать готовый код для верстки' },
            { id: 'online-editing', title: 'Оформление научной статьи по ГОСТу онлайн в Labkeeper' },
            { id: 'gost-citations', title: 'Список литературы по ГОСТ Р 7.0.5-2008 без ошибок' }
        ],
        sections: [
            {
                id: 'vak-rules',
                title: 'Обязательные технические требования ВАК и РИНЦ',
                html: `                        <p>Для успешного включения публикации в Российский индекс научного цитирования (РИНЦ) и журналы перечня Высшей аттестационной комиссии (ВАК) статья должна быть оформлена в строгом соответствии с государственными стандартами и редполитикой издания:</p>
                        <ul>
                            <li><strong>Формат листа:</strong> стандартный А4, книжная ориентация;</li>
                            <li><strong>Поля страницы:</strong> по 20 мм со всех сторон (в некоторых изданиях: левое 25 мм, правое 15 мм, верхнее и нижнее по 20 мм);</li>
                            <li><strong>Шрифт основного текста:</strong> Times New Roman, 14 pt (для сносок и таблиц допускается 12 pt);</li>
                            <li><strong>Межстрочный интервал:</strong> полуторный (1.5) или одинарный (1.0 в зависимости от сборника);</li>
                            <li><strong>Абзацный отступ (красная строка):</strong> 1.25 см (устанавливается строго через свойства абзаца, а не пробелами или клавишей Tab);</li>
                            <li><strong>Выравнивание:</strong> по ширине страницы с обязательной расстановкой переносов.</li>
                        </ul>
                        <p>По смысловой структуре ведущие отечественные сборники ориентируются на принципы <a href="/blog/imrad-structure-scientific-article-scopus-template">международной структуры IMRAD</a>, выделяя четкие разделы методов и обсуждения.</p>`
            },
            {
                id: 'article-anatomy',
                title: 'Структура метаданных статьи: УДК, аффилиации и аннотация',
                html: `                        <p>Каждая статья для РИНЦ открывается блоком обязательных метаданных:</p>
                        <ol>
                            <li><strong>Индекс УДК (Универсальная десятичная классификация):</strong> выравнивается по левому краю без отступа (например: <code>УДК 004.421</code>);</li>
                            <li><strong>Инициалы и фамилия авторов:</strong> с указанием ученых степеней, званий и должностей;</li>
                            <li><strong>Аффилиация (место работы/учебы):</strong> полное официальное название вуза или НИИ, город, страна, адрес корпоративной электронной почты;</li>
                            <li><strong>Название статьи:</strong> полужирными прописными буквами по центру;</li>
                            <li><strong>Аннотация и ключевые слова:</strong> на русском языке (от 150 до 250 слов);</li>
                            <li><strong>Англоязычный блок:</strong> полное дублирование ФИО, аффилиации, названия (Title), Abstract и Keywords.</li>
                        </ol>`
            },
            {
                id: 'download-template',
                title: 'Шаблон статьи РИНЦ: скачать готовый код для верстки',
                html: `                        <p>Готовый <strong>шаблон статьи ринц скачать</strong> в формате LaTeX с настроенными ГОСТ-параметрами:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Шаблон РИНЦ / ВАК</span></div>
                            <pre><code>\\documentclass[a4paper,14pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[russian,english]{babel}
\\usepackage[left=20mm,right=20mm,top=20mm,bottom=20mm]{geometry}
\\usepackage{setspace}
\\onehalfspacing
\\usepackage{indentfirst}
\\setlength{\\parindent}{1.25cm}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}

\\begin{document}

\\noindent УДК 004.891.2

\\begin{center}
{\\bfseries МЕТОД ОПТИМИЗАЦИИ НЕЙРОСЕТЕВЫХ АРХИТЕКТУР ДЛЯ СИСТЕМ РЕАЛЬНОГО ВРЕМЕНИ}\\\\
\\vspace{0.5cm}
{\\bfseries А.~А.~Иванов$^{1}$, С.~С.~Петров$^{2}$}\\\\
\\vspace{0.2cm}
{\\small $^{1,2}$Московский государственный технический университет имени Н.~Э.~Баумана, Москва, Россия\\\\
E-mail: ivanov@bmstu.ru}
\\end{center}

\\begin{abstract}
\\noindent {\\bfseries Аннотация.} В работе предложен алгоритм прунинга весов...
\\vspace{0.2cm}

\\noindent {\\bfseries Ключевые слова:} НЕЙРОННЫЕ СЕТИ, ОПТИМИЗАЦИЯ, ПРУНИНГ, ПАРАЛЛЕЛЬНЫЕ ВЫЧИСЛЕНИЯ.
\\end{abstract}

\\section*{Введение}
Актуальность темы обусловлена необходимостью...

\\section*{Методика исследования}
Математическая модель описывается выражением:
\\begin{equation}
    f(x) = \\sum_{i=1}^{n} w_i x_i + b
\\end{equation}

\\section*{Результаты и выводы}
Экспериментальные исследования показали...
\\end{document}</code></pre>
                        </div>
                        <p>Если журнал издается в две колонки, для разметки тела статьи часто используют пакет для <a href="/blog/latex-multicol-multi-column-layout-journal">многоколоночной верстки журналов в multicol</a>.</p>`
            },
            {
                id: 'online-editing',
                title: 'Оформление научной статьи по ГОСТу онлайн в Labkeeper',
                html: `                        <p>Современное <strong>оформление научной статьи по госту онлайн</strong> через платформу Labkeeper избавляет от необходимости вручную настраивать стили заголовков и бороться с форматированием формул. Все формулы центрируются, их номера автоматически прижимаются к правому краю по ГОСТ 2.105, а таблицы форматируются с правильным переносом шапки.</p>`
            },
            {
                id: 'gost-citations',
                title: 'Список литературы по ГОСТ Р 7.0.5-2008 без ошибок',
                html: `                        <p>В РИНЦ цитирования проверяются автоматически. Если ссылка оформлена с ошибкой (пропущен год, косая черта или страницы), статья может не привязаться к профилю цитируемого автора:</p>
                        <ul>
                            <li><strong>Статья из журнала:</strong> Иванов И. И. Алгоритмы балансировки // Программные продукты и системы. 2024. Т. 37, № 2. С. 45–52.</li>
                            <li><strong>Книга:</strong> Сидоров А. В. Математические методы анализа данных. М.: Наука, 2023. 312 с.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Проверяйте УДК по классификатору',
                html: '<p>УДК должен точно отражать предметную область статьи. Проверить актуальный шифр УДК можно в библиотеке вашего вуза или через онлайн-справочники Teacode.</p>'
            },
            {
                title: 'Векторная печать в Labkeeper',
                html: '<p>При экспорте из Labkeeper все формулы и графики встраиваются в PDF в векторном виде 1200 DPI, что полностью удовлетворяет типографиям научных журналов.</p>'
            }
        ]
    },
    {
        slug: 'latex-algorithm2e-pseudocode-algorithms',
        batch: 2,
        title: 'Написание алгоритмов и псевдокода в LaTeX (пакет algorithm2e)',
        pageTitle: 'Псевдокод в LaTeX algorithm2e: алгоритм блок схема LaTeX — Labkeeper',
        metaDescription: 'Полное руководство по пакету algorithm2e в LaTeX: написание псевдокода, русификация команд, нумерация строк, верстка условий и циклов в Labkeeper.',
        breadcrumbTitle: 'Алгоритмы algorithm2e в LaTeX',
        h1: 'Написание алгоритмов и&nbsp;псевдокода в&nbsp;LaTeX (пакет algorithm2e)',
        categories: ['latex'],
        keywords: [
            'псевдокод в latex algorithm2e',
            'оформление алгоритма блок схема latex'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '8 мин',
        cardTitle: 'Псевдокод и алгоритмы в LaTeX: пакет algorithm2e от А до Я',
        cardDescription: 'Как оформлять математические алгоритмы, циклы, условия и структуры данных с красивыми вертикальными линиями и русской локализацией.',
        sliderTitle: 'Алгоритмы algorithm2e в LaTeX',
        sliderText: 'Красивый псевдокод с нумерацией строк, условиями и циклами в LaTeX.',
        sidebarText: 'В Labkeeper пакет algorithm2e работает «из коробки»: создавайте профессиональные описания алгоритмов для статей и дипломов.',
        ctaTitle: 'Верстайте алгоритмы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с поддержкой algorithm2e, формул amsmath и автоматическим предпросмотром страниц в реальном времени.',
        toc: [
            { id: 'why-algorithm2e', title: 'Почему algorithm2e — стандарт для научных публикаций' },
            { id: 'setup', title: 'Подключение и базовые опции: linesnumbered, ruled, vlined' },
            { id: 'control-structures', title: 'Псевдокод в LaTeX algorithm2e: условия If-Else, циклы While и For' },
            { id: 'russian-localization', title: 'Русификация ключевых слов (Вход, Выход, Если, Иначе)' },
            { id: 'complete-example', title: 'Оформление алгоритма блок схема LaTeX: законченный пример' }
        ],
        sections: [
            {
                id: 'why-algorithm2e',
                title: 'Почему algorithm2e — стандарт для научных публикаций',
                html: `                        <p>При написании дипломных работ по программной инженерии, диссертаций и статей в IEEE/ACM ключевые вычислительные методы принято представлять не длинными листингами кода и не громоздкими рисунками, а в виде компактного псевдокода. Пакет <strong>algorithm2e</strong> — признанный эталон академической верстки алгоритмов.</p>
                        <p>В отличие от пакетов для вывода <a href="/blog/latex-russian-cyrillic-code-listings-minted">листингов исходного кода с кириллицей</a>, algorithm2e ориентирован именно на математическую абстракцию алгоритма, обеспечивая строгую нумерацию строк и визуализацию вложенности условий.</p>`
            },
            {
                id: 'setup',
                title: 'Подключение и базовые опции: linesnumbered, ruled, vlined',
                html: `                        <p>Для подключения пакета добавьте в преамбулу строку с полезными опциями:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Преамбула</span></div>
                            <pre><code>\\usepackage[linesnumbered,ruled,vlined,algo2e]{algorithm2e}</code></pre>
                        </div>
                        <p>Значение параметров:</p>
                        <ul>
                            <li><code>linesnumbered</code> — автоматическая нумерация строк псевдокода слева;</li>
                            <li><code>ruled</code> — оформление заголовка алгоритма элегантными горизонтальными разделительными линиями сверху и снизу;</li>
                            <li><code>vlined</code> — отрисовка аккуратных вертикальных линий, наглядно показывающих границы вложенности условий и циклов;</li>
                            <li><code>algo2e</code> — предотвращение конфликтов имен окружений с другими пакетами.</li>
                        </ul>`
            },
            {
                id: 'control-structures',
                title: 'Псевдокод в LaTeX algorithm2e: условия If-Else, циклы While и For',
                html: `                        <p>Создавая <strong>псевдокод в latex algorithm2e</strong>, вы используете интуитивные макросы для управляющих конструкций:</p>
                        <ul>
                            <li>Условие: <code>\\eIf{условие}{блок тогда}{блок иначе}</code> или <code>\\If{условие}{блок}</code>;</li>
                            <li>Цикл с предусловием: <code>\\While{условие}{тело цикла}</code>;</li>
                            <li>Цикл со счетчиком: <code>\\For{i = 1 \\KwTo n}{тело цикла}</code>;</li>
                            <li>Итератор по коллекции: <code>\\ForEach{элемент \\textbf{in} коллекция}{тело}</code>;</li>
                            <li>Возврат значения: <code>\\Return результат\\;</code> (обратите внимание на обязательную точку с запятой <code>\\;</code> в конце строки).</li>
                        </ul>`
            },
            {
                id: 'russian-localization',
                title: 'Русификация ключевых слов (Вход, Выход, Если, Иначе)',
                html: `                        <p>По умолчанию ключевые слова выводятся на английском языке. Чтобы локализовать их по ГОСТу для русскоязычной работы, задайте переопределения в преамбуле:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Русификация</span></div>
                            <pre><code>\\SetKwInOut{Input}{Вход}
\\SetKwInOut{Output}{Выход}
\\SetKw{KwTo}{до}
\\SetKw{KwDownTo}{вниз до}
\\SetKwIF{If}{ElseIf}{Else}{если}{то}{иначе если}{иначе}{конец если}
\\SetKwFor{While}{пока}{выполнять}{конец цикла}
\\SetKwFor{For}{для}{выполнять}{конец цикла}
\\SetKwFor{ForEach}{для каждого}{выполнять}{конец цикла}
\\SetKw{Return}{вернуть}</code></pre>
                        </div>`
            },
            {
                id: 'complete-example',
                title: 'Оформление алгоритма блок схема LaTeX: законченный пример',
                html: `                        <p>Полный код алгоритма поиска кратчайшего пути Дейкстры. Качественное <strong>оформление алгоритма блок схема latex</strong> в виде псевдокода выглядит строго и профессионально:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Пример алгоритма</span></div>
                            <pre><code>\\begin{algorithm}[htbp]
\\caption{Алгоритм Дейкстры для поиска кратчайшего пути}
\\label{algo:dijkstra}
\\Input{Взвешенный граф $G = (V, E)$, стартовая вершина $s \\in V$}
\\Output{Массив кратчайших расстояний $dist[u]$ для всех $u \\in V$}

\\ForEach{$u \\in V$}{
    $dist[u] \\leftarrow \\infty$\;
    $visited[u] \\leftarrow \\text{false}$\;
}
$dist[s] \\leftarrow 0$\;
Инициализировать очередь с приоритетами $Q$ парой $(0, s)$\;

\\While{$Q$ не пуста}{
    Извлечь вершину $u$ с минимальным $dist[u]$ из $Q$\;
    \\If{$visited[u]$}{
        \\textbf{continue}\;
    }
    $visited[u] \\leftarrow \\text{true}$\;
    
    \\ForEach{соседней вершины $v$ для $u$ со стоимостью ребра $w$}{
        \\If{$dist[u] + w < dist[v]$}{
            $dist[v] \\leftarrow dist[u] + w$\;
            Добавить $(dist[v], v)$ в очередь $Q$\;
        }
    }
}
\\Return $dist$\;
\\end{algorithm}</code></pre>
                        </div>
                        <p>Чтобы читатель мог перейти к описанию алгоритма из текста работы по клику на его номер, настройте систему <a href="/blog/latex-hyperref-pdf-bookmarks-navigation">кликабельных перекрестных ссылок в PDF</a>.</p>`
            }
        ],
        tips: [
            {
                title: 'Точка с запятой \\; в конце строки',
                html: '<p>В algorithm2e команда <code>\\;</code> не просто печатает точку с запятой, а завершает логическую строку и осуществляет перенос на новую строку с сохранением нумерации.</p>'
            },
            {
                title: 'Компиляция в Labkeeper',
                html: '<p>В онлайн-редакторе Labkeeper вы можете мгновенно отлаживать сложные многостраничные алгоритмы без конфликтов стилевых файлов.</p>'
            }
        ]
    },
    {
        slug: 'latex-hyperref-pdf-bookmarks-navigation',
        batch: 2,
        title: 'Создание закладок (bookmarks) и навигации в PDF (hyperref)',
        pageTitle: 'Закладки в PDF LaTeX hyperref: навигация по оглавлению PDF — Labkeeper',
        metaDescription: 'Как настроить пакет hyperref в LaTeX: интерактивные закладки в PDF, кликабельное оглавление, цветные ссылки и решение проблем с кириллицей в Labkeeper.',
        breadcrumbTitle: 'Закладки PDF и hyperref в LaTeX',
        h1: 'Создание закладок (bookmarks) и&nbsp;навигации в&nbsp;PDF (hyperref)',
        categories: ['latex'],
        keywords: [
            'закладки в pdf latex hyperref',
            'навигация по оглавлению pdf latex'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '7 мин',
        cardTitle: 'Пакет hyperref: закладки, ссылки и интерактивная навигация в PDF',
        cardDescription: 'Как сделать оглавление кликабельным, включить боковое дерево закладок в PDF-ридере и избавиться от кракозябр в русскоязычных названиях глав.',
        sliderTitle: 'Закладки в PDF (hyperref)',
        sliderText: 'Интерактивная навигация по документу, дерево закладок и цветные ссылки.',
        sidebarText: 'В Labkeeper сгенерированные PDF автоматически содержат встроенные закладки и кликабельные ссылки для удобной навигации.',
        ctaTitle: 'Создавайте интерактивные PDF в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с идеальной настройкой пакета hyperref: авто-ссылки на формулы, рисунки и оглавление без сбоев.',
        toc: [
            { id: 'why-navigation', title: 'Зачем нужны интерактивные закладки в научных документах' },
            { id: 'hyperref-setup', title: 'Закладки в PDF LaTeX hyperref: эталонная конфигурация' },
            { id: 'cyrillic-encoding', title: 'Решение проблемы с кракозябрами в русских закладках' },
            { id: 'toc-navigation', title: 'Навигация по оглавлению PDF LaTeX: ссылки на формулы и рисунки' },
            { id: 'print-vs-screen', title: 'Черно-белые ссылки для печати против цветных для экрана' }
        ],
        sections: [
            {
                id: 'why-navigation',
                title: 'Зачем нужны интерактивные закладки в научных документах',
                html: `                        <p>Когда вы отправляете дипломную работу, диссертацию или отчет в электронную среду университета или рецензенту журнала, первое, на что обращает внимание читатель — это удобство навигации в PDF-ридере (Adobe Acrobat, Chrome PDF Viewer, Preview). Если боковая панель закладок (Bookmarks / Outline) пуста, ориентироваться в 100-страничном труде крайне мучительно.</p>
                        <p>Пакет <strong>hyperref</strong> превращает статический документ в интерактивный гипертекст: оглавление становится кликабельным, номера формул и рисунков ведут к соответствующим объектам, а слева формируется аккуратное многоуровневое дерево разделов. Это один из главных аргументов при <a href="/blog/word-formatting-issues-diploma-lightweight-markup-alternative">переходе с Word на профессиональную верстку</a>.</p>`
            },
            {
                id: 'hyperref-setup',
                title: 'Закладки в PDF LaTeX hyperref: эталонная конфигурация',
                html: `                        <p>Чтобы правильно сгенерировать <strong>закладки в pdf latex hyperref</strong>, подключите пакет <em>в самом конце преамбулы</em> (за редким исключением пакетов вроде <code>cleveref</code> или <code>bookmark</code>):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Конфигурация hyperref</span></div>
                            <pre><code>\\usepackage{xcolor}
\\usepackage[
    unicode=true,
    pdfstartview={FitH},
    bookmarks=true,
    bookmarksnumbered=true,
    bookmarksopen=true,
    colorlinks=true,
    linkcolor=blue,
    citecolor=teal,
    urlcolor=magenta
]{hyperref}</code></pre>
                        </div>
                        <p>Параметры:</p>
                        <ul>
                            <li><code>unicode=true</code> — корректная обработка кириллических заголовков в метаданных PDF;</li>
                            <li><code>bookmarksnumbered=true</code> — отображение номеров глав (1, 1.1, 1.2) в боковом меню закладок;</li>
                            <li><code>bookmarksopen=true</code> — дерево закладок сразу открыто в развернутом виде при первом открытии файла;</li>
                            <li><code>colorlinks=true</code> — ссылки выделяются цветом вместо некрасивых рамок вокруг текста.</li>
                        </ul>`
            },
            {
                id: 'cyrillic-encoding',
                title: 'Решение проблемы с кракозябрами в русских закладках',
                html: `                        <p>Если в заголовках глав содержатся математические формулы (например, <code>\\section{Анализ функции $f(x) = x^2$}</code>), в боковых закладках PDF может появиться предупреждение <code>Token not allowed in a PDF string</code>.</p>
                        <p>Для таких случаев в hyperref предусмотрена команда <code>\\texorpdfstring</code>, которая выводит формулу в тексте, а в закладку отправляет чистый текст:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Заголовок с формулой</span></div>
                            <pre><code>\\section{Исследование уравнения \\texorpdfstring{$E = mc^2$}{E = mc\textasciicircum 2}}</code></pre>
                        </div>
                        <p>Также рекомендуется дополнительно подключить современный пакет <code>\\usepackage{bookmark}</code> сразу после <code>hyperref</code> — он обновляет закладки за один проход компилятора вместо двух.</p>`
            },
            {
                id: 'toc-navigation',
                title: 'Навигация по оглавлению PDF LaTeX: ссылки на формулы и рисунки',
                html: `                        <p>Полноценная <strong>навигация по оглавлению pdf latex</strong> охватывает не только содержание, но и перекрестные ссылки в тексте. Используйте связку <code>\\label{...}</code> и <code>\\ref{...}</code> / <code>\\eqref{...}</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Ссылки</span></div>
                            <pre><code>Как показано на рисунке~\\ref{fig:schema}, выходной сигнал...
В соответствии с формулой~\\eqref{eq:motion}, скорость нарастает линейно.</code></pre>
                        </div>
                        <p>Клик по номеру рисунка или формулы в PDF мгновенно переместит пользователя к соответствующему объекту. Те же правила перекрестных ссылок действуют и при <a href="/blog/latex-russian-cyrillic-code-listings-minted">оформлении листингов кода в LaTeX без ошибок</a>.</p>`
            },
            {
                id: 'print-vs-screen',
                title: 'Черно-белые ссылки для печати против цветных для экрана',
                html: `                        <p>Для бумажной версии диплома нормоконтроль часто требует, чтобы текст был строго черным, без синих ссылок. Чтобы сохранить кликабельность в PDF, но сделать цвет черным, используйте настройку:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Печатная версия</span></div>
                            <pre><code>\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    citecolor=black,
    urlcolor=black
}</code></pre>
                        </div>`
            }
        ],
        tips: [
            {
                title: 'Подключайте hyperref последним',
                html: '<p>Почти всегда <code>hyperref</code> должен быть последним пакетом в преамбуле документа, иначе другие пакеты могут переопределить макросы ссылок и сломать переход по страницам.</p>'
            },
            {
                title: 'Готовая навигация в Labkeeper',
                html: '<p>В Labkeeper все шаблоны ВКР и статей уже включают преднастроенный hyperref с корректной поддержкой кириллицы и кликабельных закладок.</p>'
            }
        ]
    },
    {
        slug: 'latex-arraystretch-table-row-height-spacing',
        batch: 2,
        title: 'Настройка межстрочного интервала внутри таблиц (arraystretch)',
        pageTitle: 'Увеличить высоту строки в таблице LaTeX: arraystretch настройка — Labkeeper',
        metaDescription: 'Как увеличить высоту строки в таблице LaTeX с помощью arraystretch. Настройка вертикальных интервалов, отступы в формульных ячейках и примеры в Labkeeper.',
        breadcrumbTitle: 'Интервал в таблицах arraystretch в LaTeX',
        h1: 'Настройка межстрочного интервала внутри таблиц (arraystretch)',
        categories: ['latex'],
        keywords: [
            'увеличить высоту строки в таблице latex',
            'arraystretch настройка интервала'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '6 мин',
        cardTitle: 'Высота строк в таблицах LaTeX: команда arraystretch и вертикальные отступы',
        cardDescription: 'Как избавиться от тесных ячеек, в которых дроби и символы касаются горизонтальных линий, с помощью локальной настройки arraystretch.',
        sliderTitle: 'Высота строк в таблицах (arraystretch)',
        sliderText: 'Как сделать таблицы просторными и читаемыми с помощью переопределения arraystretch.',
        sidebarText: 'В Labkeeper таблицы компилируются с профессиональными типографическими отступами без слипания строк.',
        ctaTitle: 'Верстайте красивые таблицы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с поддержкой пакетов booktabs, array и автоматическим выравниванием строк по ГОСТ.',
        toc: [
            { id: 'cramped-problem', title: 'Проблема «тесных» таблиц в стандартном LaTeX' },
            { id: 'arraystretch-command', title: 'Увеличить высоту строки в таблице LaTeX: макрос arraystretch' },
            { id: 'local-vs-global', title: 'Arraystretch настройка интервала: локальное против глобального применения' },
            { id: 'booktabs-alternative', title: 'Пакет booktabs и микро-отступы aboverulesep / belowrulesep' },
            { id: 'struts-method', title: 'Использование невидимых распорок (struts) для единичных ячеек' }
        ],
        sections: [
            {
                id: 'cramped-problem',
                title: 'Проблема «тесных» таблиц в стандартном LaTeX',
                html: `                        <p>По умолчанию стандартные окружения <code>tabular</code> и <code>array</code> в LaTeX используют довольно плотные межстрочные интервалы. Если в ячейках таблицы содержится только простой текст, это выглядит приемлемо. Однако стоит добавить в ячейку математическую дробь (<code>\\frac{a}{b}</code>), верхний индекс или прописную букву с диакритикой, как элементы начинают буквально «прилипать» к горизонтальным линиям <code>\\hline</code>.</p>
                        <p>Таблица теряет академическую эстетику и становится трудночитаемой. К счастью, в LaTeX есть элегантное и простое решение — переопределение масштабного коэффициента высоты строк. А если таблица не помещается по ширине страницы, на помощь приходит окружение для <a href="/blog/latex-rotating-package-sidewaystable-rotate-90">поворота широких таблиц на 90 градусов</a>.</p>`
            },
            {
                id: 'arraystretch-command',
                title: 'Увеличить высоту строки в таблице LaTeX: макрос arraystretch',
                html: `                        <p>Самый быстрый и надежный способ <strong>увеличить высоту строки в таблице latex</strong> — использовать команду:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Команда</span></div>
                            <pre><code>\\renewcommand{\\arraystretch}{1.3}</code></pre>
                        </div>
                        <p>Значение <code>1.0</code> соответствует стандартной плотности. Установка коэффициента <code>1.2–1.4</code> делает таблицу просторной, воздушной и визуально гармоничной. Для таблиц с крупными математическими формулами рекомендуется значение <code>1.5</code>.</p>`
            },
            {
                id: 'local-vs-global',
                title: 'Arraystretch настройка интервала: локальное против глобального применения',
                html: `                        <p>Грамотная <strong>arraystretch настройка интервала</strong> должна быть <em>локальной</em>. Если объявить <code>\\renewcommand{\\arraystretch}{1.4}</code> в преамбуле, растянутся не только обычные таблицы, но и все математические матрицы (<code>pmatrix</code>, <code>bmatrix</code>), что испортит формульный аппарат.</p>
                        <p>Применяйте настройку строго внутри окружения <code>table</code> или оборачивайте в фигурные скобки:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">Локальное применение</span></div>
                            <pre><code>\\begin{table}[htbp]
\\centering
\\renewcommand{\\arraystretch}{1.35} % Действует только на эту таблицу!
\\caption{Экспериментальные параметры колебательного контура}
\\label{tab:rlc}
\\begin{tabular}{|l|c|r|}
\\hline
Параметр & Формула & Значение \\\\
\\hline
Индуктивность & $L = \\frac{\\Phi}{I}$ & $2.5\\text{ мГн}$ \\\\
Емкость & $C = \\frac{q}{U}$ & $100\\text{ пФ}$ \\\\
Резонансная частота & $\\omega_0 = \\frac{1}{\\sqrt{LC}}$ & $2.0\\text{ МГц}$ \\\\
\\hline
\\end{tabular}
\\end{table}</code></pre>
                        </div>
                        <p>Если вы автоматизируете расчеты, то можете комбинировать arraystretch при <a href="/blog/latex-pgfplotstable-import-excel-csv-tables">импорте таблиц из Excel через pgfplotstable</a>, получая идеальные отступы между строками данных.</p>`
            },
            {
                id: 'booktabs-alternative',
                title: 'Пакет booktabs и микро-отступы aboverulesep / belowrulesep',
                html: `                        <p>В современных научных статьях высокого уровня вместо сплошных линий <code>\\hline</code> используется профессиональный пакет <code>booktabs</code> (команды <code>\\toprule</code>, <code>\\midrule</code>, <code>\\bottomrule</code>). Пакет автоматически добавляет эстетичные отступы сверху и снизу от линий, которые можно тонко настраивать:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX booktabs</span></div>
                            <pre><code>\\usepackage{booktabs}
\\setlength{\\aboverulesep}{0.8ex}
\\setlength{\\belowrulesep}{0.8ex}</code></pre>
                        </div>`
            },
            {
                id: 'struts-method',
                title: 'Использование невидимых распорок (struts) для единичных ячеек',
                html: `                        <p>Если вам нужно увеличить высоту только одной конкретной строки (например, шапки таблицы), не меняя остальные строки, используйте невидимую вертикальную распорку — команду <code>\\rule{0pt}{высота}</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Распорка strut</span></div>
                            <pre><code>\\hline
\\rule{0pt}{3ex} Высокая ячейка шапки & Значение \\\\[1ex]
\\hline</code></pre>
                        </div>`
            }
        ],
        tips: [
            {
                title: 'Идеальный коэффициент 1.3 для ГОСТ',
                html: '<p>Для отчетов и дипломных работ по ГОСТу значение <code>\\renewcommand{\\arraystretch}{1.25-1.3}</code> является оптимальным балансом между компактностью и читаемостью.</p>'
            },
            {
                title: 'Табличный редактор в Labkeeper',
                html: '<p>В Labkeeper вы можете комбинировать стили оформления таблиц с моментальным визуальным контролем высоты строк перед финальной сборкой в PDF.</p>'
            }
        ]
    }
];
