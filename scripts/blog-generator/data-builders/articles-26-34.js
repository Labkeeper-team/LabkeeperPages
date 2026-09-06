module.exports = [
    {
        "slug": "latex-minipage-images-tables-side-by-side",
        "batch": 2,
        "title": "Расположение нескольких картинок и таблиц рядом (minipage)",
        "pageTitle": "Две картинки рядом в LaTeX minipage: текст рядом с таблицей — Labkeeper",
        "metaDescription": "Как расположить две картинки рядом в LaTeX через minipage, разместить текст рядом с таблицей, настроить subcaption и точные ширины в Labkeeper.",
        "breadcrumbTitle": "Изображения и таблицы рядом (minipage)",
        "h1": "Расположение нескольких картинок и&nbsp;таблиц рядом (minipage)",
        "categories": [
            "latex"
        ],
        "keywords": [
            "две картинки рядом latex minipage",
            "текст рядом с таблицей latex"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "7 мин",
        "cardTitle": "Картинки и таблицы бок о бок в LaTeX: руководство по minipage",
        "cardDescription": "Как разместить два рисунка в одну строку, поставить таблицу параллельно тексту или пояснению, настроить независимые подписи через окружение minipage.",
        "sliderTitle": "Картинки и таблицы рядом (minipage)",
        "sliderText": "Окружение minipage, две картинки в строку и текст рядом с таблицей.",
        "sidebarText": "Верстайте сложные многоколоночные блоки и графики прямо в онлайн-редакторе Labkeeper.",
        "ctaTitle": "Управляйте версткой графики в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор LaTeX с поддержкой многоколоночной верстки, пакета minipage и мгновенным PDF-рендерингом.",
        "toc": [
            {
                "id": "intro",
                "title": "Зачем нужно окружение minipage"
            },
            {
                "id": "two-images",
                "title": "Две картинки рядом latex minipage: пошаговый шаблон"
            },
            {
                "id": "table-and-text",
                "title": "Текст рядом с таблицей latex: компактная верстка"
            },
            {
                "id": "subcaption-pkg",
                "title": "Независимая нумерация подрисуночных подписей (subcaption)"
            },
            {
                "id": "alignment-tips",
                "title": "Вертикальное выравнивание блоков (t, c, b)"
            }
        ],
        "sections": [
            {
                "id": "intro",
                "title": "Зачем нужно окружение minipage",
                "html": "                        <p>В стандартном LaTeX каждый рисунок или таблица стремятся занять всю горизонтальную полосу страницы. Если иллюстрации узкие или вытянуты вертикально, на листе образуются огромные пустые поля, а объем документа неоправданно растет.</p>\n                        <p>Окружение <strong>minipage</strong> создает независимую «мини-страницу» фиксированной ширины. Несколько таких блоков, поставленных друг за другом без пустой строки, выстраиваются строго в одну горизонтальную линию.</p>"
            },
            {
                "id": "two-images",
                "title": "Две картинки рядом latex minipage: пошаговый шаблон",
                "html": "                        <p>Классический способ расположить <strong>две картинки рядом latex minipage</strong> с общей или раздельными подписями (в отличие от <a href=\"/blog/latex-wrapfig-text-flow\">обтекания картинок текстом через wrapfig</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\begin{figure}[htbp]\n    \\centering\n    % Первый блок (48% ширины текста)\n    \\begin{minipage}[b]{0.48\\textwidth}\n        \\centering\n        \\includegraphics[width=\\textwidth]{chart1.pdf}\n        \\caption{Эксперимент до оптимизации}\n        \\label{fig:chart1}\n    \\end{minipage}\n    \\hfill % Резиновый горизонтальный пробел между блоками\n    % Второй блок (48% ширины текста)\n    \\begin{minipage}[b]{0.48\\textwidth}\n        \\centering\n        \\includegraphics[width=\\textwidth]{chart2.pdf}\n        \\caption{Эксперимент после оптимизации}\n        \\label{fig:chart2}\n    \\end{minipage}\n\\end{figure}</code></pre>\n                        </div>\n                        <p>Команда <code>\\hfill</code> автоматически распределяет оставшиеся 4% ширины в аккуратный равномерный зазор между двумя иллюстрациями.</p>"
            },
            {
                "id": "table-and-text",
                "title": "Текст рядом с таблицей latex: компактная верстка",
                "html": "                        <p>В методических указаниях и научных отчетах часто требуется разместить <strong>текст рядом с таблицей latex</strong> — например, краткое пояснение к числовым коэффициентам:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\noindent\n\\begin{minipage}[c]{0.52\\textwidth}\n    \\begin{tabular}{|l|c|r|}\n        \\hline\n        \\textbf{Параметр} & \\textbf{Символ} & \\textbf{Значение} \\\\\n        \\hline\n        Коэффициент трения & $\\mu$ & 0.15 \\\\\n        Масса образца & $m$ & 2.45 кг \\\\\n        Ускорение & $a$ & 9.81 м/с$^2$ \\\\\n        \\hline\n    \\end{tabular}\n\\end{minipage}\n\\hfill\n\\begin{minipage}[c]{0.44\\textwidth}\n    \\small\n    Приведенные в таблице константы соответствуют стандартным атмосферным условиям ($T = 20~^\\circ\\text{C}$, $P = 101.3$~кПа). Расчет выполнен по формуле сухого трения.\n\\end{minipage}</code></pre>\n                        </div>"
            },
            {
                "id": "subcaption-pkg",
                "title": "Независимая нумерация подрисуночных подписей (subcaption)",
                "html": "                        <p>Если две картинки являются частями одной общей иллюстрации, лучше подключить пакет <code>subcaption</code> и использовать окружения <code>subfigure</code>. Это дает стандартную нумерацию вида «Рисунок 1 — Схема установки: а — вид спереди; б — вид сверху», что отлично согласуется с правилами <a href=\"/blog/figure-double-numbering-chapters-gost\">двойной нумерации рисунков по главам по ГОСТ</a>.</p>"
            },
            {
                "id": "alignment-tips",
                "title": "Вертикальное выравнивание блоков (t, c, b)",
                "html": "                        <p>Опциональный параметр выравнивания определяет, по какой линии центрируются соседние блоки minipage:</p>\n                        <ul>\n                            <li><code>[t]</code> (top) — выравнивание по первой строке текста или верхнему краю картинки;</li>\n                            <li><code>[c]</code> (center) — выравнивание по геометрическому центру (по умолчанию);</li>\n                            <li><code>[b]</code> (bottom) — выравнивание по нижней базовой линии (идеально для подрисуночных подписей).</li>\n                        </ul>"
            }
        ],
        "tips": [
            {
                "title": "Опасность пустой строки в коде",
                "html": "<p>Никогда не оставляйте пустую строку между закрывающим <code>\\end{minipage}</code> и следующим <code>\\begin{minipage}</code>, иначе LaTeX воспримет это как новый абзац и перенесет второй блок на следующую строку.</p>"
            },
            {
                "title": "Сумма ширин менее 1.0\\textwidth",
                "html": "<p>Суммарная ширина двух minipage плюс пробел не должна превышать <code>\\textwidth</code>, иначе возникнет ошибка переполнения <code>Overfull \\hbox</code>.</p>"
            }
        ]
    },
    {
        "slug": "latex-custom-rgb-hex-colors-xcolor",
        "batch": 2,
        "title": "Пользовательские цвета RGB и HEX для текста (пакет xcolor)",
        "pageTitle": "Свой цвет HEX в LaTeX xcolor: цветной текст RGB онлайн — Labkeeper",
        "metaDescription": "Как задать свой цвет HEX в LaTeX через xcolor: цветной текст RGB, палитры CMYK, HTML-коды, создание брендовых стилей в онлайн-редакторе Labkeeper.",
        "breadcrumbTitle": "Пользовательские цвета RGB и HEX (xcolor)",
        "h1": "Пользовательские цвета RGB и&nbsp;HEX для текста (пакет xcolor)",
        "categories": [
            "latex"
        ],
        "keywords": [
            "свой цвет hex в latex xcolor",
            "цветной текст rgb latex"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "6 мин",
        "cardTitle": "Пользовательские цвета RGB и HEX в LaTeX: точная палитра через xcolor",
        "cardDescription": "Как объявлять кастомные цвета по HTML-коду (#1A73E8) и модели RGB (0..255 или 0..1), красить текст, формулы, рамки и фоны без ограничений стандартной палитры.",
        "sliderTitle": "Пользовательские цвета RGB и HEX в LaTeX",
        "sliderText": "Объявление HEX и RGB оттенков, брендовые цвета и палитры xcolor.",
        "sidebarText": "Создавайте брендовые презентации и отчеты с идеальной передачей цветов в веб-редакторе Labkeeper.",
        "ctaTitle": "Настраивайте палитру документов в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор с полной поддержкой пакета xcolor, подсветкой синтаксиса и прецизионной передачей цветов в PDF.",
        "toc": [
            {
                "id": "intro",
                "title": "Почему стандартных 8 цветов недостаточно"
            },
            {
                "id": "hex-define",
                "title": "Свой цвет hex в latex xcolor: директива definecolor"
            },
            {
                "id": "rgb-define",
                "title": "Цветной текст rgb latex: модели дробного и целочисленного RGB"
            },
            {
                "id": "usage-examples",
                "title": "Применение кастомных цветов: текст, фон, рамки и ссылки"
            },
            {
                "id": "cmyk-print",
                "title": "Особенности подготовки к полиграфической печати (CMYK)"
            }
        ],
        "sections": [
            {
                "id": "intro",
                "title": "Почему стандартных 8 цветов недостаточно",
                "html": "                        <p>Базовый TeX предоставляет всего несколько примитивных цветов: red, green, blue, cyan, magenta, yellow, black, white. В реальных проектах — презентациях Beamer, корпоративных гайдах, дипломных плакатах — требуются точные оттенки из брендбуков или дизайн-макетов Figma.</p>\n                        <p>В дополнение к базовым функциям <a href=\"/blog/latex-xcolor-text-background\">работы с цветом текста и фона в xcolor</a>, расширенный пакет снимает любые колористические ограничения, позволяя объявлять собственные именованные оттенки в цветовых пространствах HTML-HEX, RGB (дробном и 255) и полиграфическом CMYK.</p>"
            },
            {
                "id": "hex-define",
                "title": "Свой цвет hex в latex xcolor: директива definecolor",
                "html": "                        <p>Самый удобный способ для веб-разработчиков и дизайнеров задать <strong>свой цвет hex в latex xcolor</strong> — использовать модель <code>HTML</code> (шестнадцатеричный код без решетки):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\usepackage{xcolor}\n\n% Задание цветов по HEX-коду:\n\\definecolor{BrandBlue}{HTML}{1A73E8}\n\\definecolor{DarkSlate}{HTML}{2D3748}\n\\definecolor{WarningAmber}{HTML}{D97706}\n\\definecolor{EmeraldGreen}{HTML}{059669}</code></pre>\n                        </div>\n                        <p>После объявления в преамбуле новые цвета используются стандартными командами: <code>\\textcolor{BrandBlue}{Фирменный текст}</code>.</p>"
            },
            {
                "id": "rgb-define",
                "title": "Цветной текст rgb latex: модели дробного и целочисленного RGB",
                "html": "                        <p>Чтобы получить <strong>цветной текст rgb latex</strong>, в TeX предусмотрены две разновидности модели:</p>\n                        <ul>\n                            <li><strong>Дробный <code>rgb</code> (значения каналов от 0.0 до 1.0):</strong>\n                                <pre><code>\\definecolor{DeepPurple}{rgb}{0.45, 0.15, 0.72}</code></pre>\n                            </li>\n                            <li><strong>Целочисленный <code>RGB</code> (заглавные буквы, значения от 0 до 255):</strong>\n                                <pre><code>\\definecolor{BrightCoral}{RGB}{255, 112, 67}</code></pre>\n                                Этот формат совпадает с обычными значениями Photoshop и CSS <code>rgb(255, 112, 67)</code>.\n                            </li>\n                        </ul>"
            },
            {
                "id": "usage-examples",
                "title": "Применение кастомных цветов: текст, фон, рамки и ссылки",
                "html": "                        <p>Примеры комплексного оформления документа объявленными оттенками (такие цветовые палитры часто применяют при <a href=\"/blog/latex-tcolorbox-theorems-callouts\">оформлении цветных блоков и теорем в tcolorbox</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>% Окраска фрагмента текста\n\\textcolor{DarkSlate}{Основной строгий текст} и \\textcolor{EmeraldGreen}{\\textbf{успешный статус}}.\n\n% Блок в рамке с кастомным фоном\n\\fcolorbox{BrandBlue}{BrandBlue!10}{Важное примечание на мягком голубом фоне.}\n\n% Цветные математические формулы\n\\begin{equation}\n    \\textcolor{BrandBlue}{E} = \\textcolor{WarningAmber}{m} \\cdot \\textcolor{EmeraldGreen}{c^2}\n\\end{equation}</code></pre>\n                        </div>"
            },
            {
                "id": "cmyk-print",
                "title": "Особенности подготовки к полиграфической печати (CMYK)",
                "html": "                        <p>Если документ планируется отдавать в профессиональную типографию на офсетную печать, объявляйте цвета в четырехкрасочной модели: <code>\\definecolor{PrintCyan}{cmyk}{1.0, 0.0, 0.0, 0.0}</code>, чтобы избежать цветовых искажений при конвертации из экранного RGB.</p>"
            }
        ],
        "tips": [
            {
                "title": "Плавное осветление цвета",
                "html": "<p>Синтаксис <code>BrandBlue!30</code> создает цвет, состоящий на 30% из BrandBlue и на 70% из белого, что идеально для фона таблиц и плашек.</p>"
            },
            {
                "title": "Интеграция с hyperref",
                "html": "<p>Задайте кастомный цвет для всех веб-ссылок в преамбуле: <code>\\hypersetup{colorlinks=true, urlcolor=BrandBlue, linkcolor=DarkSlate}</code>.</p>"
            }
        ]
    },
    {
        "slug": "latex-multi-file-document-input-include",
        "batch": 2,
        "title": "Сборка большого документа из нескольких файлов (input и include)",
        "pageTitle": "Разбить диплом на несколько файлов LaTeX: команда include и input — Labkeeper",
        "metaDescription": "Как разбить диплом на несколько файлов в LaTeX: команда include и input, структура глав, выборочная компиляция includeonly в онлайн-редакторе Labkeeper.",
        "breadcrumbTitle": "Сборка из нескольких файлов (input / include)",
        "h1": "Сборка большого документа из&nbsp;нескольких файлов (input и&nbsp;include)",
        "categories": [
            "latex",
            "diploma"
        ],
        "keywords": [
            "разбить диплом на несколько файлов latex",
            "команда include latex"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "7 мин",
        "cardTitle": "Модульная структура проекта в LaTeX: команды include, input и includeonly",
        "cardDescription": "Как грамотно организовать структуру диплома или диссертации: вынос глав, введения и приложений в отдельные файлы .tex, ускорение компиляции.",
        "sliderTitle": "Сборка документа из файлов (include)",
        "sliderText": "Модульная структура диплома, команды include, input и includeonly.",
        "sidebarText": "Работайте с масштабными научными проектами и многостраничными главами в Labkeeper без зависаний.",
        "ctaTitle": "Организуйте структуру ВКР в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор с поддержкой многофайловых проектов LaTeX, быстрым переключением глав и компиляцией в один клик.",
        "toc": [
            {
                "id": "why-modular",
                "title": "Зачем делить большой проект на отдельные файлы"
            },
            {
                "id": "input-vs-include",
                "title": "Разница между командами \\input и \\include"
            },
            {
                "id": "diploma-structure",
                "title": "Разбить диплом на несколько файлов latex: эталонная иерархия папок"
            },
            {
                "id": "includeonly-speed",
                "title": "Команда include latex и выборочная компиляция через includeonly"
            },
            {
                "id": "subfiles-pkg",
                "title": "Продвинутый подход: пакет subfiles для автономной компиляции глав"
            }
        ],
        "sections": [
            {
                "id": "why-modular",
                "title": "Зачем делить большой проект на отдельные файлы",
                "html": "                        <p>Дипломная работа, магистерская диссертация или монография содержит от 60 до 200+ страниц, сотни формул, рисунков и таблиц. Вести такой объем в одном файле <code>main.tex</code> неудобно: поиск нужного абзаца превращается в бесконечный скроллинг, а случайная ошибка в одном месте ломает компиляцию всей работы.</p>\n                        <p>Модульная архитектура разбивает проект на логические части: введение, отдельные главы, заключение, список литературы и приложения лежат в изолированных файлах, собираемых главным корневым документом.</p>"
            },
            {
                "id": "input-vs-include",
                "title": "Разница между командами \\input и \\include",
                "html": "                        <p>В LaTeX существует две директивы подключения внешних файлов, имеющие принципиальные различия (это особенно важно при <a href=\"/blog/diploma-appendices-listings-diagrams-gost\">выносе приложений и листингов в дипломной работе</a>):</p>\n                        <ul>\n                            <li><code>\\input{путь/к/файлу}</code> — буквально вставляет содержимое файла в текущее место документа «как есть». Не создает разрывов страниц. Идеально для преамбулы (<code>\\input{preamble.tex}</code>), таблиц или фрагментов текста внутри раздела.</li>\n                            <li><code>\\include{путь/к/файлу}</code> — вставляет файл, <strong>всегда предваряя и завершая его командой \\clearpage</strong> (начиная новую страницу). Создает собственный вспомогательный файл <code>.aux</code>, что позволяет использовать механизм выборочной компиляции. Идеально для крупных глав (<code>chapter</code>).</li>\n                        </ul>"
            },
            {
                "id": "diploma-structure",
                "title": "Разбить диплом на несколько файлов latex: эталонная иерархия папок",
                "html": "                        <p>Вот проверенная академическая структура проекта (<strong>разбить диплом на несколько файлов latex</strong>), рекомендованная при <a href=\"/blog/latex-diploma-gost\">оформлении диплома по ГОСТ в LaTeX</a>:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Структура файлов</span></div>\n                            <pre><code>my-diploma/\n├── main.tex             % Главный файл со сборкой\n├── preamble.tex         % Все пакеты и настройки ГОСТ\n├── biblio.bib           % База источников BibTeX\n├── chapters/            % Папка с главами работы\n│   ├── 00-intro.tex     % Введение\n│   ├── 01-analysis.tex  % Глава 1: Анализ предметной области\n│   ├── 02-design.tex    % Глава 2: Проектирование системы\n│   ├── 03-impl.tex      % Глава 3: Реализация и тестирование\n│   └── 04-concl.tex     % Заключение\n└── appendices/          % Приложения с кодом\n    └── app-a-code.tex</code></pre>\n                        </div>\n                        <p>В главном файле <code>main.tex</code> сборка выглядит компактно и наглядно:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">main.tex</span></div>\n                            <pre><code>\\documentclass[14pt,a4paper]{report}\n\\input{preamble} % Подключаем преамбулу\n\n\\begin{document}\n\\include{chapters/00-intro}\n\\include{chapters/01-analysis}\n\\include{chapters/02-design}\n\\include{chapters/03-impl}\n\\include{chapters/04-concl}\n\n\\bibliographystyle{gost-numeric}\n\\bibliography{biblio}\n\\end{document}</code></pre>\n                        </div>"
            },
            {
                "id": "includeonly-speed",
                "title": "Команда include latex и выборочная компиляция через includeonly",
                "html": "                        <p>Когда вы работаете над конкретной главой, нет смысла каждый раз перекомпилировать весь стостраничный документ. <strong>Команда include latex</strong> поддерживает волшебную директиву <code>\\includeonly</code> в преамбуле:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>% Компилировать СТРОГО главу 2, сохраняя сквозные номера страниц и формул!\n\\includeonly{chapters/02-design}</code></pre>\n                        </div>\n                        <p>Благодаря отдельным <code>.aux</code> файлам LaTeX сохранит верные перекрестные ссылки на формулы из других глав, но сборка займет 1 секунду вместо 15.</p>"
            },
            {
                "id": "subfiles-pkg",
                "title": "Продвинутый подход: пакет subfiles для автономной компиляции глав",
                "html": "                        <p>Пакет <code>subfiles</code> позволяет компилировать каждую главу <strong>как автономный независимый документ</strong> (нажатием кнопки сборки прямо внутри <code>02-design.tex</code>), так и в составе единого проекта <code>main.tex</code> без изменения кода.</p>"
            }
        ],
        "tips": [
            {
                "title": "Не указывайте расширение .tex",
                "html": "<p>При вызове <code>\\include{chapters/intro}</code> не дописывайте расширение <code>.tex</code>: LaTeX подставит его автоматически.</p>"
            },
            {
                "title": "Запрет вложенных include",
                "html": "<p>Внутри файла, подключенного через <code>\\include</code>, нельзя вызывать другой <code>\\include</code>. Для вложенных подфайлов используйте команду <code>\\input</code>.</p>"
            }
        ]
    },
    {
        "slug": "latex-tcolorbox-theorems-callouts",
        "batch": 2,
        "title": "Оформление теорем, лемм и определений в цветных рамках (tcolorbox)",
        "pageTitle": "Красивые рамки для теорем LaTeX tcolorbox: цветной блок с текстом — Labkeeper",
        "metaDescription": "Красивые рамки для теорем в LaTeX через tcolorbox: цветной блок с текстом онлайн, определения, формулы, иконки и скругленные углы в Labkeeper.",
        "breadcrumbTitle": "Цветные рамки и блоки (tcolorbox)",
        "h1": "Оформление теорем, лемм и&nbsp;определений в&nbsp;цветных рамках (tcolorbox)",
        "categories": [
            "latex"
        ],
        "keywords": [
            "красивые рамки для теорем latex tcolorbox",
            "цветной блок с текстом latex"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "8 мин",
        "cardTitle": "Цветные блоки и рамки для теорем в LaTeX: руководство по пакету tcolorbox",
        "cardDescription": "Как выделить важные правила, замечания, теоремы и примеры в современные цветные плашки со скругленными углами, тенями и заголовками.",
        "sliderTitle": "Цветные рамки и теоремы (tcolorbox)",
        "sliderText": "Современные плашки callouts, стилизация теорем, определения и тени.",
        "sidebarText": "Создавайте учебники и конспекты университетского уровня с красивыми блоками tcolorbox в Labkeeper.",
        "ctaTitle": "Выделяйте главное в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор LaTeX с поддержкой пакета tcolorbox, моментальной PDF-компиляцией и готовыми сниппетами блоков.",
        "toc": [
            {
                "id": "intro",
                "title": "Возможности современного пакета tcolorbox"
            },
            {
                "id": "basic-box",
                "title": "Цветной блок с текстом latex: базовое окружение"
            },
            {
                "id": "theorems-setup",
                "title": "Красивые рамки для теорем latex tcolorbox: счетчики и заголовки"
            },
            {
                "id": "custom-callouts",
                "title": "Создание блоков Замечание, Внимание и Пример (Callouts)"
            },
            {
                "id": "pagebreak-boxes",
                "title": "Перенос длинных рамок через разрывы страниц (breakable)"
            }
        ],
        "sections": [
            {
                "id": "intro",
                "title": "Возможности современного пакета tcolorbox",
                "html": "                        <p>Стандартное математическое окружение <code>amsthm</code> выводит теоремы обычным курсивом с тонкой вертикальной чертой или вовсе без нее (подробнее о базовой настройке читайте в статье об <a href=\"/blog/latex-amsthm\">оформлении теорем и определений в amsthm</a>). В современных учебных пособиях, конспектах и методичках для лучшей читаемости применяют стильные цветные плашки (callouts) с градиентами, скругленными углами и акцентными иконками.</p>\n                        <p>Пакет <strong>tcolorbox</strong> — это непревзойденный стандарт для создания презентабельных рамок любого уровня сложности на базе векторного движка TikZ.</p>"
            },
            {
                "id": "basic-box",
                "title": "Цветной блок с текстом latex: базовое окружение",
                "html": "                        <p>Подключите пакет: <code>\\usepackage{tcolorbox}</code>. Чтобы создать аккуратный <strong>цветной блок с текстом latex</strong>, используется простое окружение (оттенки рамки и фона можно тонко настроить через <a href=\"/blog/latex-custom-rgb-hex-colors-xcolor\">пользовательские цвета RGB и HEX в xcolor</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\begin{tcolorbox}[\n    colback=blue!5!white,    % Фоновый цвет (светло-голубой)\n    colframe=blue!75!black,  % Цвет рамки\n    title=Ключевой вывод,   % Заголовок плашки\n    arc=3mm                  % Радиус скругления углов\n]\n    Энтропия изолированной термодинамической системы не может убывать в самопроизвольных процессах.\n\\end{tcolorbox}</code></pre>\n                        </div>"
            },
            {
                "id": "theorems-setup",
                "title": "Красивые рамки для теорем latex tcolorbox: счетчики и заголовки",
                "html": "                        <p>Для создания полноценной математической типографики используют библиотеку <code>theorems</code>. Она формирует <strong>красивые рамки для теорем latex tcolorbox</strong> с автоматической нумерацией и связкой со списком теорем:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\usepackage[most]{tcolorbox}\n\n% Создаем окружение теоремы\n\\newtcbtheorem[number within=section]{mytheorem}{Теорема}%\n{colback=green!5,colframe=green!50!black,fonttitle=\\bfseries}{th}\n\n% Использование в тексте:\n\\begin{mytheorem}{Пифагора}{pythagoras}\n    В прямоугольном треугольнике квадрат длины гипотенузы равен сумме квадратов длин катетов:\n    \\[ c^2 = a^2 + b^2 \\]\n\\end{mytheorem}</code></pre>\n                        </div>\n                        <p>Команда <code>\\ref{th:pythagoras}</code> автоматически сошлется на номер этой теоремы в тексте (например, <em>«согласно Теореме 2.1»</em>).</p>"
            },
            {
                "id": "custom-callouts",
                "title": "Создание блоков Замечание, Внимание и Пример (Callouts)",
                "html": "                        <p>Для создания блоков в стиле документации GitHub / Notion настраивают минималистичные стили с акцентной левой полосой:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\newtcolorbox{warningbox}{\n    colback=red!5!white,\n    colframe=red!75!black,\n    leftrule=5mm, % Толстая цветная полоса слева\n    rightrule=0.5mm, toprule=0.5mm, bottomrule=0.5mm,\n    arc=1mm,\n    title=\\textbf{Внимание!}\n}</code></pre>\n                        </div>"
            },
            {
                "id": "pagebreak-boxes",
                "title": "Перенос длинных рамок через разрывы страниц (breakable)",
                "html": "                        <p>По умолчанию tcolorbox не разрывается страницей и целиком переносится на следующий лист, оставляя пустоту. Чтобы блок плавно перетекал через границу страниц, добавьте опцию <code>breakable</code> (требует библиотеки <code>\\tcbuselibrary{breakable}</code>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\begin{tcolorbox}[breakable, colback=gray!10, colframe=black]\n    ... очень длинный текст доказательства на 2 страницы ...\n\\end{tcolorbox}</code></pre>\n                        </div>"
            }
        ],
        "tips": [
            {
                "title": "Подключение [most]",
                "html": "<p>Всегда подключайте пакет как <code>\\usepackage[most]{tcolorbox}</code> — это активирует библиотеки theorems, breakable, skins и xparse в одном флаконе.</p>"
            },
            {
                "title": "Тени и объем",
                "html": "<p>Опция <code>drop shadow</code> или <code>fuzzy shadow</code> добавляет реалистичную мягкую тень под блоком для оформления презентаций.</p>"
            }
        ]
    },
    {
        "slug": "overleaf-alternatives-russia-online-latex",
        "batch": 2,
        "title": "Лучшие альтернативы Overleaf для работы с LaTeX в РФ",
        "pageTitle": "Overleaf альтернативы в России: онлайн редактор LaTeX без блокировок — Labkeeper",
        "metaDescription": "Лучшие Overleaf альтернативы в России: отечественный онлайн редактор LaTeX без блокировок Labkeeper, работа с ГОСТ, поддержка кириллицы и сравнение сервисов.",
        "breadcrumbTitle": "Альтернативы Overleaf в РФ",
        "h1": "Лучшие альтернативы Overleaf для работы с&nbsp;LaTeX в&nbsp;РФ",
        "categories": [
            "latex"
        ],
        "keywords": [
            "overleaf альтернативы в россии",
            "онлайн редактор latex без блокировок"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "7 мин",
        "cardTitle": "Альтернативы Overleaf в России: подборка онлайн-редакторов LaTeX",
        "cardDescription": "Обзор решений для верстки научных статей и дипломов в условиях ограничений: сравнение платформ, скорость компиляции, ГОСТ-шаблоны и возможности Labkeeper.",
        "sliderTitle": "Альтернативы Overleaf в России",
        "sliderText": "Онлайн-редакторы LaTeX без блокировок, поддержка ГОСТ и компиляция в РФ.",
        "sidebarText": "Набирайте статьи и диссертации в российском облачном редакторе Labkeeper с поддержкой всех ГОСТов.",
        "ctaTitle": "Переходите на надежный редактор в&nbsp;Labkeeper",
        "ctaText": "Отечественная облачная платформа для научной верстки: мгновенная компиляция PDF, шаблоны ВАК/ГОСТ и AI-ассистент.",
        "toc": [
            {
                "id": "context",
                "title": "Почему российские исследователи ищут замену Overleaf"
            },
            {
                "id": "overleaf-issues",
                "title": "Overleaf альтернативы в россии: доступность, платежи и пинг"
            },
            {
                "id": "labkeeper-features",
                "title": "Онлайн редактор latex без блокировок: возможности Labkeeper"
            },
            {
                "id": "desktop-alternatives",
                "title": "Локальные редакторы: VS Code, TeXstudio и сложности их настройки"
            },
            {
                "id": "comparison-table",
                "title": "Сравнительная таблица платформ для научной работы"
            }
        ],
        "sections": [
            {
                "id": "context",
                "title": "Почему российские исследователи ищут замену Overleaf",
                "html": "                        <p>Долгие годы британский сервис Overleaf оставался де-факто стандартом совместной верстки научных публикаций. Однако с 2022 года пользователи из РФ столкнулись с блокировками премиум-подписок, невозможностью оплаты российскими картами МИР, а также периодическими сбоями доступа к веб-интерфейсу.</p>\n                        <p>Кроме того, зарубежные сервисы не имеют предустановленных российских шрифтов по ГОСТ (PT Astra, ГОСТ-гарнитуры) и кириллических пакетов biblatex, что вынуждает авторов тратить часы на ручную загрузку шрифтовых файлов в каждый новый проект.</p>"
            },
            {
                "id": "overleaf-issues",
                "title": "Overleaf альтернативы в россии: доступность, платежи и пинг",
                "html": "                        <p>При поиске надежной <strong>overleaf альтернативы в россии</strong> исследователи и кафедры оценивают ключевые факторы (включая предустановленные кириллические гарнитуры и быструю <a href=\"/blog/latex-sans-serif-fonts\">настройку шрифтов без засечек в LaTeX</a>):</p>\n                        <ul>\n                            <li><strong>Юридическая безопасность и стабильность доступа:</strong> гарантия того, что диссертация или годовой отчет не окажутся заблокированы за день до защиты.</li>\n                            <li><strong>Скорость компиляции:</strong> расположение вычислительных мощностей и серверов в РФ обеспечивает отклик в миллисекунды без сетевых задержек.</li>\n                            <li><strong>Оплата в рублях:</strong> доступность институциональных и индивидуальных тарифов через СБП и корпоративные безналичные счета.</li>\n                        </ul>"
            },
            {
                "id": "labkeeper-features",
                "title": "Онлайн редактор latex без блокировок: возможности Labkeeper",
                "html": "                        <p><strong>Labkeeper</strong> создавался как современный <strong>онлайн редактор latex без блокировок</strong>, специально адаптированный под потребности студентов, аспирантов и ученых РФ (включая инструменты для быстрой <a href=\"/blog/latex-word-to-latex\">конвертации документов Word в LaTeX</a>):</p>\n                        <ul>\n                            <li><strong>Встроенная база ГОСТ:</strong> готовые, проверенные нормоконтролем шаблоны ВКР, магистерских диссертаций, авторефератов ВАК и отчетов по ГОСТ 7.32 из коробки.</li>\n                            <li><strong>Гибридный режим Markdown + LaTeX:</strong> возможность вести заметки в быстром Markdown и компилировать их в полиграфический PDF со сложными TeX-формулами.</li>\n                            <li><strong>Мгновенный отклик:</strong> оптимизированный компилятор TeX Live с предустановленной поддержкой кириллицы (шрифты T2A, пакеты babel, eskdx, biblatex-gost).</li>\n                            <li><strong>AI-помощник:</strong> встроенный интеллектуальный ассистент помогает исправлять ошибки синтаксиса и переводить статьи на академический английский язык.</li>\n                        </ul>"
            },
            {
                "id": "desktop-alternatives",
                "title": "Локальные редакторы: VS Code, TeXstudio и сложности их настройки",
                "html": "                        <p>Автономный путь — установка дистрибутива TeX Live / MiKTeX на домашний компьютер в связке с TeXstudio или VS Code (плагин LaTeX Workshop). Главные минусы такого подхода: объем дистрибутива свыше 8 Гб, сложные конфликты версий Perl/Python для minted и отсутствие синхронизации между домашним ПК и рабочим ноутбуком.</p>"
            },
            {
                "id": "comparison-table",
                "title": "Сравнительная таблица платформ для научной работы",
                "html": "                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Сравнение платформ</span></div>\n                            <pre><code>Критерий            | Overleaf (Free)   | Локальный TeXstudio | Labkeeper\n--------------------|-------------------|---------------------|------------------\nДоступность в РФ    | Риски сбоев       | 100% офлайн         | 100% онлайн (РФ)\nШаблоны ГОСТ / ВАК  | Требуют доработки | Настраивать вручную | Встроены из коробки\nПоддержка Markdown  | Нет               | Нет                 | Нативная (KaTeX)\nСложность старта    | Низкая            | Высокая             | В 1 клик в браузере\nОплата картами РФ   | Недоступна        | Бесплатно           | Доступна (МИР, СБП)</code></pre>\n                        </div>"
            }
        ],
        "tips": [
            {
                "title": "Экспорт проектов из Overleaf",
                "html": "<p>Вы можете скачать ZIP-архив своего проекта из Overleaf и напрямую открыть его в Labkeeper — все пути к файлам и структура проекта полностью совместимы.</p>"
            },
            {
                "title": "Облачное автосохранение",
                "html": "<p>История правок в Labkeeper сохраняется на лету, защищая от потери текста при случайном закрытии вкладки или отключении электричества.</p>"
            }
        ]
    },
    {
        "slug": "markdown-multiline-formulas-matrices-mathjax",
        "batch": 2,
        "title": "Вставка формул с матрицами и дробями в Markdown (MathJax)",
        "pageTitle": "Многострочные формулы в Markdown MathJax: написать матрицу онлайн — Labkeeper",
        "metaDescription": "Многострочные формулы в Markdown через MathJax: как написать матрицу в Markdown, выравнивание по знаку равно align, фигурные скобки cases в Labkeeper.",
        "breadcrumbTitle": "Многострочные формулы и матрицы (MathJax)",
        "h1": "Вставка формул с&nbsp;матрицами и&nbsp;дробями в&nbsp;Markdown (MathJax)",
        "categories": [
            "markdown"
        ],
        "keywords": [
            "многострочные формулы в markdown mathjax",
            "написать матрицу в markdown"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "7 мин",
        "cardTitle": "Матрицы и многострочные формулы в Markdown: гайд по MathJax",
        "cardDescription": "Как оформлять сложные математические расчеты в Markdown: матрицы pmatrix и bmatrix, многоэтажные дроби, системы уравнений cases и выравнивание aligned.",
        "sliderTitle": "Матрицы и длинные формулы в Markdown",
        "sliderText": "Окружения pmatrix, bmatrix, выравнивание aligned и системы cases.",
        "sidebarText": "Набирайте высшую математику и матрицы в чистом Markdown в веб-редакторе Labkeeper.",
        "ctaTitle": "Ведите математические заметки в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор с мгновенным рендерингом многострочных формул MathJax/KaTeX и экспортом в аккуратный PDF.",
        "toc": [
            {
                "id": "intro",
                "title": "Возможности MathJax для расширенной математики"
            },
            {
                "id": "multiline-align",
                "title": "Многострочные формулы в markdown mathjax: окружение aligned"
            },
            {
                "id": "matrices-guide",
                "title": "Написать матрицу в markdown: pmatrix, bmatrix и определители"
            },
            {
                "id": "nested-fractions",
                "title": "Многоэтажные дроби и непрерывные вычисления"
            },
            {
                "id": "systems-cases",
                "title": "Кусочные функции и системы уравнений с фигурной скобкой (cases)"
            }
        ],
        "sections": [
            {
                "id": "intro",
                "title": "Возможности MathJax для расширенной математики",
                "html": "                        <p>Одиночные формулы вроде $y = kx + b$ легко помещаются в строку (подробнее см. руководство по <a href=\"/blog/markdown-mathjax-katex-latex-math\">формулам в Markdown с MathJax и KaTeX</a>). Однако в линейной алгебре, теории вероятностей и математическом анализе постоянно требуются матрицы произвольной размерности, длинные цепочки преобразований и разветвленные системы уравнений.</p>\n                        <p>Библиотеки MathJax и KaTeX полностью поддерживают продвинутые окружения пакета <code>amsmath</code> прямо внутри стандартных выключных блоков Markdown <code>$$ ... $$</code>.</p>"
            },
            {
                "id": "multiline-align",
                "title": "Многострочные формулы в markdown mathjax: окружение aligned",
                "html": "                        <p>Когда выкладка не помещается в одну строку, используют <strong>многострочные формулы в markdown mathjax</strong> с выравниванием по знаку равенства через окружение <code>aligned</code> (что особенно полезно при соблюдении правил <a href=\"/blog/formula-numbering-lab-reports-gost\">нумерации формул в отчетах по ГОСТ</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code>$$\n\\begin{aligned}\n(x + y)^3 &= (x + y)(x + y)^2 \\\\\n          &= (x + y)(x^2 + 2xy + y^2) \\\\\n          &= x^3 + 2x^2y + xy^2 + x^2y + 2xy^2 + y^3 \\\\\n          &= x^3 + 3x^2y + 3xy^2 + y^3\n\\end{aligned}\n$$</code></pre>\n                        </div>\n                        <p>Символ амперсанда <code>&</code> задает точку вертикального выравнивания (обычно перед знаком равенства), а двойной обратный слэш <code>\\\\</code> разрывает строку.</p>"
            },
            {
                "id": "matrices-guide",
                "title": "Написать матрицу в markdown: pmatrix, bmatrix и определители",
                "html": "                        <p>Быстро <strong>написать матрицу в markdown</strong> позволяют специализированные матричные окружения:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code>$$\n\\begin{pmatrix}\n1 & 0 & 0 \\\\\n0 & 1 & 0 \\\\\n0 & 0 & 1\n\\end{pmatrix}\n\\quad\n\\begin{bmatrix}\na_{11} & a_{12} \\\\\na_{21} & a_{22}\n\\end{bmatrix}\n\\quad\n\\begin{vmatrix}\n\\lambda - 1 & 2 \\\\\n3 & \\lambda - 4\n\\end{vmatrix}\n$$</code></pre>\n                        </div>\n                        <ul>\n                            <li><code>pmatrix</code> — матрица в круглых скобках;</li>\n                            <li><code>bmatrix</code> — матрица в квадратных скобках (наиболее частый выбор в РФ);</li>\n                            <li><code>vmatrix</code> — определитель (детерминант) с прямыми вертикальными линиями;</li>\n                            <li><code>Vmatrix</code> — норма матрицы (двойные вертикальные линии).</li>\n                        </ul>"
            },
            {
                "id": "nested-fractions",
                "title": "Многоэтажные дроби и непрерывные вычисления",
                "html": "                        <p>Для верстки цепных дробей обычная команда <code>\\frac</code> делает вложенные шрифты слишком мелкими. Используйте команду <code>\\cfrac</code> (continued fraction):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code>$$\nx = a_0 + \\cfrac{1}{a_1 + \\cfrac{1}{a_2 + \\cfrac{1}{a_3}}}\n$$</code></pre>\n                        </div>"
            },
            {
                "id": "systems-cases",
                "title": "Кусочные функции и системы уравнений с фигурной скобкой (cases)",
                "html": "                        <p>Окружение <code>cases</code> автоматически создает большую фигурную скобку слева:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code>$$\nf(x) = \\begin{cases}\n    -x^2, & \\text{если } x < 0, \\\\\n    0,    & \\text{если } x = 0, \\\\\n    2x,   & \\text{если } x > 0.\n\\end{cases}\n$$</code></pre>\n                        </div>"
            }
        ],
        "tips": [
            {
                "title": "Многоточия в матрицах",
                "html": "<p>Для пропуска строк и столбцов в матрицах используйте: <code>\\cdots</code> (горизонтальное), <code>\\vdots</code> (вертикальное) и <code>\\ddots</code> (диагональное многоточие).</p>"
            },
            {
                "title": "Кириллические комментарии в cases",
                "html": "<p>Русский текст условий внутри формулы всегда оборачивайте в <code>\\text{...}</code>, иначе буквы слипнутся или вызовут ошибку рендера.</p>"
            }
        ]
    },
    {
        "slug": "markdown-image-size-width-height",
        "batch": 2,
        "title": "Настройка размера изображений в Markdown (ширина и высота)",
        "pageTitle": "Изменить размер картинки в Markdown width: подгонка изображения — Labkeeper",
        "metaDescription": "Как изменить размер картинки в Markdown: width, height, центрирование, подгонка изображения через HTML теги и стили в онлайн-редакторе Labkeeper.",
        "breadcrumbTitle": "Размер изображений в Markdown",
        "h1": "Настройка размера изображений в&nbsp;Markdown (ширина и&nbsp;высота)",
        "categories": [
            "markdown"
        ],
        "keywords": [
            "изменить размер картинки markdown width",
            "подгонка изображения md html"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "6 мин",
        "cardTitle": "Управление размерами картинок в Markdown: ширина, высота и центрирование",
        "cardDescription": "Как уменьшить гигантский скриншот в Markdown: атрибуты width/height, чистый HTML-тег img, центрирование по центру страницы и экспорт в PDF.",
        "sliderTitle": "Размер изображений в Markdown",
        "sliderText": "Настройка width и height, стили CSS, тег img и центрирование картинок.",
        "sidebarText": "Контролируйте масштаб иллюстраций и аккуратность заметок в редакторе Labkeeper.",
        "ctaTitle": "Оформляйте иллюстрированные заметки в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор Markdown с поддержкой ресайза изображений, вставкой скриншотов из буфера обмена и экспортом в PDF.",
        "toc": [
            {
                "id": "problem",
                "title": "Почему базовый синтаксис ![alt](url) не поддерживает размер"
            },
            {
                "id": "html-tag",
                "title": "Изменить размер картинки markdown width: использование тега img"
            },
            {
                "id": "percentage-fitting",
                "title": "Подгонка изображения md html: адаптивные проценты (width=\"50%\")"
            },
            {
                "id": "centering-images",
                "title": "Центрирование иллюстраций и подрисуночные подписи"
            },
            {
                "id": "extended-syntax",
                "title": "Расширенный синтаксис в Obsidian, Kramdown и Labkeeper"
            }
        ],
        "sections": [
            {
                "id": "problem",
                "title": "Почему базовый синтаксис ![alt](url) не поддерживает размер",
                "html": "                        <p>Классический синтаксис Джона Грубера <code>![Описание](image.png)</code> намеренно минималистичен: в нем вообще нет параметров ширины или высоты. В результате при вставке скриншота высокого разрешения (Retina или 4K) картинка распахивается на всю ширину экрана или вовсе вылезает за границы печатной страницы PDF.</p>\n                        <p>К счастью, спецификация CommonMark разрешает бесшовную интеграцию HTML-тегов прямо в тело Markdown-документа.</p>"
            },
            {
                "id": "html-tag",
                "title": "Изменить размер картинки markdown width: использование тега img",
                "html": "                        <p>Самый надежный и кроссплатформенный способ, <strong>как изменить размер картинки markdown width</strong> — заменить стандартную скобочную запись на тег <code>&lt;img&gt;</code>:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code><!-- Фиксированная ширина в пикселях -->\n<img src=\"screenshot.png\" alt=\"Панель настроек\" width=\"450\" />\n\n<!-- С ограничением по высоте -->\n<img src=\"logo.svg\" alt=\"Логотип проекта\" height=\"80\" /></code></pre>\n                        </div>\n                        <p>Браузер и PDF-генераторы автоматически сохраняют пропорции изображения: если вы указали только <code>width=\"450\"</code>, высота пересчитается пропорционально без сплющивания.</p>"
            },
            {
                "id": "percentage-fitting",
                "title": "Подгонка изображения md html: адаптивные проценты (width=\"50%\")",
                "html": "                        <p>Для адаптивных документов и мобильного чтения идеальна <strong>подгонка изображения md html</strong> через относительные единицы измерения:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code><!-- Занимает ровно половину ширины полосы чтения -->\n<img src=\"chart.png\" alt=\"График\" style=\"width: 50%; max-width: 600px;\" /></code></pre>\n                        </div>\n                        <p>При таком подходе на смартфонах картинка красиво масштабируется, а на десктопе не растягивается до гигантских размытых размеров.</p>"
            },
            {
                "id": "centering-images",
                "title": "Центрирование иллюстраций и подрисуночные подписи",
                "html": "                        <p>Чтобы выровнять уменьшенное изображение строго по центру страницы и добавить красивую подпись курсивом (по аналогии со стандартами <a href=\"/blog/software-screenshots-report-gost-caption\">оформления скриншотов программ в отчете ГОСТ</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Markdown</span></div>\n                            <pre><code><p align=\"center\">\n  <img src=\"architecture.png\" width=\"60%\" alt=\"Архитектура сервиса\" /><br>\n  <em>Рисунок 1 — Структурная схема микросервисов</em>\n</p></code></pre>\n                        </div>"
            },
            {
                "id": "extended-syntax",
                "title": "Расширенный синтаксис в Obsidian, Kramdown и Labkeeper",
                "html": "                        <p>В продвинутых редакторах поддерживается удобный компактный синтаксис пайпа: <code>![Скриншот|400](image.png)</code> или фигурных скобок атрибутов: <code>![Скриншот](image.png){width=400px}</code>, что делает документ идеально готовым к <a href=\"/blog/markdown-to-pdf-export\">экспорту Markdown в PDF</a>.</p>"
            }
        ],
        "tips": [
            {
                "title": "Векторный формат SVG",
                "html": "<p>Для схем, графиков и логотипов используйте формат <code>.svg</code>: при любом значении <code>width</code> он сохраняет идеальную векторную четкость без пикселей.</p>"
            },
            {
                "title": "Пустые строки вокруг HTML",
                "html": "<p>Всегда отделяйте теги <code>&lt;p align=\"center\"&gt;</code> и <code>&lt;img&gt;</code> пустыми строками от предшествующего и последующего Markdown-текста.</p>"
            }
        ]
    },
    {
        "slug": "software-screenshots-report-gost-caption",
        "batch": 2,
        "title": "Как правильно оформлять скриншоты программ в отчете ГОСТ",
        "pageTitle": "Нумерация скриншотов в отчете ГОСТ: подпись под рисунком — Labkeeper",
        "metaDescription": "Как оформлять скриншоты в отчете по ГОСТ 7.32: правильная нумерация скриншотов в отчете, подпись под рисунком, рамки, обрезка лишнего в Labkeeper.",
        "breadcrumbTitle": "Скриншоты в отчетах по ГОСТ",
        "h1": "Как правильно оформлять скриншоты программ в&nbsp;отчете ГОСТ",
        "categories": [
            "labs"
        ],
        "keywords": [
            "нумерация скриншотов в отчете гост",
            "подпись под рисунком со скриншотом"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "7 мин",
        "cardTitle": "Скриншоты программ в студенческих отчетах и дипломах по ГОСТ 7.32",
        "cardDescription": "Требования нормоконтроля к иллюстрациям интерфейсов: статус рисунка, читаемость шрифтов, кадрирование панели задач и правильные подрисуночные подписи.",
        "sliderTitle": "Оформление скриншотов по ГОСТ",
        "sliderText": "Нумерация скриншотов, подписи под рисунками, кадрирование окон по ГОСТ 7.32.",
        "sidebarText": "Верстайте отчеты по IT-лабораторным с аккуратными иллюстрациями в онлайн-редакторе Labkeeper.",
        "ctaTitle": "Сдавайте отчеты по программированию в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор с шаблонами отчетов по ГОСТ, автоматической нумерацией рисунков и быстрым рендерингом PDF.",
        "toc": [
            {
                "id": "gost-status",
                "title": "Статус скриншота в ГОСТ 7.32-2017: это всегда «Рисунок»"
            },
            {
                "id": "numbering-rules",
                "title": "Нумерация скриншотов в отчете гост: сквозная и по разделам"
            },
            {
                "id": "caption-format",
                "title": "Подпись под рисунком со скриншотом: точка, тире и кавычки"
            },
            {
                "id": "screenshot-hygiene",
                "title": "Культура скриншотов: что категорически запрещено показывать"
            },
            {
                "id": "latex-figure-snippet",
                "title": "Шаблон вставки скриншота в LaTeX с рамкой"
            }
        ],
        "sections": [
            {
                "id": "gost-status",
                "title": "Статус скриншота в ГОСТ 7.32-2017: это всегда «Рисунок»",
                "html": "                        <p>В академических и инженерных стандартах РФ не существует терминов «скриншот», «снимок экрана» или «иллюстрация интерфейса». Любое графическое изображение — будь то фото осциллографа, окно веб-браузера или консоль Linux — именуется строго словом <strong>«Рисунок»</strong>.</p>\n                        <p>Нельзя писать <em>«Скриншот 1»</em> или <em>«Снимок экрана программы»</em>. Использование слова «Скриншот» в заголовке — грубейшая ошибка, приводящая к возврату диплома нормоконтролем.</p>"
            },
            {
                "id": "numbering-rules",
                "title": "Нумерация скриншотов в отчете гост: сквозная и по разделам",
                "html": "                        <p>Каноническая <strong>нумерация скриншотов в отчете гост</strong> подчиняется общим правилам <a href=\"/blog/figure-double-numbering-chapters-gost\">двойной нумерации рисунков по главам по ГОСТ</a>:</p>\n                        <ul>\n                            <li><strong>В лабораторных отчетах:</strong> сквозная арабскими цифрами — <em>Рисунок 1</em>, <em>Рисунок 2</em>, <em>Рисунок 3</em>.</li>\n                            <li><strong>В дипломных записках и ВКР:</strong> по разделам — <em>Рисунок 2.1</em> (первый рисунок второй главы), <em>Рисунок 2.2</em>, <em>Рисунок 3.1</em>.</li>\n                            <li>На каждый скриншот в предшествующем тексте обязана присутствовать ссылка: <em>«Внешний вид окна аутентификации приведен на рисунке 2.3»</em>.</li>\n                        </ul>"
            },
            {
                "id": "caption-format",
                "title": "Подпись под рисунком со скриншотом: точка, тире и кавычки",
                "html": "                        <p>Правильная <strong>подпись под рисунком со скриншотом</strong> центрируется под изображением и оформляется строго по ГОСТ:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Эталон подписи</span></div>\n                            <pre><code>Рисунок 2.4 — Главное окно программного модуля расчета траектории</code></pre>\n                        </div>\n                        <p>Обратите внимание на детали:</p>\n                        <ul>\n                            <li>Слово «Рисунок» пишется полностью (не «Рис.»);</li>\n                            <li>После номера ставится длинное тире с пробелами <code> — </code>;</li>\n                            <li>Название пишется с заглавной буквы;</li>\n                            <li><strong>В конце подписи точка НЕ ставится</strong>.</li>\n                        </ul>"
            },
            {
                "id": "screenshot-hygiene",
                "title": "Культура скриншотов: что категорически запрещено показывать",
                "html": "                        <p>Правила профессиональной подготовки изображений для отчетов (для программного кода не используйте скриншоты — применяйте <a href=\"/blog/programming-lab-report-code-listings-gost\">оформление листингов кода в лабораторных по ГОСТ</a>):</p>\n                        <ul>\n                            <li><strong>Обрезайте панель задач Windows/macOS:</strong> часы, значки Telegram, торренты и вкладки браузера на скриншоте выглядят крайне неряшливо. Захватывайте только рабочее окно программы (сочетание Alt + PrintScreen).</li>\n                            <li><strong>Используйте светлую тему оформления:</strong> скриншоты в черной теме IDE расходуют картридж принтера и превращаются на бумаге в нечитаемое черное пятно.</li>\n                            <li><strong>Масштаб шрифта:</strong> если текст в консоли или таблице не читается при масштабе 100% на листе А4, увеличьте шрифт в программе перед созданием снимка.</li>\n                        </ul>"
            },
            {
                "id": "latex-figure-snippet",
                "title": "Шаблон вставки скриншота в LaTeX с рамкой",
                "html": "                        <p>Если фон скриншота белый, он может визуально сливаться с белым листом бумаги. Оберните его в тонкую рамку через команду <code>\\fbox</code>:</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\begin{figure}[htbp]\n    \\centering\n    \\setlength{\\fboxsep}{1pt}\n    \\setlength{\\fboxrule}{0.5pt}\n    \\fbox{\\includegraphics[width=0.85\\textwidth]{gui-window.png}}\n    \\caption{Интерфейс модуля визуализации телеметрии}\n    \\label{fig:gui-telemetry}\n\\end{figure}</code></pre>\n                        </div>"
            }
        ],
        "tips": [
            {
                "title": "Формат без сжатия PNG",
                "html": "<p>Всегда сохраняйте скриншоты в формате PNG. Формат JPEG сжимает текст с артефактами и «мылом» вокруг букв.</p>"
            },
            {
                "title": "Стрелки и акценты",
                "html": "<p>Если нужно обратить внимание преподавателя на кнопку, используйте красную стрелку или аккуратную рамку толщиной 2–3 пикселя.</p>"
            }
        ]
    },
    {
        "slug": "formula-variable-explanation-where-gost",
        "batch": 2,
        "title": "Вывод формул с описанием переменных («где x — это...») по ГОСТ",
        "pageTitle": "Как писать пояснения к формуле ГОСТ: оформление расшифровки формул — Labkeeper",
        "metaDescription": "Как писать пояснения к формуле по ГОСТ 7.32: оформление расшифровки формул в отчете, слово где без двоеточия, тире и единицы измерения в Labkeeper.",
        "breadcrumbTitle": "Пояснения к формулам по ГОСТ («где x — это»)",
        "h1": "Вывод формул с&nbsp;описанием переменных («где x&nbsp;— это...») по&nbsp;ГОСТ",
        "categories": [
            "labs",
            "diploma"
        ],
        "keywords": [
            "как писать пояснения к формуле гост",
            "оформление расшифровки формул в отчете"
        ],
        "datePublished": "2026-09-05",
        "dateModified": "2026-09-05",
        "readingTime": "6 мин",
        "cardTitle": "Пояснение переменных в формулах по ГОСТ 7.32: правила и шаблон LaTeX",
        "cardDescription": "Как оформлять блок «где»: почему после слова «где» нельзя ставить двоеточие, порядок перечисления переменных, знаки препинания и единицы измерений.",
        "sliderTitle": "Пояснения к формулам по ГОСТ («где...»)",
        "sliderText": "Слово «где» без двоеточия, тире, единицы измерений и порядок переменных.",
        "sidebarText": "Оформляйте математические выкладки по строгому академическому стандарту в Labkeeper.",
        "ctaTitle": "Вёрстка строгих отчетов в&nbsp;Labkeeper",
        "ctaText": "Онлайн-редактор с шаблонами пояснений к формулам по ГОСТ и проверкой математической типографики.",
        "toc": [
            {
                "id": "rules",
                "title": "Что требует ГОСТ 7.32-2017 к блоку пояснений"
            },
            {
                "id": "how-to-write",
                "title": "Как писать пояснения к формуле гост: классический синтаксис"
            },
            {
                "id": "formatting-details",
                "title": "Оформление расшифровки формул в отчете: знаки препинания и точки с запятой"
            },
            {
                "id": "latex-snippets",
                "title": "Готовые шаблоны в LaTeX (список description и таблица tabular)"
            },
            {
                "id": "frequent-errors",
                "title": "Топ-5 ошибок, на которых срезают на нормоконтроле"
            }
        ],
        "sections": [
            {
                "id": "rules",
                "title": "Что требует ГОСТ 7.32-2017 к блоку пояснений",
                "html": "                        <p>В научно-технических отчетах и дипломных работах каждая введенная формула должна сопровождаться расшифровкой входящих в нее буквенных обозначений, если они не были пояснены ранее в тексте.</p>\n                        <blockquote>\n                            «Пояснение значений символов и числовых коэффициентов следует приводить непосредственно под формулой в той же последовательности, в которой они даны в формуле. Первая строка пояснения должна начинаться со слова «где» <strong>без двоеточия</strong> после него».\n                        </blockquote>"
            },
            {
                "id": "how-to-write",
                "title": "Как писать пояснения к формуле гост: классический синтаксис",
                "html": "                        <p>Запомните главное правило того, <strong>как писать пояснения к формуле гост</strong> (наряду с требованиями к <a href=\"/blog/formula-numbering-lab-reports-gost\">нумерации формул в лабораторных отчетах</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">Эталонный образец</span></div>\n                            <pre><code>Расчет давления газа производится по формуле:\nP = (n * R * T) / V,                                                     (2.1)\nгде P — абсолютное давление газа, Па;\n    n — количество вещества, моль;\n    R — универсальная газовая постоянная, равная 8.314 Дж/(моль·К);\n    T — термодинамическая температура, К;\n    V — объем сосуда, м³.</code></pre>\n                        </div>\n                        <p>Слово «где» пишется строчными буквами с красной строки, после него двоеточие <strong>не ставится</strong>, а сами переменные идут строго в том порядке, в каком они появляются в числителе и знаменателе формулы слева направо.</p>"
            },
            {
                "id": "formatting-details",
                "title": "Оформление расшифровки формул в отчете: знаки препинания и точки с запятой",
                "html": "                        <p>Правильное <strong>оформление расшифровки формул в отчете</strong> включает следующие микродетали:</p>\n                        <ul>\n                            <li>Между символом переменной и его словесным описанием ставится длинное тире <code> — </code>;</li>\n                            <li>В конце каждого пояснения ставится запятая перед единицей измерения, а в конце строки — точка с запятой <code>;</code>;</li>\n                            <li>В самом последнем пункте перечисления ставится точка <code>.</code>;</li>\n                            <li>Если переменная уже расшифровывалась выше по тексту, повторно вносить ее в блок «где» не требуется.</li>\n                        </ul>"
            },
            {
                "id": "latex-snippets",
                "title": "Готовые шаблоны в LaTeX (список description и таблица tabular)",
                "html": "                        <p>В LaTeX для аккуратного выравнивания тире в столбик используют компактную таблицу <code>tabular</code> без рамок (а для набора размерностей рекомендуем использовать <a href=\"/blog/latex-siunitx\">пакет siunitx для физических величин</a>):</p>\n                        <div class=\"article-code\">\n                            <div class=\"article-code__header\"><span class=\"article-code__lang\">LaTeX</span></div>\n                            <pre><code>\\begin{equation}\n    F = G \\frac{m_1 m_2}{r^2},\n    \\label{eq:gravity}\n\\end{equation}\n\\noindent где~\\begin{tabular}[t]{@{}l@{ — }p{0.8\\textwidth}@{}}\n$F$   & сила гравитационного взаимодействия, Н;\\\\\n$G$   & гравитационная постоянная, $G \\approx 6{,}674 \\cdot 10^{-11}$~м$^3$/(кг$\\cdot$с$^2$);\\\\\n$m_1, m_2$ & массы взаимодействующих тел, кг;\\\\\n$r$   & расстояние между центрами масс тел, м.\n\\end{tabular}</code></pre>\n                        </div>\n                        <p>Конструкция <code>@{}l@{ — }p{...}</code> автоматически ставит длинное тире между колонками и обеспечивает аккуратный перенос длинного текста расшифровки.</p>"
            },
            {
                "id": "frequent-errors",
                "title": "Топ-5 ошибок, на которых срезают на нормоконтроле",
                "html": "                        <p>Самые частые замечания проверяющих:</p>\n                        <ol>\n                            <li>Двоеточие после слова «где» (<em>«где:»</em> — грубая ошибка!);</li>\n                            <li>Слово «Где» с заглавной буквы (должно быть со строчной: «где»);</li>\n                            <li>Отсутствие запятой перед формулой (сама формула является частью предложения!);</li>\n                            <li>Перечисление переменных в случайном алфавитном порядке вместо порядка появления в уравнении;</li>\n                            <li>Пропуск размерностей (единиц измерения СИ).</li>\n                        </ol>"
            }
        ],
        "tips": [
            {
                "title": "Неразрывный пробел перед тильдой",
                "html": "<p>Всегда пишите <code>где~\\begin{tabular}...</code>, чтобы слово «где» не оторвалось от таблицы на другую страницу.</p>"
            },
            {
                "title": "Единицы измерения по ГОСТ 8.417",
                "html": "<p>Для набора размерностей используйте прямое начертание шрифта: <code>м/с</code> или <code>\\text{кг}</code>, а не математический курсив <em>kg</em>.</p>"
            }
        ]
    }
];
