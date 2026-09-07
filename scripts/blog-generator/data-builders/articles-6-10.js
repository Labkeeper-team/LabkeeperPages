module.exports = [
    {
        slug: 'latex-sans-serif-fonts',
        batch: 2,
        title: 'Использование шрифтов без засечек (Sans Serif) во всем документе LaTeX',
        pageTitle: 'Как поменять шрифт на весь документ LaTeX: шрифт без засечек онлайн — Labkeeper',
        metaDescription: 'Как поменять шрифт на весь документ в LaTeX: включение шрифта без засечек (Sans Serif) онлайн, пакеты helvet, cmbright, соответствие ГОСТ в Labkeeper.',
        breadcrumbTitle: 'Шрифты без засечек (Sans Serif)',
        h1: 'Использование шрифтов без засечек (Sans Serif) во&nbsp;всем документе LaTeX',
        categories: ['latex'],
        keywords: [
            'как поменять шрифт на весь документ latex',
            'шрифт без засечек latex онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '6 мин',
        cardTitle: 'Шрифты без засечек в LaTeX: как сменить семейство шрифта для всего документа',
        cardDescription: 'Пошаговый гайд по переключению стандартного Computer Modern на гротески (Helvetica, Arial, DejaVu Sans), настройке масштабирования и математических символов.',
        sliderTitle: 'Шрифты без засечек (Sans Serif) в LaTeX',
        sliderText: 'Глобальная смена шрифта на гротеск, пакеты helvet, cmbright и математика.',
        sidebarText: 'Переключайте шрифты документов в один клик в онлайн-редакторе Labkeeper с моментальной компиляцией в PDF.',
        ctaTitle: 'Настраивайте типографику в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с поддержкой кириллических гротесков, математических шрифтов и чистого экспорта в PDF.',
        toc: [
            { id: 'intro', title: 'Зачем переключаться на шрифт без засечек' },
            { id: 'global-switch', title: 'Как поменять шрифт на весь документ latex: команда renewcommand' },
            { id: 'sans-packages', title: 'Шрифт без засечек latex онлайн: пакеты Helvetica, DejaVu и PT Sans' },
            { id: 'math-fonts', title: 'Шрифты без засечек в математических формулах' },
            { id: 'faq', title: 'Совместимость с кириллицей и ГОСТ' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Зачем переключаться на шрифт без засечек',
                html: `                        <p>По умолчанию LaTeX использует классическую антикву Computer Modern Roman с выраженными засечками (Serif). Однако в современных презентациях Beamer, корпоративных регламентах, IT-руководствах и при чтении с экранов мобильных устройств гротески (Sans Serif) читаются значительно легче (а верстать такие документы удобно в современных <a href="/blog/overleaf-alternatives-russia-online-latex">альтернативах Overleaf в России</a>).</p>
                        <p>Переход на шрифт без засечек часто требуется и по внутренним стандартам компаний, где в брендбуках закреплены шрифты типа Arial, Roboto или Helvetica.</p>`
            },
            {
                id: 'global-switch',
                title: 'Как поменять шрифт на весь документ latex: команда renewcommand',
                html: `                        <p>Самый быстрый способ, <strong>как поменять шрифт на весь документ latex</strong> без подключения сторонних тяжелых библиотек — переопределить семейство шрифта по умолчанию (<code>\\familydefault</code>) в преамбуле:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\documentclass[12pt,a4paper]{article}
\\usepackage[T2A]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[russian]{babel}

% Переключаем семейство по умолчанию на Sans Serif (sfdefault)
\\renewcommand{\\familydefault}{\\sfdefault}</code></pre>
                        </div>
                        <p>После этой строчки весь обычный текст, заголовки, оглавление и подрисуночные подписи автоматически отобразятся без засечек.</p>`
            },
            {
                id: 'sans-packages',
                title: 'Шрифт без засечек latex онлайн: пакеты Helvetica, DejaVu и PT Sans',
                html: `                        <p>Стандартный <code>\\sfdefault</code> в TeX выглядит как Computer Modern Sans. Если вам нужен более современный <strong>шрифт без засечек latex онлайн</strong>, используйте проверенные кириллические пакеты:</p>
                        <ul>
                            <li><strong>Helvetica (аналог Arial):</strong>
                                <pre><code>\\usepackage[scaled=0.92]{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}</code></pre>
                                Опция <code>scaled=0.92</code> выравнивает оптический размер с большинством стандартных гарнитур.
                            </li>
                            <li><strong>PT Sans (современный российский ГОСТ-шрифт):</strong>
                                <pre><code>\\usepackage{paratype}
\\renewcommand{\\familydefault}{\\sfdefault}</code></pre>
                            </li>
                            <li><strong>DejaVu Sans (отличная поддержка символов и формул):</strong>
                                <pre><code>\\usepackage{dejavu-sans}
\\renewcommand{\\familydefault}{\\sfdefault}</code></pre>
                            </li>
                        </ul>`
            },
            {
                id: 'math-fonts',
                title: 'Шрифты без засечек в математических формулах',
                html: `                        <p>Стандартная команда <code>\\renewcommand{\\familydefault}{\\sfdefault}</code> затрагивает только текстовый режим. Формулы внутри <code>$...$</code> останутся с засечками. Чтобы формулы гармонировали с общим стилем, подключите пакет <strong>sansmath</strong> или <strong>cmbright</strong>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{sansmath}
\\sansmath % Включает математику без засечек для всех формул</code></pre>
                        </div>
                        <p>В результате даже интегралы, греческие буквы $\\alpha, \\beta$ и переменные будут отображаться в стильном едином гротескном начертании.</p>`
            },
            {
                id: 'faq',
                title: 'Совместимость с кириллицей и ГОСТ',
                html: `                        <p>При использовании гротесков в академических отчетах:</p>
                        <ul>
                            <li>Убедитесь, что в преамбуле подключен <code>\\usepackage[T2A]{fontenc}</code>, чтобы русские буквы корректно выгружались в векторный PDF с возможностью поиска и копирования.</li>
                            <li>Для дипломных работ по ГОСТ 7.32 традиционно требуют Times New Roman (с засечками), о чем мы подробно рассказываем в руководстве по <a href="/blog/latex-diploma-gost">оформлению диплома в LaTeX по ГОСТ</a>, но для приложений, плакатов и презентаций к защите ВКР шрифты без засечек являются абсолютным стандартом.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Локальное использование гротеска',
                html: '<p>Если вам нужен шрифт без засечек только для одного фрагмента или врезки, используйте команду <code>\\textsf{Текст без засечек}</code> или окружение <code>{\\sffamily ...}</code>.</p>'
            },
            {
                title: 'Подбор межстрочного интервала',
                html: '<p>Шрифты без засечек визуально кажутся крупнее обычных. Рекомендуется слегка увеличить базовый интервал через <code>\\usepackage{setspace}\\setstretch{1.15}</code> для улучшения читаемости.</p>'
            }
        ]
    },
    {
        slug: 'latex-longtable-multipage',
        batch: 2,
        title: 'Оформление многостраничных таблиц в LaTeX (пакет longtable)',
        pageTitle: 'Таблица на несколько страниц LaTeX longtable: перенос на следующий лист — Labkeeper',
        metaDescription: 'Как сделать многостраничную таблицу в LaTeX через longtable: перенос таблицы на следующий лист онлайн, повтор шапки, ГОСТ-подписи и примеры.',
        breadcrumbTitle: 'Многостраничные таблицы (longtable)',
        h1: 'Оформление многостраничных таблиц в&nbsp;LaTeX (пакет longtable)',
        categories: ['latex'],
        keywords: [
            'таблица на несколько страниц latex longtable',
            'перенос таблицы на следующий лист latex'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '8 мин',
        cardTitle: 'Многостраничные таблицы в LaTeX: пошаговая настройка пакета longtable',
        cardDescription: 'Как переносить длинные таблицы через разрывы страниц, автоматически повторять шапку таблицы, настраивать подписи «Продолжение таблицы» по ГОСТ.',
        sliderTitle: 'Многостраничные таблицы (longtable)',
        sliderText: 'Автоматический перенос строк, повтор шапки таблицы и правила оформления ГОСТ.',
        sidebarText: 'Верстайте большие массивы данных и спецификации в LaTeX без ручных разрывов страниц в Labkeeper.',
        ctaTitle: 'Работайте со сложными таблицами в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с готовыми сниппетами для таблиц longtable и автоматической компиляцией в PDF.',
        toc: [
            { id: 'problem', title: 'Почему стандартное окружение tabular не переносится' },
            { id: 'setup', title: 'Таблица на несколько страниц latex longtable: базовый шаблон' },
            { id: 'headers-footers', title: 'Специальные блоки шапок и подвалов longtable' },
            { id: 'gost-pagination', title: 'Перенос таблицы на следующий лист latex: подписи по ГОСТ' },
            { id: 'alignment', title: 'Ширина колонок и переносы строк внутри ячеек' }
        ],
        sections: [
            {
                id: 'problem',
                title: 'Почему стандартное окружение tabular не переносится',
                html: `                        <p>Стандартное окружение <code>\\begin{table} ... \\begin{tabular}</code> в LaTeX является неделимым «плавающим объектом» (float). Если число строк в таблице превышает высоту печатного листа, таблица не разрывается, а просто срезается нижним краем страницы и уходит за пределы листа бумаги.</p>
                        <p>Для создания таблиц произвольной длины (на 2, 5 или 20 страниц) используется специализированный пакет <strong>longtable</strong>. Он не оборачивается в плавающее окружение <code>table</code>, а вставляется напрямую в текст документа.</p>`
            },
            {
                id: 'setup',
                title: 'Таблица на несколько страниц latex longtable: базовый шаблон',
                html: `                        <p>Подключите пакет: <code>\\usepackage{longtable}</code>. Полноценная <strong>таблица на несколько страниц latex longtable</strong> разделяется на четыре служебные зоны заголовков и подвалов:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{longtable}{|c|p{8cm}|r|}
    % 1. Шапка на САМОЙ ПЕРВОЙ странице
    \\caption{Экспериментальные данные измерений}\\label{tab:measurements} \\\\
    \\hline
    \\textbf{№} & \\textbf{Наименование образца} & \\textbf{Масса, г} \\\\
    \\hline
    \\endfirsthead

    % 2. Шапка на ВСЕХ ПОСЛЕДУЮЩИХ страницах (по ГОСТ)
    \\multicolumn{3}{r}{\\textit{Продолжение таблицы \\ref{tab:measurements}}} \\\\
    \\hline
    \\textbf{№} & \\textbf{Наименование образца} & \\textbf{Масса, г} \\\\
    \\hline
    \\endhead

    % 3. Подвал на промежуточных страницах
    \\hline
    \\multicolumn{3}{|r|}{\\small Продолжение на следующей странице...} \\\\
    \\hline
    \\endfoot

    % 4. Завершающий подвал на последней странице
    \\hline
    \\endlastfoot

    % ТЕЛО ТАБЛИЦЫ
    1 & Образец кремниевой пластины марки А-1 & 14.52 \\\\ \\hline
    2 & Образец кремниевой пластины марки А-2 & 14.88 \\\\ \\hline
    % ... сотни строк данных ...
\\end{longtable}</code></pre>
                        </div>`
            },
            {
                id: 'headers-footers',
                title: 'Специальные блоки шапок и подвалов longtable',
                html: `                        <p>Ключевая особенность синтаксиса longtable заключается в предварительном объявлении шапок перед строками данных:</p>
                        <ul>
                            <li><code>\\endfirsthead</code> — фиксирует шапку, которая отобразится исключительно в начале таблицы на первом листе.</li>
                            <li><code>\\endhead</code> — дублирует шапку на каждом новом листе, куда продолжается таблица.</li>
                            <li><code>\\endfoot</code> — нижняя строка промежуточных листов.</li>
                            <li><code>\\endlastfoot</code> — финал таблицы (закрывающая горизонтальная черта <code>\\hline</code>).</li>
                        </ul>`
            },
            {
                id: 'gost-pagination',
                title: 'Перенос таблицы на следующий лист latex: подписи по ГОСТ',
                html: `                        <p>Российский ГОСТ 7.32-2017 строго регламентирует, как должен выглядеть <strong>перенос таблицы на следующий лист latex</strong> (подробный разбор правил смотрите в статье о <a href="/blog/table-continuation-multipage-gost-diploma">переносе таблицы на следующий лист в дипломе</a>):</p>
                        <ul>
                            <li>На первом листе над таблицей пишется полное название: «Таблица 1 — Название».</li>
                            <li>На всех следующих листах перед повторной шапкой выравнивается по правому краю надпись <em>«Продолжение таблицы 1»</em>.</li>
                            <li>Использование связки <code>\\multicolumn{N}{r}{\\textit{Продолжение таблицы \\ref{...}}}</code> в блоке <code>\\endhead</code> полностью закрывает это требование нормоконтроля в автоматическом режиме.</li>
                        </ul>`
            },
            {
                id: 'alignment',
                title: 'Ширина колонок и переносы строк внутри ячеек',
                html: `                        <p>Чтобы текст внутри ячеек автоматически переносился по словам, используйте колонки с фиксированной шириной <code>p{ширина}</code> (например, <code>p{6cm}</code>) вместо стандартных <code>l</code>, <code>c</code>, <code>r</code> (базовые приемы верстки описаны в руководстве по <a href="/blog/table-continuation-multipage-gost-diploma">переносу таблиц по ГОСТ</a>).</p>
                        <p>Для центрирования текста в таких ячейках используйте пакет <code>array</code> с модификатором <code>>{\\centering\\arraybackslash}p{4cm}</code>.</p>`
            }
        ],
        tips: [
            {
                title: 'Двойная компиляция для расчета колонок',
                html: '<p>Движок LaTeX рассчитывает ширину столбцов longtable в два прохода. Если при первой сборке границы колонок «поплыли», запустите компиляцию повторно.</p>'
            },
            {
                title: 'Принудительный разрыв страницы',
                html: '<p>Если нужно разорвать longtable в строго определенном месте до заполнения листа, вставьте команду <code>\\pagebreak</code> прямо между строк данных.</p>'
            }
        ]
    },
    {
        slug: 'latex-prevent-hyphenation-linebreaks',
        batch: 2,
        title: 'Как запретить разрыв слова и перенос на новую строку в LaTeX',
        pageTitle: 'Запретить перенос слова в LaTeX: неразрывный пробел тильда — Labkeeper',
        metaDescription: 'Как запретить перенос слова в LaTeX, зафиксировать неразрывный пробел тильдой ~, использовать mbox, hyphenation и избежать висячих предлогов.',
        breadcrumbTitle: 'Запрет переносов и неразрывный пробел',
        h1: 'Как запретить разрыв слова и&nbsp;перенос на&nbsp;новую строку в&nbsp;LaTeX',
        categories: ['latex'],
        keywords: [
            'запретить перенос слова в latex',
            'неразрывный пробел в latex тильда'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '6 мин',
        cardTitle: 'Управление переносами и неразрывными пробелами в LaTeX',
        cardDescription: 'Как убрать нежелательные переносы терминов, склеить предлоги с именами через неразрывный пробел ~, запретить разбиение формул через mbox.',
        sliderTitle: 'Запрет переносов и тильда в LaTeX',
        sliderText: 'Неразрывные пробелы, запрет дефисных переносов и связывание формул.',
        sidebarText: 'Контролируйте академическую типографику и оформление списков в веб-редакторе Labkeeper.',
        ctaTitle: 'Вёрстка по ГОСТ без висячих строк в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор документов LaTeX с автоматической проверкой переносов и быстрым рендерингом страниц.',
        toc: [
            { id: 'intro', title: 'Зачем управлять переносами слов' },
            { id: 'tilde-space', title: 'Неразрывный пробел в latex тильда: защита от висячих предлогов' },
            { id: 'mbox-block', title: 'Запретить перенос слова в latex: команда mbox' },
            { id: 'global-hyphenation', title: 'Глобальный список исключений через hyphenation' },
            { id: 'math-breaks', title: 'Запрет разрывов математических выражений в строке' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Зачем управлять переносами слов',
                html: `                        <p>LaTeX славится лучшим в мире алгоритмом выключки строк (алгоритм Кнута-Пласса). Однако автоматический перенос иногда дает сбои на сложных технических терминах, аббревиатурах (ГОСТ, ЮНЕСКО, СПбГУ) и фамилиях с инициалами (подробнее о различиях верстки читайте в статье о <a href="/blog/justified-text-spacing-hyphenation-latex-vs-word">выравнивании по ширине и переносах в LaTeX против Word</a>).</p>
                        <p>Особое внимание нормоконтроль уделяет «висячим предлогам»: однобуквенные союзы и предлоги (<em>и, в, с, к, о, на</em>) по правилам русской типографики категорически нельзя оставлять в самом конце строки.</p>`
            },
            {
                id: 'tilde-space',
                title: 'Неразрывный пробел в latex тильда: защита от висячих предлогов',
                html: `                        <p>Главный инструмент типографа — <strong>неразрывный пробел в latex тильда</strong> (символ <code>~</code>). Он заменяет стандартный пробел и сообщает компилятору: <em>эти два элемента должны остаться на одной строке ни при каких обстоятельствах</em> (это особенно важно соблюдать вместе с правильным <a href="/blog/paragraph-indent-1-25-gost">абзацным отступом 1.25 см по ГОСТ</a>).</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>В~соответствии с~требованиями ГОСТ~7.32-2017, приведенными в~разделе~4...
Профессор Иванов~И.~И. провел измерения на~стенде.
Длина волны составила 532~нм при температуре 20~$^\\circ$C.</code></pre>
                        </div>
                        <p>Обязательно ставьте тильду:</p>
                        <ul>
                            <li>Между числом и единицей измерения: <code>10~кг</code>, <code>250~В</code>, <code>5~мин</code>.</li>
                            <li>Между инициалами и фамилией: <code>А.~С.~Пушкин</code>.</li>
                            <li>Перед ссылками на формулы, рисунки и литературу: <code>рисунок~\\ref{fig:1}</code>, <code>[~\\cite{lit1}]</code>.</li>
                        </ul>`
            },
            {
                id: 'mbox-block',
                title: 'Запретить перенос слова в latex: команда mbox',
                html: `                        <p>Если вам нужно <strong>запретить перенос слова в latex</strong> локально в конкретном месте, оберните его в команду <code>\\mbox{...}</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>Новейший чипсет \\mbox{GeForce-RTX-5090} не будет разрываться дефисом.
Команда \\mbox{\\textbf{sudo systemctl restart}} останется единым блоком.</code></pre>
                        </div>
                        <p>Команда <code>\\mbox</code> создает неделимый горизонтальный бокс, запрещая перенос в любом месте внутри фигурных скобок.</p>`
            },
            {
                id: 'global-hyphenation',
                title: 'Глобальный список исключений через hyphenation',
                html: `                        <p>Чтобы не оборачивать термин в <code>\\mbox</code> десятки раз по всему тексту, задайте словарь исключений в преамбуле с помощью команды <code>\\hyphenation</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>% Слова без дефисов вообще не будут переноситься
\\hyphenation{микроконтроллер блокчейн интерфейс}

% Слова с дефисами будут переноситься строго в указанных слогах
\\hyphenation{мик-ро-процес-сор диссер-та-ция}</code></pre>
                        </div>`
            },
            {
                id: 'math-breaks',
                title: 'Запрет разрывов математических выражений в строке',
                html: `                        <p>В строчных формулах $a + b = c$ LaTeX может разорвать строку на знаке равенства или сложения. Чтобы запретить такой перенос:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>% Локально через фигурные скобки:
\${a + b = c}\$

% Или глобально в преамбуле через штрафы за перенос:
\\binoppenalty=10000 % Запрет разрыва на бинарных операциях (+, -)
\\relpenalty=10000   % Запрет разрыва на отношениях (=, <, >)</code></pre>
                        </div>`
            }
        ],
        tips: [
            {
                title: 'Пакет microtype',
                html: '<p>Подключение <code>\\usepackage{microtype}</code> включает оптическое выравнивание полей и микромасштабирование глифов, сокращая число переносов на 80% естественным путем.</p>'
            },
            {
                title: 'Перенос слов с уже имеющимся дефисом',
                html: '<p>В русских составных словах (интернет-магазин) используйте специальный макрос пакета babel <code>интернет"=магазин</code>, чтобы разрешить перенос как в месте дефиса, так и в словах вокруг него.</p>'
            }
        ]
    },
    {
        slug: 'latex-tikz-automata-graphs',
        batch: 2,
        title: 'Рисование конечных автоматов и графов с помощью TikZ',
        pageTitle: 'Нарисовать граф в LaTeX TikZ automata: конечный автомат онлайн — Labkeeper',
        metaDescription: 'Пошаговый гайд: как нарисовать граф в LaTeX через TikZ automata, построить конечный автомат онлайн, задать начальные и финальные состояния, переходы.',
        breadcrumbTitle: 'Графы и автоматы в TikZ',
        h1: 'Рисование конечных автоматов и&nbsp;графов с&nbsp;помощью TikZ',
        categories: ['latex'],
        keywords: [
            'нарисовать граф в latex tikz automata',
            'конечный автомат latex онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '8 мин',
        cardTitle: 'Конечные автоматы и графы в LaTeX: руководство по библиотеке TikZ automata',
        cardDescription: 'Как строить ориентированные графы, диаграммы состояний (DFA/NFA), настраивать петли, радиусы узлов и переходы в академических работах.',
        sliderTitle: 'Конечные автоматы и графы (TikZ)',
        sliderText: 'Библиотека automata, узлы состояний, дуги переходов и стильные петли.',
        sidebarText: 'Рисуйте сложные математические графы и конечные автоматы прямо в браузере с Labkeeper.',
        ctaTitle: 'Создавайте векторные схемы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с полной поддержкой TikZ, моментальной компиляцией в PDF и экспортом графики.',
        toc: [
            { id: 'intro', title: 'Библиотека TikZ automata для теории автоматов' },
            { id: 'setup', title: 'Подключение библиотек и базовые стили' },
            { id: 'automata-example', title: 'Конечный автомат latex онлайн: начальные и допускающие состояния' },
            { id: 'graph-drawing', title: 'Нарисовать граф в latex tikz automata: изогнутые ребра и петли' },
            { id: 'styling-tips', title: 'Позиционирование узлов относительно друг друга' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Библиотека TikZ automata для теории автоматов',
                html: `                        <p>В курсах дискретной математики, теории компиляторов и теоретической информатики постоянной задачей является отрисовка детерминированных (ДКА) и недетерминированных (НКА) конечных автоматов, сетей Петри и графов переходов (в смежных задачах программирования также полезен навык <a href="/blog/algorithm-flowcharts-gost-markdown-latex">создания блок-схем алгоритмов по ГОСТ</a>).</p>
                        <p>Специализированная библиотека TikZ <strong>automata</strong> предоставляет готовые семантические примитивы: начальные состояния со стрелкой входа (<code>initial</code>), финальные допускающие состояния с двойной окружностью (<code>accepting</code>), а также петли и дуги переходов.</p>`
            },
            {
                id: 'setup',
                title: 'Подключение библиотек и базовые стили',
                html: `                        <p>В преамбуле документа подключите TikZ и расширения для позиционирования и автоматов:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{tikz}
\\usetikzlibrary{automata, positioning, arrows.meta}</code></pre>
                        </div>
                        <p>Библиотека <code>positioning</code> позволяет размещать состояния фразами вида <code>right=of q0</code> вместо ручного высчитывания сантиметров.</p>`
            },
            {
                id: 'automata-example',
                title: 'Конечный автомат latex онлайн: начальные и допускающие состояния',
                html: `                        <p>Ниже приведен готовый код, собирающий рабочий <strong>конечный автомат latex онлайн</strong>, распознающий бинарные цепочки с четным числом нулей (а иерархические структуры графов удобно строить через <a href="/blog/latex-forest-trees">пакет синтаксических деревьев forest</a>):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{tikzpicture}[
    shorten >=1pt,
    node distance=3cm,
    on grid,
    auto,
    every state/.style={thick, fill=blue!10}
]
    % Состояния
    \\node[state, initial, accepting] (q_0)   {$q_0$};
    \\node[state]                    (q_1) [right=of q_0] {$q_1$};

    % Переходы
    \\path[-{Stealth}]
        (q_0) edge [loop above] node {1} (q_0)
              edge [bend left]  node {0} (q_1)
        (q_1) edge [loop above] node {1} (q_1)
              edge [bend left]  node {0} (q_0);
\\end{tikzpicture}</code></pre>
                        </div>
                        <p>Ключевые директивы:</p>
                        <ul>
                            <li><code>state, initial</code> — рисует состояние $q_0$ с входящей стартовой стрелкой слева.</li>
                            <li><code>accepting</code> — автоматически отрисовывает двойную концентрическую окружность допускающего состояния.</li>
                            <li><code>bend left</code> — изгибает ребро дугой, чтобы прямая и обратная стрелки между узлами не сливались.</li>
                        </ul>`
            },
            {
                id: 'graph-drawing',
                title: 'Нарисовать граф в latex tikz automata: изогнутые ребра и петли',
                html: `                        <p>Если требуется <strong>нарисовать граф в latex tikz automata</strong> общего вида (взвешенный, ориентированный или неориентированный), используют стили весов на дугах:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{tikzpicture}[node distance=2.5cm, main/.style = {draw, circle, thick, minimum size=8mm}]
    \\node[main] (1) {$v_1$};
    \\node[main] (2) [right=of 1] {$v_2$};
    \\node[main] (3) [below right=of 1] {$v_3$};

    \\path[->, >=stealth, thick]
        (1) edge node[above] {$w=4$} (2)
        (2) edge [bend right] node[right] {$w=2$} (3)
        (3) edge node[below left] {$w=7$} (1)
        (1) edge [loop left] node {$w=1$} (1);
\\end{tikzpicture}</code></pre>
                        </div>
                        <p>Опция <code>loop left</code> / <code>loop above</code> формирует аккуратную петлю перехода узла в самого себя.</p>`
            },
            {
                id: 'styling-tips',
                title: 'Позиционирование узлов относительно друг друга',
                html: `                        <p>Советы для создания чистых схем:</p>
                        <ul>
                            <li>Используйте <code>node distance=2.5cm and 3cm</code>, чтобы раздельно управлять горизонтальным и вертикальным шагом сетки.</li>
                            <li>Для русскоязычных надписей на стрелках используйте стандартные текстовые ноды: <code>node[midway, above] {сигнал}</code>.</li>
                            <li>Цветные заливки состояний (<code>fill=green!20</code>) помогают визуализировать текущее состояние алгоритма при пошаговом объяснении в презентациях.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Скрытие стартового текста "start"',
                html: '<p>По умолчанию над стрелкой входа пишется слово «start». Чтобы убрать его или заменить на русское «вход», добавьте параметр: <code>initial text={вход}</code> или <code>initial text={}</code>.</p>'
            },
            {
                title: 'Толщина линий переходов',
                html: '<p>Для полиграфической четкости используйте глобальный модификатор стрелок <code>-Latex[length=3mm, width=2mm]</code>.</p>'
            }
        ]
    },
    {
        slug: 'programming-lab-report-code-listings-gost',
        batch: 2,
        title: 'Идеальный отчет по программированию: листинги кода по ГОСТ',
        pageTitle: 'Отчет по лабораторной программирование: оформление листингов кода — Labkeeper',
        metaDescription: 'Шаблон отчета по лабораторной по программированию: оформление листингов в отчете по ГОСТ 7.32, подсветка синтаксиса, нумерация строк в Labkeeper.',
        breadcrumbTitle: 'Листинги кода в отчетах по ГОСТ',
        h1: 'Идеальный отчет по&nbsp;программированию: листинги кода по&nbsp;ГОСТ',
        categories: ['labs'],
        keywords: [
            'отчет по лабораторной программирование шаблон',
            'оформление листингов в отчете'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '7 мин',
        cardTitle: 'Листинги кода в отчетах по ГОСТ: шаблон и правила оформления',
        cardDescription: 'Как оформлять программный код в студенческих отчетах и ВКР: пакет listings, моноширинные шрифты, нумерация строк, рамки и требования нормоконтроля.',
        sliderTitle: 'Листинги кода по ГОСТ в отчетах',
        sliderText: 'Пакет listings, правила ГОСТ 7.32, моноширинные шрифты и шаблоны отчетов.',
        sidebarText: 'Создавайте безупречные отчеты по IT-дисциплинам в Labkeeper с автоматической нумерацией и подсветкой кода.',
        ctaTitle: 'Сдавайте лабораторные с первого раза в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с готовыми шаблонами отчетов по ГОСТ, поддержкой листингов кода и быстрой компиляцией в PDF.',
        toc: [
            { id: 'requirements', title: 'Требования нормоконтроля к исходному коду' },
            { id: 'template', title: 'Отчет по лабораторной программирование шаблон: структура документа' },
            { id: 'listings-config', title: 'Оформление листингов в отчете: пакет listings и кириллица' },
            { id: 'external-files', title: 'Импорт кода напрямую из файлов программ' },
            { id: 'minted-alternative', title: 'Современная альтернатива: пакет minted' }
        ],
        sections: [
            {
                id: 'requirements',
                title: 'Требования нормоконтроля к исходному коду',
                html: `                        <p>В отчетах по программированию, вычислительной математике и системному администрированию листинг программы является главным доказательством работоспособности выполненного задания. Согласно ГОСТ 7.32-2017 и методическим указаниям вузов:</p>
                        <ul>
                            <li>Код оформляется моноширинным шрифтом (Courier New, Consolas) меньшего кегля (10–12 пт при основном тексте 14 пт).</li>
                            <li>Каждый листинг должен иметь порядковый номер и содержательное название: например, <em>«Листинг 1.1 — Функция быстрой сортировки массива»</em>.</li>
                            <li>Длинные фрагменты кода (свыше 1–2 страниц) обязательно выносятся в <a href="/blog/diploma-appendices-listings-diagrams-gost">приложения диплома или курсовой работы</a>, а в основном тексте отчета остаются только ключевые функции и алгоритмы.</li>
                        </ul>`
            },
            {
                id: 'template',
                title: 'Отчет по лабораторной программирование шаблон: структура документа',
                html: `                        <p>Классический <strong>отчет по лабораторной программирование шаблон</strong> содержит следующие обязательные разделы:</p>
                        <ol>
                            <li>Титульный лист (кафедра, дисциплина, вариант, ФИО студента и преподавателя).</li>
                            <li>Цель работы и техническое задание.</li>
                            <li>Описание архитектуры и алгоритма решения (с блок-схемой).</li>
                            <li>Ключевые листинги программного кода.</li>
                            <li><a href="/blog/software-screenshots-report-gost-caption">Скриншоты работы программы по ГОСТ</a> и тестовые наборы данных.</li>
                            <li>Выводы по проделанной работе.</li>
                        </ol>`
            },
            {
                id: 'listings-config',
                title: 'Оформление листингов в отчете: пакет listings и кириллица',
                html: `                        <p>Правильное <strong>оформление листингов в отчете</strong> настраивается через пакет <code>listings</code> в преамбуле LaTeX документа:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{listings}
\\usepackage{xcolor}

\\lstset{
    basicstyle=\\ttfamily\\small,       % Моноширинный шрифт меньшего кегля
    numbers=left,                     % Нумерация строк слева
    numberstyle=\\tiny\\color{gray},     % Стиль номеров строк
    stepnumber=1,
    numbersep=8pt,
    frame=single,                     % Тонкая рамка вокруг листинга
    tabsize=4,
    breaklines=true,                  % Автоматический перенос длинных строк
    keywordstyle=\\color{blue}\\bfseries,
    commentstyle=\\color{teal}\\textit,
    stringstyle=\\color{red},
    captionpos=t                      % Подпись НАД листингом по ГОСТ
}</code></pre>
                        </div>
                        <p>В тексте программы фрагмент вставляется через окружение <code>lstlisting</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{lstlisting}[language=Python, caption={Функция вычисления факториала}]
def factorial(n: int) -> int:
    """Вычисление факториала числа n"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)
\\end{lstlisting}</code></pre>
                        </div>`
            },
            {
                id: 'external-files',
                title: 'Импорт кода напрямую из файлов программ',
                html: `                        <p>Вместо копирования кода вручную через буфер обмена гораздо надежнее подключать файлы проекта напрямую через команду <code>\\lstinputlisting</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>% Вставка всего файла с кодом
\\lstinputlisting[language=C++, caption={Главный модуль main.cpp}]{src/main.cpp}

% Вставка только диапазона строк с 15 по 45
\\lstinputlisting[language=C++, firstline=15, lastline=45, caption={Алгоритм Дейкстры}]{src/graph.cpp}</code></pre>
                        </div>
                        <p>При таком подходе любые изменения в вашем коде моментально отражаются в отчете при очередной компиляции.</p>`
            },
            {
                id: 'minted-alternative',
                title: 'Современная альтернатива: пакет minted',
                html: `                        <p>Если требуется подсветка синтаксиса полиграфического уровня, используют пакет <code>minted</code> на базе библиотек Pygments. Он обеспечивает безупречное выделение языковых конструкций для сотен языков (Rust, Go, Kotlin, Swift, SQL) с идеальной передачей русских комментариев.</p>`
            }
        ],
        tips: [
            {
                title: 'Русские комментарии в listings',
                html: '<p>Чтобы кириллица в комментариях отображалась без артефактов, добавьте параметр: <code>keepspaces=true, extendedchars=true</code>.</p>'
            },
            {
                title: 'Слово «Листинг» в заголовке',
                html: '<p>Чтобы заменить английское слово «Listing» на русское по ГОСТ, добавьте строчку: <code>\\renewcommand{\\lstlistingname}{Листинг}</code>.</p>'
            }
        ]
    }
];
