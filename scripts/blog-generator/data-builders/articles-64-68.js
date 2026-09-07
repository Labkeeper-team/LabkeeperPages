module.exports = [
    {
        slug: 'latex-rotating-package-sidewaystable-rotate-90',
        batch: 2,
        title: 'Вращение текста и широких таблиц на 90 градусов (пакет rotating)',
        pageTitle: 'Повернуть таблицу на 90 градусов LaTeX: пакет rotating sidewaystable — Labkeeper',
        metaDescription: 'Как повернуть таблицу на 90 градусов в LaTeX: пакет rotating, окружение sidewaystable, альбомные таблицы в книжном документе и ГОСТ в Labkeeper.',
        breadcrumbTitle: 'Вращение таблиц rotating в LaTeX',
        h1: 'Вращение текста и&nbsp;широких таблиц на&nbsp;90&nbsp;градусов (пакет rotating)',
        categories: ['latex'],
        keywords: [
            'повернуть таблицу на 90 градусов latex',
            'пакет rotating sidewaystable'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '7 мин',
        cardTitle: 'Вращение таблиц на 90 градусов в LaTeX: пакет rotating и sidewaystable',
        cardDescription: 'Как разместить широкую таблицу на альбомном развороте внутри книжного документа без сбоя нумерации страниц по ГОСТ 7.32.',
        sliderTitle: 'Вращение таблиц (rotating)',
        sliderText: 'Как повернуть широкую таблицу на 90 градусов с помощью sidewaystable.',
        sidebarText: 'В Labkeeper широкие таблицы и схемы легко верстаются в альбомной ориентации с автоматическим экспортом в PDF.',
        ctaTitle: 'Верстайте сложные таблицы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с поддержкой пакета rotating: альбомные страницы, точные поля и безупречная ГОСТ-типографика.',
        toc: [
            { id: 'problem', title: 'Проблема широких таблиц в книжной ориентации А4' },
            { id: 'rotating-package', title: 'Пакет rotating sidewaystable: подключение и синтаксис' },
            { id: 'turn-90', title: 'Повернуть таблицу на 90 градусов LaTeX: полный пример кода' },
            { id: 'gost-rules', title: 'Требования ГОСТ к расположению альбомных таблиц' },
            { id: 'single-cell-rotation', title: 'Вращение отдельных заголовков колонок через turn и rotatebox' }
        ],
        sections: [
            {
                id: 'problem',
                title: 'Проблема широких таблиц в книжной ориентации А4',
                html: `                        <p>В дипломных проектах, диссертациях и экономических отчетах часто встречаются таблицы из 8–15 колонок с подробными числовыми данными. В стандартный книжный лист формата А4 (ширина 210 мм за вычетом полей 30 мм и 15 мм оставляет всего 165 мм полезного пространства) такая таблица физически не помещается: текст начинает безобразно сжиматься, слова переносятся по буквам, либо таблица вылезает за пределы правого поля.</p>
                        <p>Единственное правильное типографическое решение по ГОСТ 7.32 и ГОСТ 2.105 — повернуть таблицу на 90 градусов против часовой стрелки, расположив ее на альбомном развороте, но сохранив при этом стандартное положение колонтитулов и номера страницы. Дополнительно улучшить читаемость повернотой таблицы можно с помощью настройки <a href="/blog/latex-arraystretch-table-row-height-spacing">межстрочного интервала в ячейках через arraystretch</a>.</p>`
            },
            {
                id: 'rotating-package',
                title: 'Пакет rotating sidewaystable: подключение и синтаксис',
                html: `                        <p>Для реализации альбомного поворота используется специализированный <strong>пакет rotating sidewaystable</strong>. Подключите его в преамбуле документа:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Преамбула</span></div>
                            <pre><code>\\usepackage{rotating}</code></pre>
                        </div>
                        <p>Пакет предоставляет два мощных окружения:</p>
                        <ul>
                            <li><code>sidewaystable</code> — для размещения широких таблиц на отдельной повернутой странице;</li>
                            <li><code>sidewaysfigure</code> — для размещения широких чертежей, графов и схем.</li>
                        </ul>`
            },
            {
                id: 'turn-90',
                title: 'Повернуть таблицу на 90 градусов LaTeX: полный пример кода',
                html: `                        <p>Чтобы <strong>повернуть таблицу на 90 градусов latex</strong>, замените стандартное окружение <code>\\begin{table}</code> на <code>\\begin{sidewaystable}</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Альбомная таблица</span></div>
                            <pre><code>\\begin{sidewaystable}[htbp]
\\centering
\\caption{Сравнительный анализ производительности распределенных баз данных}
\\label{tab:db-comparison}
\\begin{tabular}{|l|c|c|c|c|c|c|}
\\hline
СУБД & Модель данных & Макс. RPS & Задержка p99, мс & Масштабируемость & Лицензия & Поддержка SQL \\\\
\\hline
PostgreSQL & Реляционная & 12 000 & 8.5 & Вертикальная / шардинг & Open Source & Полная \\\\
ClickHouse & Колоночная & 150 000 & 1.2 & Горизонтальная кластерная & Apache 2.0 & Диалект SQL \\\\
MongoDB & Документная & 45 000 & 4.1 & Шардинг из коробки & SSPL & Нет (MQL) \\\\
Redis & Key-Value & 850 000 & 0.3 & Redis Cluster & Redis Source & Нет \\\\
\\hline
\\end{tabular}
\\end{sidewaystable}</code></pre>
                        </div>
                        <p>LaTeX автоматически выделит под таблицу отдельный лист, повернет саму таблицу и ее заголовок на 90 градусов, а колонтитул с номером листа оставит на стандартном месте. Если в таблице много численных данных из расчетов, вы можете комбинировать ее с автоматизацией при <a href="/blog/latex-pgfplotstable-import-excel-csv-tables">чтении CSV-таблиц пакетом pgfplotstable</a>.</p>`
            },
            {
                id: 'gost-rules',
                title: 'Требования ГОСТ к расположению альбомных таблиц',
                html: `                        <p>Согласно ГОСТ 7.32-2017:</p>
                        <ul>
                            <li>Таблицу поворачивают так, чтобы ее чтение осуществлялось поворотом документа <strong>по часовой стрелке</strong> (то есть верх таблицы оказывается у левого поля страницы);</li>
                            <li>Пакет <code>rotating</code> по умолчанию соблюдает это правило для нечетных страниц;</li>
                            <li>Если документ с двухсторонней печатью, используйте опцию <code>\\usepackage[figuresright]{rotating}</code>, чтобы все таблицы были повернуты в одну сторону.</li>
                        </ul>`
            },
            {
                id: 'single-cell-rotation',
                title: 'Вращение отдельных заголовков колонок через turn и rotatebox',
                html: `                        <p>Если повернуть нужно не всю таблицу целиком, а только длинные подписи узких столбцов в шапке, используйте команду <code>\\rotatebox{90}{...}</code> из пакета <code>graphicx</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Поворот текста в шапке</span></div>
                            <pre><code>\\usepackage{graphicx}

\\begin{tabular}{|l|c|c|}
\\hline
Студент & \\rotatebox{90}{Теория вероятностей} & \\rotatebox{90}{Дискретная математика} \\\\
\\hline
Иванов & 5 & 4 \\\\
Петров & 4 & 5 \\\\
\\hline
\\end{tabular}</code></pre>
                        </div>`
            }
        ],
        tips: [
            {
                title: 'Размещение на отдельной странице',
                html: '<p>Окружение <code>sidewaystable</code> всегда занимает всю страницу целиком. Не пытайтесь разместить обычный текст до или после нее на том же листе.</p>'
            },
            {
                title: 'Экспорт в PDF в Labkeeper',
                html: '<p>В Labkeeper поворот таблиц компилируется корректно без искажения размеров шрифта и смещения рамок.</p>'
            }
        ]
    },
    {
        slug: 'latex-multicol-multi-column-layout-journal',
        batch: 2,
        title: 'Создание многоколоночного текста для газет и журналов (multicol)',
        pageTitle: 'Текст в 3 колонки LaTeX multicol: верстка газеты в LaTeX онлайн — Labkeeper',
        metaDescription: 'Как сделать текст в 2 или 3 колонки в LaTeX с помощью пакета multicol. Разделительные линии, балансировка колонок и верстка газеты онлайн в Labkeeper.',
        breadcrumbTitle: 'Многоколоночный текст multicol в LaTeX',
        h1: 'Создание многоколоночного текста для&nbsp;газет и&nbsp;журналов (multicol)',
        categories: ['latex'],
        keywords: [
            'текст в 3 колонки latex multicol',
            'верстка газеты в latex онлайн'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '7 мин',
        cardTitle: 'Многоколоночная верстка в LaTeX: пакет multicol для журналов и газет',
        cardDescription: 'Как разбить текст на 2, 3 или 4 колонки, добавить вертикальные разделительные линии и динамически переключаться между колонками без разрыва страницы.',
        sliderTitle: 'Многоколоночный текст (multicol)',
        sliderText: 'Как верстать текст в 2 и 3 колонки с балансировкой высоты в LaTeX.',
        sidebarText: 'В Labkeeper вы можете верстать статьи в журнальном двухколоночном и трехколоночном формате с мгновенным предпросмотром.',
        ctaTitle: 'Верстайте журнальные статьи в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с поддержкой многоколоночной разметки multicol, автоматической расстановкой переносов и экспортом в PDF.',
        toc: [
            { id: 'why-multicol', title: 'Преимущества multicol над стандартной опцией twocolumn' },
            { id: 'three-columns', title: 'Текст в 3 колонки LaTeX multicol: подключение и базовый синтаксис' },
            { id: 'styling-columns', title: 'Настройка разделительных линий columnseprule и отступов' },
            { id: 'newspaper-layout', title: 'Верстка газеты в LaTeX онлайн: врезки, шапки и сбалансированные колонки' },
            { id: 'wide-elements', title: 'Широкие рисунки и формулы на всю ширину страницы' }
        ],
        sections: [
            {
                id: 'why-multicol',
                title: 'Преимущества multicol над стандартной опцией twocolumn',
                html: `                        <p>В стандартном LaTeX есть базовый режим <code>\\documentclass[twocolumn]{article}</code>. Однако он крайне негибок: принудительно делит весь документ ровно на две колонки от начала до конца, не позволяет делать одноколоночную шапку (заголовок и аннотация на всю ширину листа) и не поддерживает верстку в 3 и более колонок.</p>
                        <p>Пакет <strong>multicol</strong> решает эту задачу идеально: вы можете переключаться между любым количеством колонок прямо посреди страницы без принудительного разрыва листа. Это особенно ценно при <a href="/blog/rinc-vak-scientific-article-template-fonts-margins">оформлении научных статей для РИНЦ и ВАК</a>, где шапка статьи традиционно набирается в одну колонку, а текст исследования — в две.</p>`
            },
            {
                id: 'three-columns',
                title: 'Текст в 3 колонки LaTeX multicol: подключение и базовый синтаксис',
                html: `                        <p>Чтобы организовать <strong>текст в 3 колонки latex multicol</strong>, подключите пакет в преамбуле и используйте окружение <code>multicols</code>, передав число колонок первым аргументом:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX 3 Колонки</span></div>
                            <pre><code>\\usepackage{multicol}

% В теле документа:
\\begin{multicols}{3}
Здесь располагается непрерывный поток текста. Пакет автоматически 
рассчитывает высоту каждой колонки и балансирует их так, чтобы 
нижний край на последней странице был идеально ровным.
\\end{multicols}</code></pre>
                        </div>
                        <p><em>Особенность:</em> по умолчанию пакет <code>multicol</code> автоматически выравнивает высоту всех колонок по нижнему краю (балансировка). Если вам нужно, чтобы текст заполнял сначала первую колонку до самого низа страницы, а затем перетекал во вторую, используйте окружение со звездочкой <code>multicols*</code>.</p>`
            },
            {
                id: 'styling-columns',
                title: 'Настройка разделительных линий columnseprule и отступов',
                html: `                        <p>В газетной и журнальной верстке между колонками часто добавляют элегантную тонкую вертикальную черту и настраивают расстояние между колонками:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Стилизация multicol</span></div>
                            <pre><code>\\setlength{\\columnsep}{18pt}      % Расстояние между колонками (по умолчанию 10pt)
\\setlength{\\columnseprule}{0.4pt}  % Толщина вертикальной разделительной линии (0pt = невидима)</code></pre>
                        </div>
                        <p>В электронных версиях таких изданий критически важно сохранять интерактивность — ознакомьтесь с принципами <a href="/blog/latex-hyperref-pdf-bookmarks-navigation">навигации по разделам документа через hyperref</a>.</p>`
            },
            {
                id: 'newspaper-layout',
                title: 'Верстка газеты в LaTeX онлайн: врезки, шапки и сбалансированные колонки',
                html: `                        <p>Полноценная <strong>верстка газеты в latex онлайн</strong> строится по комбинированной схеме: шапка издания и заголовок передовицы идут на всю ширину страницы, а основной материал разбивается на 3 колонки:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Газетная полоса</span></div>
                            <pre><code>\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[russian]{babel}
\\usepackage{multicol}
\\usepackage[margin=1.5cm]{geometry}

\\begin{document}

\\begin{center}
{\\Huge\\bfseries ВЕСТНИК НАУКИ И ТЕХНОЛОГИЙ}\\\\
\\vspace{0.2cm}
{\\small Выпуск № 12 (245) \\hfill 6 сентября 2026 г. \\hfill Издается с 2020 года}\\\\
\\hrulefill
\\end{center}

\\begin{multicols}{3}[\\section*{Прорыв в квантовых вычислениях: кубиты при комнатной температуре}]
Исследователи из объединенной лаборатории объявили об успешной стабилизации спиновых состояний...
\\end{multicols}

\\end{document}</code></pre>
                        </div>
                        <p>Параметр в квадратных скобках <code>[\\section*{...}]</code> печатается на всю ширину листа прямо над началом многоколоночного блока!</p>`
            },
            {
                id: 'wide-elements',
                title: 'Широкие рисунки и формулы на всю ширину страницы',
                html: `                        <p>Если внутри многоколоночного текста требуется разместить широкую формулу или схему, используют окружения со звездочкой (<code>\\begin{figure*}</code>, <code>\\begin{table*}</code>), которые растягиваются на всю ширину полосы набора.</p>`
            }
        ],
        tips: [
            {
                title: 'Принудительный переход в новую колонку',
                html: '<p>Чтобы принудительно оборвать текущую колонку и перенести текст в следующую, используйте команду <code>\\columnbreak</code>.</p>'
            },
            {
                title: 'Верстка журналов в Labkeeper',
                html: '<p>В Labkeeper шаблоны научных журналов IEEE и ACM уже преднастроены с правильными отступами multicol и переносами по словарю русского языка.</p>'
            }
        ]
    },
    {
        slug: 'latex-pgfplotstable-import-excel-csv-tables',
        batch: 2,
        title: 'Импорт данных из Excel в таблицы LaTeX (pgfplotstable)',
        pageTitle: 'Конвертировать Excel в таблицу LaTeX: pgfplotstable чтение CSV — Labkeeper',
        metaDescription: 'Как конвертировать Excel в таблицу LaTeX с помощью пакета pgfplotstable. Прямое чтение CSV-файлов, форматирование чисел, запятая по ГОСТу в Labkeeper.',
        breadcrumbTitle: 'Импорт Excel и CSV в LaTeX',
        h1: 'Импорт данных из&nbsp;Excel в&nbsp;таблицы LaTeX (pgfplotstable)',
        categories: ['latex'],
        keywords: [
            'конвертировать excel в таблицу latex',
            'pgfplotstable чтение csv'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '8 мин',
        cardTitle: 'Автоматический импорт таблиц из Excel и CSV в LaTeX: пакет pgfplotstable',
        cardDescription: 'Как забыть о ручном наборе таблиц: загрузка внешних CSV-файлов, округление знаков, форматирование заголовков и русская запятая в числах.',
        sliderTitle: 'Импорт Excel/CSV в LaTeX',
        sliderText: 'Прямое чтение CSV-таблиц из Excel с пакетом pgfplotstable в LaTeX.',
        sidebarText: 'В Labkeeper вы можете загружать файлы CSV и автоматически генерировать из них чистые LaTeX-таблицы с оформлением по ГОСТ.',
        ctaTitle: 'Автоматизируйте таблицы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-платформа с поддержкой pgfplotstable: загрузка CSV из Excel, моментальная компиляция и экспорт в PDF.',
        toc: [
            { id: 'why-automate', title: 'Почему ручной перенос таблиц из Excel в LaTeX — это тупик' },
            { id: 'csv-export', title: 'Подготовка данных: экспорт из Microsoft Excel в формат CSV' },
            { id: 'pgfplotstable-setup', title: 'Конвертировать Excel в таблицу LaTeX: базовый вызов pgfplotstable' },
            { id: 'reading-csv', title: 'Pgfplotstable чтение CSV: разделители, кодировка и русская запятая' },
            { id: 'styling-booktabs', title: 'Профессиональная стилизация: шапка, границы и округление' }
        ],
        sections: [
            {
                id: 'why-automate',
                title: 'Почему ручной перенос таблиц из Excel в LaTeX — это тупик',
                html: `                        <p>В ходе научных исследований и инженерных расчетов данные непрерывно меняются: провели новую серию измерений, пересчитали формулу в Excel — и вся таблица из 50 строк изменилась. Если переносить каждую ячейку в LaTeX вручную через амперсанды <code>&amp;</code> и слэши <code>\\\\</code>, вы потратите часы и неизбежно допустите опечатки.</p>
                        <p>Идеальный инженерный подход — связать файл данных напрямую с документом LaTeX. При обновлении расчетов документ пересобирается автоматически с новыми числами. А чтобы строки данных не выглядели тесно, используйте макрос для <a href="/blog/latex-arraystretch-table-row-height-spacing">настройки высоты строк в таблицах</a>.</p>`
            },
            {
                id: 'csv-export',
                title: 'Подготовка данных: экспорт из Microsoft Excel в формат CSV',
                html: `                        <p>В Excel сохраните нужный лист через меню <em>«Сохранить как» &rarr; «CSV (разделители — запятые)»</em> или <em>«Текстовый файл с разделителями табуляции»</em>. В русскоязычной версии Excel разделителем столбцов традиционно выступает точка с запятой <code>;</code>, а десятичным разделителем — запятая <code>,</code>.</p>`
            },
            {
                id: 'pgfplotstable-setup',
                title: 'Конвертировать Excel в таблицу LaTeX: базовый вызов pgfplotstable',
                html: `                        <p>Для чтения данных подключите пакет <strong>pgfplotstable</strong> (он входит в состав TeX Live и надстраивается над pgfplots):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Преамбула</span></div>
                            <pre><code>\\usepackage{pgfplotstable}
\\usepackage{booktabs}
\\pgfplotsset{compat=1.18}</code></pre>
                        </div>
                        <p>Теперь, чтобы <strong>конвертировать excel в таблицу latex</strong>, достаточно одной строки:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Вставка</span></div>
                            <pre><code>\\pgfplotstabletypeset[col sep=semicolon]{measurements.csv}</code></pre>
                        </div>
                        <p>Если импортируемый массив данных слишком широк для книжной страницы, оберните его в окружение для <a href="/blog/latex-rotating-package-sidewaystable-rotate-90">вращения широких таблиц sidewaystable</a>.</p>`
            },
            {
                id: 'reading-csv',
                title: 'Pgfplotstable чтение CSV: разделители, кодировка и русская запятая',
                html: `                        <p>При использовании <strong>pgfplotstable чтение csv</strong> можно настроить с ювелирной точностью под российские стандарты:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Тонкая настройка</span></div>
                            <pre><code>\\pgfplotstabletypeset[
    col sep=semicolon,               % Разделитель колонок (точка с запятой из Excel)
    string type,                     % Если в колонках есть текст
    every head row/.style={
        before row=\\toprule,
        after row=\\midrule
    },
    every last row/.style={
        after row=\\bottomrule
    }
]{data.csv}</code></pre>
                        </div>
                        <p>Если в CSV содержатся вещественные числа, которые нужно автоматически округлить до 2 знаков после запятой и заменить десятичную точку на русскую запятую по ГОСТу:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Округление и ГОСТ запятая</span></div>
                            <pre><code>\\pgfplotstabletypeset[
    col sep=comma,
    every numeric column/.style={
        precision=2,
        fixed,
        dec sep align,
        set thousands separator={\\,}
    }
]{experiment.csv}</code></pre>
                        </div>`
            },
            {
                id: 'styling-booktabs',
                title: 'Профессиональная стилизация: шапка, границы и округление',
                html: `                        <p>Вы можете переименовывать столбцы таблицы прямо в LaTeX, не меняя заголовки в самом файле CSV:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX Переименование столбцов</span></div>
                            <pre><code>\\pgfplotstabletypeset[
    col sep=semicolon,
    columns/time/.style={column name={Время $t$, с}},
    columns/voltage/.style={column name={Напряжение $U$, В}},
    columns/current/.style={column name={Ток $I$, мА}}
]{measurements.csv}</code></pre>
                        </div>`
            }
        ],
        tips: [
            {
                title: 'Храните CSV рядом с исходником .tex',
                html: '<p>Поместите файл <code>data.csv</code> в ту же папку проекта, что и основной файл <code>main.tex</code>, чтобы компилятор сразу находил его по относительному пути.</p>'
            },
            {
                title: 'Интеграция в Labkeeper',
                html: '<p>В онлайн-редакторе Labkeeper вы можете загрузить CSV в файловый менеджер проекта и на лету видеть отрендренную таблицу с автоматическим расчетом промежуточных сумм.</p>'
            }
        ]
    },
    {
        slug: 'indirect-measurement-error-calculation-lab-report',
        batch: 2,
        title: 'Оформление расчетов погрешностей косвенных измерений',
        pageTitle: 'Косвенные измерения погрешности шаблон: расчет погрешностей в отчете — Labkeeper',
        metaDescription: 'Как оформить расчет погрешностей косвенных измерений в отчете по лабораторной работе. Готовый шаблон по ГОСТ, формулы частных производных и примеры в Labkeeper.',
        breadcrumbTitle: 'Погрешности косвенных измерений',
        h1: 'Оформление расчетов погрешностей косвенных измерений',
        categories: ['labs'],
        keywords: [
            'косвенные измерения погрешности шаблон',
            'как оформлять расчет погрешностей в отчете'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '8 мин',
        cardTitle: 'Погрешности косвенных измерений: формулы, правила округления и шаблон по ГОСТ',
        cardDescription: 'Метод частных производных и логарифмического дифференцирования: пошаговый расчет абсолютной и относительной погрешности для отчета.',
        sliderTitle: 'Погрешности косвенных измерений',
        sliderText: 'Шаблон расчета погрешностей косвенных измерений с частными производными.',
        sidebarText: 'В Labkeeper формулы дифференцирования и доверительных интервалов верстаются в аккуратные уравнения LaTeX с мгновенным PDF-рендером.',
        ctaTitle: 'Оформляйте физические расчеты в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор для студентов технических вузов: формулы amsmath, таблицы измерений и шаблоны оформления по ГОСТ.',
        toc: [
            { id: 'direct-vs-indirect', title: 'Прямые и косвенные измерения: в чем разница' },
            { id: 'math-theory', title: 'Формула полного дифференциала и метод частных производных' },
            { id: 'log-trick', title: 'Лайфхак логарифмирования для формул-произведений' },
            { id: 'step-by-step', title: 'Косвенные измерения погрешности: шаблон расчета плотности цилиндра' },
            { id: 'report-formatting', title: 'Как оформлять расчет погрешностей в отчете: правила округления по ГОСТ' }
        ],
        sections: [
            {
                id: 'direct-vs-indirect',
                title: 'Прямые и косвенные измерения: в чем разница',
                html: `                        <p>В лабораторном практикуме большинство физических величин невозможно измерить одним прибором напрямую. При <strong>прямом измерении</strong> значение считывается со шкалы прибора (длина линейкой, время секундомером, масса весами). При <strong>косвенном измерении</strong> искомая величина $y$ вычисляется по известной математической зависимости из нескольких напрямую измеренных аргументов: $y = f(x_1, x_2, \\dots, x_n)$.</p>
                        <p>Поскольку каждый аргумент $x_i$ содержит свою погрешность $\\Delta x_i$, итоговая погрешность результата накапливается по строгому закону переноса ошибок. Эти значения затем наглядно иллюстрируются на <a href="/blog/physics-lab-measurement-graphs-formatting-gost">графиках измерений с крестами погрешностей</a>.</p>`
            },
            {
                id: 'math-theory',
                title: 'Формула полного дифференциала и метод частных производных',
                html: `                        <p>Если независимые случайные погрешности аргументов малы, абсолютная погрешность косвенного измерения рассчитывается через <strong>квадратичную сумму частных производных</strong>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">Формула погрешности</span></div>
                            <pre><code>\\Delta y = \\sqrt{ \\left( \\frac{\\partial f}{\\partial x_1} \\Delta x_1 \\right)^2 + \\left( \\frac{\\partial f}{\\partial x_2} \\Delta x_2 \\right)^2 + \\dots + \\left( \\frac{\\partial f}{\\partial x_n} \\Delta x_n \\right)^2 }</code></pre>
                        </div>
                        <p>Если погрешности не являются случайными, а представляют собой предельные приборные погрешности, используют линейную сумму модулей производных: $\\Delta y = \\sum_{i=1}^n \\left| \\frac{\\partial f}{\\partial x_i} \\right| \\Delta x_i$.</p>`
            },
            {
                id: 'log-trick',
                title: 'Лайфхак логарифмирования для формул-произведений',
                html: `                        <p>Если расчетная формула состоит только из произведений, дробей и степеней (например, $y = \\frac{a^2 \\cdot b}{\\sqrt{c}}$), расчет через производные громоздок. Гораздо проще сначала найти <strong>относительную погрешность $\\varepsilon_y$ через натуральный логарифм</strong>:</p>
                        <ol>
                            <li>Прологарифмировать выражение: $\\ln y = 2\\ln a + \\ln b - \\frac{1}{2}\\ln c$;</li>
                            <li>Взять дифференциал и заменить знаки минуса на плюсы: $\\varepsilon_y = \\frac{\\Delta y}{y} = \\sqrt{ (2\\varepsilon_a)^2 + \\varepsilon_b^2 + \\left(\\frac{1}{2}\\varepsilon_c\\right)^2 }$;</li>
                            <li>Найти абсолютную погрешность умножением: $\\Delta y = y \\cdot \\varepsilon_y$.</li>
                        </ol>`
            },
            {
                id: 'step-by-step',
                title: 'Косвенные измерения погрешности: шаблон расчета плотности цилиндра',
                html: `                        <p>Рассмотрим эталонный образец, демонстрирующий <strong>косвенные измерения погрешности шаблон</strong> на примере вычисления плотности твердого тела:</p>
                        <div class="article-quote">
                            <p><strong>Пример расчета:</strong><br>
                            Формула плотности цилиндра: $\\rho = \\frac{m}{V} = \\frac{4m}{\\pi d^2 h}$, где масса $m = (124.50 \\pm 0.05)\\text{ г}$, диаметр $d = (20.12 \\pm 0.02)\\text{ мм}$, высота $h = (50.34 \\pm 0.05)\\text{ мм}$.<br><br>
                            1. Среднее значение плотности: $\\rho = \\frac{4 \\cdot 0.1245}{3.1416 \\cdot (0.02012)^2 \\cdot 0.05034} = 7780.4\\text{ кг/м}^3$.<br>
                            2. Относительная погрешность:<br>
                            $\\varepsilon_\\rho = \\sqrt{\\left(\\frac{\\Delta m}{m}\\right)^2 + \\left(2\\frac{\\Delta d}{d}\\right)^2 + \\left(\\frac{\\Delta h}{h}\\right)^2} = \\sqrt{(0.0004)^2 + (0.0020)^2 + (0.0010)^2} \\approx 0.00227$ ($0.23\\%$).<br>
                            3. Абсолютная погрешность: $\\Delta \\rho = \\rho \\cdot \\varepsilon_\\rho = 7780.4 \\cdot 0.00227 = 17.66\\text{ кг/м}^3$.</p>
                        </div>
                        <p>Итоговую расчетную запись переносят в соответствующий раздел в нашем <a href="/blog/ideal-lab-report-template-gost-online">шаблоне отчета по лабораторной работе</a>.</p>`
            },
            {
                id: 'report-formatting',
                title: 'Как оформлять расчет погрешностей в отчете: правила округления по ГОСТ',
                html: `                        <p>Изучая, <strong>как оформлять расчет погрешностей в отчете</strong>, соблюдайте золотое правило округления ГОСТ 8.207-76:</p>
                        <ul>
                            <li>Погрешность $\\Delta y$ округляется до <strong>одной значащей цифры</strong> (если первая цифра от 3 до 9) или до <strong>двух значащих цифр</strong> (если первая цифра 1 или 2). В нашем примере: $\\Delta \\rho = 17.66 \\approx 18\\text{ кг/м}^3$;</li>
                            <li>Сам результат округляется до того же десятичного разряда, что и погрешность: $\\rho = (7780 \\pm 18)\\text{ кг/м}^3$;</li>
                            <li>Обязательно приводится относительная погрешность в процентах: $\\varepsilon = 0.23\\%$.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Сначала вычисляйте формулу в общем виде',
                html: '<p>Преподаватели требуют сначала вывести символьную формулу погрешности через производные, и только затем подставлять численные значения измерений.</p>'
            },
            {
                title: 'Оформление формул в Labkeeper',
                html: '<p>В Labkeeper вы можете быстро набрать многоэтажные формулы погрешностей через окружение <code>align*</code> с автоматическим выравниванием по знаку равенства.</p>'
            }
        ]
    },
    {
        slug: 'resume-language-skills-cefr-scale-a1-c2',
        batch: 2,
        title: 'Раздел «Языки» в резюме: правильная европейская шкала (A1-C2)',
        pageTitle: 'Оформление языков в резюме A1 C2: уровень владения языком в CV — Labkeeper',
        metaDescription: 'Как правильно оформить знание иностранных языков в резюме по общеевропейской шкале CEFR (A1-C2). Уровень владения языком в CV шаблон и сертификаты в Labkeeper.',
        breadcrumbTitle: 'Языки в резюме (Шкала CEFR)',
        h1: 'Раздел «Языки» в&nbsp;резюме: правильная европейская шкала (A1-C2)',
        categories: ['cv'],
        keywords: [
            'оформление языков в резюме a1 c2',
            'уровень владения языком в cv шаблон'
        ],
        datePublished: '2026-09-06',
        dateModified: '2026-09-06',
        readingTime: '7 мин',
        cardTitle: 'Раздел «Языки» в резюме: градация CEFR (A1–C2) и международные сертификаты',
        cardDescription: 'Почему формулировка «читаю со словарем» отпугивает HR, как правильно указывать уровни владения языком и международные экзамены (IELTS, TOEFL).',
        sliderTitle: 'Языки в резюме (Шкала CEFR)',
        sliderText: 'Как грамотно указать уровни языков A1-C2 в резюме для зарубежных и РФ компаний.',
        sidebarText: 'В Labkeeper вы найдете лаконичные блоки для перечисления языков и навыков с аккуратным экспортом в ATS-friendly PDF.',
        ctaTitle: 'Составьте международное резюме в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор с поддержкой латиницы, кириллицы, Markdown-разметки и стильными темами для успешного трудоустройства.',
        toc: [
            { id: 'why-cefr', title: 'Почему субъективные описания языков больше не работают' },
            { id: 'cefr-breakdown', title: 'Оформление языков в резюме A1 C2: подробная расшифровка уровней' },
            { id: 'template-snippet', title: 'Уровень владения языком в CV: шаблон в Markdown и тексте' },
            { id: 'certificates', title: 'Международные языковые сертификаты: IELTS, TOEFL, Cambridge' },
            { id: 'it-english', title: 'Специфика Technical English для IT-специалистов' }
        ],
        sections: [
            {
                id: 'why-cefr',
                title: 'Почему субъективные описания языков больше не работают',
                html: `                        <p>Фразы вроде <em>«английский базовый»</em>, <em>«читаю техническую литературу со словарем»</em> или <em>«свободный разговорный»</em> вызывают у профессиональных рекрутеров лишь недоумение. Для одного кандидата «свободный» означает способность поддержать беседу о погоде, а для другого — проведение часовых переговоров с техническими директорами из США.</p>
                        <p>Чтобы избежать двусмысленности, международные компании и топовые российские работодатели используют единый мировой стандарт — <strong>Общеевропейскую шкалу языковой компетенции CEFR (Common European Framework of Reference)</strong>. Особенно важно точно сформулировать владение языком при отправке отклика с <a href="/blog/how-to-write-it-cover-letter-structure-template">сопроводительным письмом Cover Letter на английском</a>.</p>`
            },
            {
                id: 'cefr-breakdown',
                title: 'Оформление языков в резюме A1 C2: подробная расшифровка уровней',
                html: `                        <p>Грамотное <strong>оформление языков в резюме a1 c2</strong> требует точного понимания градаций:</p>
                        <ul>
                            <li><strong>A1 (Beginner) / A2 (Elementary):</strong> элементарное владение. Понимание базовых табличек и простых фраз. В профессиональном IT-резюме обычно не указывается (исключение — редкие языки вроде немецкого или японского, если вы только начали их учить);</li>
                            <li><strong>B1 (Intermediate):</strong> пороговый уровень. Способность понимать техническую документацию, переписываться в Slack и Jira с онлайн-переводчиком, участвовать в простых синхронах;</li>
                            <li><strong>B2 (Upper-Intermediate):</strong> уверенный рабочий уровень (Professional Working Proficiency). Свободное участие в ежедневных митингах, защита архитектурных решений, прохождение технических интервью на английском языке. Золотой стандарт для найма в международные команды;</li>
                            <li><strong>C1 (Advanced):</strong> профессиональное владение. Способность вести сложные переговоры, шутить, понимать акценты и писать научные статьи без помощи редакторов;</li>
                            <li><strong>C2 (Proficiency):</strong> владение на уровне образованного носителя языка (Near-native);</li>
                            <li><strong>Native / Bilingual:</strong> родной язык.</li>
                        </ul>`
            },
            {
                id: 'template-snippet',
                title: 'Уровень владения языком в CV: шаблон в Markdown и тексте',
                html: `                        <p>Используйте этот лаконичный <strong>уровень владения языком в cv шаблон</strong> для раздела навыков:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">Markdown Секция языков</span></div>
                            <pre><code>## Languages
- **Russian:** Native
- **English:** B2 — Upper-Intermediate (Fluent technical & conversational, daily international team standups)
- **German:** A2 — Elementary (Basic comprehension, actively learning)</code></pre>
                        </div>
                        <p>Если вы оптимизируете свое <a href="/blog/frontend-backend-developer-resume-tech-stack-ats">резюме разработчика под ATS-фильтры</a>, то компактный маркированный список языков распознается поисковыми алгоритмами без малейших искажений.</p>
                        <p>Если в вашем резюме используется двухколоночная таблица навыков:</p>
                        <div class="article-table-wrap">
                            <table class="article-table">
                                <thead>
                                    <tr>
                                        <th>Язык</th>
                                        <th>Уровень по CEFR</th>
                                        <th>Пояснение</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Русский</td>
                                        <td>Native</td>
                                        <td>Родной язык</td>
                                    </tr>
                                    <tr>
                                        <td>Английский</td>
                                        <td>B2 (Upper-Intermediate)</td>
                                        <td>Свободное ведение деловой и технической переписки</td>
                                    </tr>
                                    <tr>
                                        <td>Французский</td>
                                        <td>B1 (Intermediate)</td>
                                        <td>Чтение специализированной литературы</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`
            },
            {
                id: 'certificates',
                title: 'Международные языковые сертификаты: IELTS, TOEFL, Cambridge',
                html: `                        <p>Если вы сдавали официальные стандартизированные тесты, обязательно укажите балл и год сдачи:</p>
                        <ul>
                            <li><code>English: C1 — Advanced (IELTS Academic 7.5, 2023)</code>;</li>
                            <li><code>English: B2 (TOEFL iBT 92, 2024)</code>;</li>
                            <li><code>German: B2 (Goethe-Zertifikat B2)</code>.</li>
                        </ul>
                        <p>Наличие сертификата мгновенно снимает любые сомнения рекрутера в вашей языковой квалификации.</p>`
            },
            {
                id: 'it-english',
                title: 'Специфика Technical English для IT-специалистов',
                html: `                        <p>Для разработчиков часто допустима формулировка <em>«Working Technical Proficiency»</em>, если вы читаете исходники и RFC документацию без затруднений, но устная речь требует небольшой практики. Честность на скрининге всегда ценится выше завышенных ожиданий.</p>`
            }
        ],
        tips: [
            {
                title: 'Не завышайте свой реальный уровень',
                html: '<p>Если вы укажете уровень C1, англоязычный HR может без предупреждения переключить собеседование на английский язык с первой секунды звонка.</p>'
            },
            {
                title: 'Верстка резюме в Labkeeper',
                html: '<p>В Labkeeper блок языков форматируется в компактную и аккуратную плашку с маркированным списком, идеально вписывающуюся в общее резюме.</p>'
            }
        ]
    }
];
