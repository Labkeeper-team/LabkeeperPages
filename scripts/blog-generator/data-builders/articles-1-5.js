module.exports = [
    {
        slug: 'latex-pgfplots-function-graphs',
        batch: 2,
        title: 'Вставка точных графиков функций с помощью пакета pgfplots',
        pageTitle: 'Построение графиков функций LaTeX pgfplots: график по точкам онлайн — Labkeeper',
        metaDescription: 'Полный гайд: построение графиков функций в LaTeX через pgfplots и график по точкам онлайн. Настройка осей, стилей, легенды и формул в Labkeeper.',
        breadcrumbTitle: 'Графики pgfplots в LaTeX',
        h1: 'Вставка точных графиков функций с&nbsp;помощью пакета pgfplots',
        categories: ['latex'],
        keywords: [
            'построение графиков функций latex pgfplots',
            'график по точкам latex онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '8 мин',
        cardTitle: 'Построение графиков функций в LaTeX: руководство по пакету pgfplots',
        cardDescription: 'Как строить векторные графики математических функций, строить кривые по точкам из таблиц данных, кастомизировать оси, сетку и легенду.',
        sliderTitle: 'Точные графики с pgfplots в LaTeX',
        sliderText: 'Векторные математические функции, графики по точкам и полная кастомизация осей.',
        sidebarText: 'Создавайте чистые векторные графики pgfplots в онлайн-редакторе Labkeeper с мгновенной PDF-компиляцией без установки TeX Live.',
        ctaTitle: 'Стройте точные графики в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с поддержкой пакета pgfplots, моментальным предпросмотром графиков и автоматическим экспортом в PDF.',
        toc: [
            { id: 'intro', title: 'Зачем использовать pgfplots вместо растровых картинок' },
            { id: 'setup', title: 'Подключение pgfplots и базовое окружение axis' },
            { id: 'functions', title: 'Построение графиков функций latex pgfplots: математические выражения' },
            { id: 'points', title: 'График по точкам latex онлайн: импорт координат и таблиц' },
            { id: 'styling', title: 'Стилизация: сетка grid, подписи осей и легенда' },
            { id: 'faq', title: 'Типичные проблемы и оптимизация компиляции' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Зачем использовать pgfplots вместо растровых картинок',
                html: `                        <p>При подготовке курсовых, дипломных и научных публикаций графики, экспортированные из Excel или сторонних программ в формате PNG/JPG, часто выглядят размытыми или теряют читаемость при масштабировании. Пакет <strong>pgfplots</strong> генерирует <em>истинно векторную графику</em> прямо во время компиляции документа LaTeX.</p>
                        <p>Все шрифты подписей, засечек и легенды идеально согласуются с гарнитурой основного текста документа, а формулы рендерятся стандартным математическим движком TeX (подробные правила набора уравнений смотрите в нашем <a href="/blog/latex-formulas">руководстве по формулам amsmath в LaTeX</a>).</p>`
            },
            {
                id: 'setup',
                title: 'Подключение pgfplots и базовое окружение axis',
                html: `                        <p>Для работы подключите пакет в преамбуле документа и зафиксируйте уровень совместимости (рекомендуется <code>compat=1.18</code> или новее):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}</code></pre>
                        </div>
                        <p>Внутри документа график размещается внутри окружения <code>tikzpicture</code> с использованием блока <code>axis</code> (а если вам требуется компактно встроить иллюстрацию в середину текста, рекомендуем ознакомиться с <a href="/blog/latex-wrapfig-text-flow">обтеканием картинок текстом wrapfig</a>):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{figure}[htbp]
    \\centering
    \\begin{tikzpicture}
        \\begin{axis}[
            width=10cm, height=6cm,
            xlabel={$x$},
            ylabel={$y$},
            grid=major
        ]
            \\addplot[color=blue, thick, domain=-2*pi:2*pi, samples=150] {sin(deg(x))};
            \\addlegendentry{$\\sin(x)$}
        \\end{axis}
    \\end{tikzpicture}
    \\caption{График тригонометрической функции}
    \\label{fig:sin-plot}
\\end{figure}</code></pre>
                        </div>`
            },
            {
                id: 'functions',
                title: 'Построение графиков функций latex pgfplots: математические выражения',
                html: `                        <p>Грамотное <strong>построение графиков функций latex pgfplots</strong> позволяет задавать алгебраические, показательные, логарифмические и кусочно-непрерывные зависимости. При использовании тригонометрических функций (например, <code>sin</code> или <code>cos</code>) аргумент по умолчанию интерпретируется в градусах, поэтому для радианов применяется функция <code>deg(x)</code>.</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{axis}[
    xmin=-3, xmax=3,
    ymin=-1, ymax=10,
    axis lines = middle,
    xlabel={$x$}, ylabel={$f(x)$},
    legend pos=north west
]
    \\addplot[color=red, domain=-3:3, samples=100, ultra thick] {x^2 + 1};
    \\addlegendentry{$f(x) = x^2 + 1$}

    \\addplot[color=teal, dashed, domain=-3:3, samples=100, thick] {exp(x)};
    \\addlegendentry{$f(x) = e^x$}
\\end{axis}</code></pre>
                        </div>
                        <p>Параметр <code>samples</code> задает частоту дискретизации. Для гладких парабол и прямых достаточно 50–100 точек, для высокочастотных колебаний значение увеличивают до 200–300.</p>`
            },
            {
                id: 'points',
                title: 'График по точкам latex онлайн: импорт координат и таблиц',
                html: `                        <p>Для экспериментальных исследований и лабораторных измерений требуется построить <strong>график по точкам latex онлайн</strong> с погрешностями или маркерами измерений. Координаты можно передать непосредственно в коде или считать из файла <code>.csv</code>/<code>.dat</code>.</p>
                        <p>Пример построения точек вручную с помощью команды <code>coordinates</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{axis}[
    xlabel={Температура $T$, $^\\circ\\text{C}$},
    ylabel={Давление $P$, кПа},
    scatter,
    only marks,
    mark=square*,
    mark size=2.5pt
]
    \\addplot coordinates {
        (20, 101.3)
        (30, 104.2)
        (40, 108.1)
        (50, 112.5)
        (60, 117.8)
    };
    \\addlegendentry{Эксперимент}
\\end{axis}</code></pre>
                        </div>
                        <p>Если данные хранятся во внешнем файле (например, <code>measurements.csv</code>), используется директива <code>\\addplot table[x=T, y=P, col sep=comma] {measurements.csv};</code>, что избавляет от ручного набора сотен строк.</p>`
            },
            {
                id: 'styling',
                title: 'Стилизация: сетка grid, подписи осей и легенда',
                html: `                        <p>Для соответствия ГОСТ и публикационным требованиям научных журналов настройте оформление координатных осей:</p>
                        <ul>
                            <li><code>grid=both</code> или <code>grid=major</code> — отображение основной или вспомогательной координатной сетки.</li>
                            <li><code>axis lines = left</code> (или <code>box</code>, <code>middle</code>) — классическая рамка графика или пересекающиеся в нуле оси.</li>
                            <li><code>tick label style={font=\\small}</code> — единый кегль цифр на делениях.</li>
                            <li><code>legend style={at={(0.95,0.05)}, anchor=south east}</code> — точное позиционирование блока легенды.</li>
                        </ul>`
            },
            {
                id: 'faq',
                title: 'Типичные проблемы и оптимизация компиляции',
                html: `                        <p>Сложные графики с тысячами точек могут замедлять компиляцию документа. Чтобы ускорить сборку:</p>
                        <ul>
                            <li>Используйте пакет <code>\\usepgfplotslibrary{external}</code> и команду <code>\\tikzexternalize</code> для кэширования отрисованных фигур в отдельные PDF-файлы.</li>
                            <li>Не завышайте <code>samples</code> без необходимости: 100–150 точек визуально неотличимы от 1000 для большинства аналитических функций.</li>
                            <li>В веб-редакторе <strong>Labkeeper</strong> компиляция происходит на оптимизированном бэкенде, что обеспечивает быстрый рендеринг даже насыщенных графиков.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Планки погрешностей (Error Bars)',
                html: '<p>Для отображения доверительных интервалов добавьте <code>error bars/y dir=both, error bars/y explicit</code> к команде <code>\\addplot</code> и передайте значения погрешности через координаты <code>+- (dy)</code>.</p>'
            },
            {
                title: 'Логарифмические шкалы',
                html: '<p>Для амплитудно-частотных характеристик и графиков в логарифмическом масштабе замените окружение <code>axis</code> на <code>semilogyaxis</code> (лог по Y) или <code>loglogaxis</code> (лог по обеим осям).</p>'
            }
        ]
    },
    {
        slug: 'latex-xcolor-text-background',
        batch: 2,
        title: 'Работа с цветом текста, ячеек и фона в LaTeX (пакет xcolor)',
        pageTitle: 'Цвет текста в LaTeX xcolor: цветная таблица онлайн — Labkeeper',
        metaDescription: 'Как изменить цвет текста в LaTeX через пакет xcolor, создать цветную таблицу онлайн, настроить фон ячеек и строк. Пошаговые примеры кода.',
        breadcrumbTitle: 'Цвет текста и таблиц (xcolor)',
        h1: 'Работа с&nbsp;цветом текста, ячеек и&nbsp;фона в&nbsp;LaTeX (пакет xcolor)',
        categories: ['latex'],
        keywords: [
            'как изменить цвет текста в latex xcolor',
            'цветная таблица latex онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '7 мин',
        cardTitle: 'Работа с цветом в LaTeX: текст, фон и ячейки таблиц через xcolor',
        cardDescription: 'Подробное руководство по пакету xcolor: как изменить цвет текста, подсветить строки и ячейки таблиц, задать RGB/HEX оттенки и избежать ошибок печати.',
        sliderTitle: 'Цвет текста и таблиц в LaTeX',
        sliderText: 'Пакет xcolor, цветные таблицы, фон ячеек и градиенты в академических документах.',
        sidebarText: 'Поддерживайте единый цветовой стиль научных документов и презентаций в веб-редакторе Labkeeper.',
        ctaTitle: 'Оформляйте стильные документы в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с поддержкой пакета xcolor, подсветкой синтаксиса и точной передачей цветов в финальном PDF.',
        toc: [
            { id: 'intro', title: 'Возможности пакета xcolor' },
            { id: 'setup', title: 'Подключение и опции пакета' },
            { id: 'text-color', title: 'Как изменить цвет текста в latex xcolor: основные команды' },
            { id: 'table-color', title: 'Цветная таблица latex онлайн: фон ячеек и зебра строк' },
            { id: 'custom-colors', title: 'Создание собственных оттенков: RGB, CMYK и HTML-HEX' },
            { id: 'faq', title: 'Советы по подготовке к черно-белой печати' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Возможности пакета xcolor',
                html: `                        <p>По умолчанию LaTeX ориентирован на монохромную полиграфию. Однако в презентациях (Beamer), отчетах по грантам, методических материалах и цветных публикациях использование акцентных цветов помогает структурировать внимание читателя (особенно если вы используете палитры для <a href="/blog/latex-tcolorbox-theorems-callouts">оформления блоков и теорем в tcolorbox</a>).</p>
                        <p>Стандартом для работы с цветом является пакет <strong>xcolor</strong>. Он позволяет окрашивать отдельные слова, целые блоки, фоны абзацев, а также создавать контрастные цветные таблицы с автоматическим чередованием строк.</p>`
            },
            {
                id: 'setup',
                title: 'Подключение и опции пакета',
                html: `                        <p>Чтобы получить доступ к расширенным палитрам и поддержке таблиц, пакет подключается со специальными опциями:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage[table,dvipsnames]{xcolor}</code></pre>
                        </div>
                        <p>Опция <code>table</code> загружает вспомогательный модуль для работы со средами <code>tabular</code> и <code>longtable</code>, а <code>dvipsnames</code> добавляет более 60 выразительных именных оттенков (NavyBlue, ForestGreen, Maroon, BurntOrange).</p>`
            },
            {
                id: 'text-color',
                title: 'Как изменить цвет текста в latex xcolor: основные команды',
                html: `                        <p>Существует два базовых способа, <strong>как изменить цвет текста в latex xcolor</strong>:</p>
                        <ul>
                            <li><code>\\textcolor{имя_цвета}{текст}</code> — окрашивает только фрагмент текста внутри фигурных скобок.</li>
                            <li><code>{\\color{имя_цвета} текст}</code> — переключает текущий цвет для всей локальной группы.</li>
                        </ul>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>Это обычный текст, а это \\textcolor{red}{важное предупреждение}.

\\colorbox{yellow}{\\textbf{Внимание:}} данный параметр необратим!

\\fcolorbox{blue}{lightgray}{Текст в цветной рамке на сером фоне.}</code></pre>
                        </div>
                        <p>Команда <code>\\colorbox</code> заливает фон под текстом, а <code>\\fcolorbox</code> дополнительно создает цветную границу вокруг выделенного блока.</p>`
            },
            {
                id: 'table-color',
                title: 'Цветная таблица latex онлайн: фон ячеек и зебра строк',
                html: `                        <p>С помощью опции <code>table</code> создается удобная для восприятия <strong>цветная таблица latex онлайн</strong> с эффектом «зебры» (чередующиеся строки) или выделением итоговых значений.</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{table}[htbp]
    \\centering
    \\rowcolors{2}{gray!15}{white} % Начиная со строки 2, чередовать светлый серый и белый
    \\begin{tabular}{|l|c|r|}
        \\hline
        \\rowcolor{NavyBlue} % Заливка строки заголовка
        \\textcolor{white}{\\textbf{Параметр}} & \\textcolor{white}{\\textbf{Значение}} & \\textcolor{white}{\\textbf{Статус}} \\\\
        \\hline
        Напряжение & 220 В & В норме \\\\
        Сила тока & 4.8 А & В норме \\\\
        Температура & \\cellcolor{red!25} 92 $^\\circ$C & \\textbf{Перегрев} \\\\
        Сопротивление & 45.8 Ом & В норме \\\\
        \\hline
    \\end{tabular}
    \\caption{Журнал телеметрии стенда}
\\end{table}</code></pre>
                        </div>
                        <p>Команда <code>\\cellcolor{цвет}</code> красит отдельную ячейку, а запись вида <code>red!25</code> означает смесь: 25% насыщенного красного и 75% белого цвета (пастельный оттенок).</p>`
            },
            {
                id: 'custom-colors',
                title: 'Создание собственных оттенков: RGB, CMYK и HTML-HEX',
                html: `                        <p>Если корпоративный стиль или требования журнала предписывают конкретные оттенки, их легко объявить в преамбуле через <code>\\definecolor</code> (подробнее об этом читайте в материале о <a href="/blog/latex-custom-rgb-hex-colors-xcolor">пользовательских цветах RGB и HEX в LaTeX</a>):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>% По HTML-коду HEX
\\definecolor{BrandBlue}{HTML}{1A73E8}

% По модели RGB (значения от 0 до 1)
\\definecolor{ForestDark}{rgb}{0.08, 0.38, 0.15}

% По модели CMYK для профессиональной типографии
\\definecolor{PrintNavy}{cmyk}{0.9, 0.7, 0.1, 0.2}</code></pre>
                        </div>
                        <p>После объявления созданный цвет используется наравне со стандартными: <code>\\textcolor{BrandBlue}{Фирменный текст}</code>.</p>`
            },
            {
                id: 'faq',
                title: 'Советы по подготовке к черно-белой печати',
                html: `                        <p>Если работа будет распечатываться на монохромном принтере:</p>
                        <ul>
                            <li>Избегайте слишком светлых шрифтов (желтый, салатовый), они станут невидимыми на белой бумаге.</li>
                            <li>Для заливок фона используйте процентные градации серого: <code>gray!10</code> или <code>gray!20</code>.</li>
                            <li>Проверяйте контрастность: темный текст должен находиться исключительно на светлом фоне, а белый — на плотно залитом фоне.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Устранение конфликта с пакетом tabularx',
                html: '<p>Всегда подключайте <code>\\usepackage[table]{xcolor}</code> <em>до</em> пакетов <code>tabularx</code> или <code>colortbl</code>, чтобы избежать ошибки <code>Option clash for package xcolor</code>.</p>'
            },
            {
                title: 'Прозрачность и смешивание',
                html: '<p>Синтаксис <code>blue!40!red</code> создает плавное смешивание 40% синего и 60% красного цвета без необходимости высчитывать RGB вручную.</p>'
            }
        ]
    },
    {
        slug: 'latex-wrapfig-text-flow',
        batch: 2,
        title: 'Обертывание текста вокруг картинок в LaTeX (пакет wrapfig)',
        pageTitle: 'Обтекание картинок текстом в LaTeX wrapfig сбоку от текста — Labkeeper',
        metaDescription: 'Как настроить обтекание картинки текстом в LaTeX через пакет wrapfig: размещение иллюстрации сбоку, параметры r, l, устранение наложений и примеры.',
        breadcrumbTitle: 'Обтекание картинок (wrapfig)',
        h1: 'Обертывание текста вокруг картинок в&nbsp;LaTeX (пакет wrapfig)',
        categories: ['latex'],
        keywords: [
            'текст вокруг картинки обтекание latex',
            'картинка сбоку от текста latex wrapfig'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '6 мин',
        cardTitle: 'Обтекание картинок текстом в LaTeX: руководство по пакету wrapfig',
        cardDescription: 'Как расположить компактную иллюстрацию справа или слева от текста, настроить точную ширину врезки и избежать смещения абзацев в LaTeX.',
        sliderTitle: 'Обтекание текста картинкой в LaTeX',
        sliderText: 'Пакет wrapfig, позиционирование картинок справа и слева от абзаца.',
        sidebarText: 'Вставляйте иллюстрации с аккуратным обтеканием текста прямо в онлайн-редакторе Labkeeper с мгновенным PDF-рендерингом.',
        ctaTitle: 'Вставляйте графику в&nbsp;Labkeeper без сбоев',
        ctaText: 'Онлайн-редактор LaTeX с визуальным предпросмотром страниц и поддержкой всех пакетов для типографики.',
        toc: [
            { id: 'intro', title: 'Когда требуется обтекание текстом' },
            { id: 'syntax', title: 'Базовый синтаксис окружения wrapfigure' },
            { id: 'alignment', title: 'Текст вокруг картинки обтекание latex: выравнивание слева и справа' },
            { id: 'lines', title: 'Картинка сбоку от текста latex wrapfig: ручной контроль высоты врезки' },
            { id: 'troubleshooting', title: 'Типичные ошибки и способы их решения' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Когда требуется обтекание текстом',
                html: `                        <p>В стандартном LaTeX плавающие окружения <code>figure</code> занимают всю ширину полосы набора. Если иллюстрация имеет небольшой размер (портрет автора, схема пина микроконтроллера, компактный логотип), пустое пространство по бокам выглядит неаккуратно (альтернативный способ компоновки графики — <a href="/blog/latex-minipage-images-tables-side-by-side">размещение картинок рядом через minipage</a>).</p>
                        <p>Пакет <strong>wrapfig</strong> реализует журнальную верстку, при которой <strong>текст вокруг картинки обтекание latex</strong> формируется плавно, заполняя свободную площадь страницы и экономя вертикальное пространство документа.</p>`
            },
            {
                id: 'syntax',
                title: 'Базовый синтаксис окружения wrapfigure',
                html: `                        <p>Подключите пакет в преамбуле: <code>\\usepackage{wrapfig}</code>. Вставка иллюстрации осуществляется через специальное окружение <code>wrapfigure</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{wrapfigure}{r}{0.38\\textwidth}
    \\centering
    \\includegraphics[width=0.34\\textwidth]{device.png}
    \\caption{Внешний вид датчика}
    \\label{fig:sensor}
\\end{wrapfigure}
Здесь начинается текст абзаца, который будет обтекать рисунок слева. 
Важно помещать блок wrapfigure непосредственно перед началом абзаца...</code></pre>
                        </div>
                        <p>Окружение принимает два обязательных параметра: позицию (<code>r</code> — справа, <code>l</code> — слева) и выделяемую ширину врезки (например, <code>0.38\\textwidth</code> или <code>5cm</code>).</p>`
            },
            {
                id: 'alignment',
                title: 'Текст вокруг картинки обтекание latex: выравнивание слева и справа',
                html: `                        <p>Позиционирование задается символом регистра:</p>
                        <ul>
                            <li><code>r</code> / <code>l</code> — строчные буквы фиксируют рисунок строго у правого или левого края текущей страницы.</li>
                            <li><code>R</code> / <code>L</code> — заглавные буквы указывают LaTeX, что рисунок является «плавающим» (если места в абзаце недостаточно, фигура сдвинется).</li>
                            <li><code>o</code> / <code>i</code> — для двусторонней печати (книжная верстка): <code>o</code> (снаружи, outer margin), <code>i</code> (внутри, inner margin).</li>
                        </ul>
                        <p>Для большинства учебных и научных отчетов стандартом является строчная буква <code>r</code> (картинка прижата к правому полю набора).</p>`
            },
            {
                id: 'lines',
                title: 'Картинка сбоку от текста latex wrapfig: ручной контроль высоты врезки',
                html: `                        <p>Когда создается <strong>картинка сбоку от текста latex wrapfig</strong>, алгоритм TeX не всегда точно рассчитывает количество суженных строк, из-за чего следующий абзац или подзаголовок может «наехать» на подрисуночную подпись.</p>
                        <p>Для исправления передайте опциональный параметр количества строк в квадратных скобках перед позицией:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{wrapfigure}[14]{r}{6cm}
    \\centering
    \\includegraphics[width=5.5cm]{chart.pdf}
    \\caption{Характеристика АЧХ}
\\end{wrapfigure}</code></pre>
                        </div>
                        <p>Число <code>[14]</code> принудительно зарезервирует ровно 14 строк текста под ширину врезки, гарантируя, что последующий текст начнется ровно под иллюстрацией (а требования к подписям и структуре нумерации смотрите в статье о <a href="/blog/figure-double-numbering-chapters-gost">нумерации рисунков по главам по ГОСТ</a>).</p>`
            },
            {
                id: 'troubleshooting',
                title: 'Типичные ошибки и способы их решения',
                html: `                        <p>При использовании wrapfig соблюдайте следующие правила:</p>
                        <ul>
                            <li><strong>Не ставьте wrapfig внутри списков:</strong> окружения <code>enumerate</code> и <code>itemize</code> нарушают расчет ширины строк. Размещайте картинку строго перед началом списка в сплошном абзаце.</li>
                            <li><strong>Не разрывайте абзац перед wrapfig:</strong> не оставляйте пустую строку между <code>\\end{wrapfigure}</code> и первым словом текста.</li>
                            <li><strong>Избегайте близости к концу страницы:</strong> если до конца страницы осталось меньше трети высоты полосы, картинка вылетит на следующее поле. В таких случаях используйте стандартный <code>figure[htbp]</code>.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Точные поля вокруг картинки',
                html: '<p>Длина <code>\\setlength{\\columnsep}{15pt}</code> регулирует горизонтальный отступ между телом иллюстрации и обтекающим текстом.</p>'
            },
            {
                title: 'Обтекание таблиц',
                html: '<p>Пакет также предоставляет парное окружение <code>wraptable</code>, позволяющее точно так же оборачивать текстом небольшие компактные таблицы.</p>'
            }
        ]
    },
    {
        slug: 'latex-draftwatermark',
        batch: 2,
        title: 'Наложение водяных знаков и надписи «Черновик» на страницы LaTeX',
        pageTitle: 'Водяной знак Черновик в LaTeX: пакет draftwatermark онлайн — Labkeeper',
        metaDescription: 'Как сделать водяной знак черновик на фоне LaTeX страниц. Подключение пакета draftwatermark онлайн, настройка цвета, прозрачности, угла и масштаба.',
        breadcrumbTitle: 'Водяные знаки (draftwatermark)',
        h1: 'Наложение водяных знаков и&nbsp;надписи «Черновик» на&nbsp;страницы LaTeX',
        categories: ['latex'],
        keywords: [
            'водяной знак черновик на фоне latex',
            'пакет draftwatermark онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '6 мин',
        cardTitle: 'Водяной знак «Черновик» в LaTeX: настройка пакета draftwatermark',
        cardDescription: 'Как наложить полупрозрачную фоновую надпись «Черновик», DRAFT или логотип на страницы документа LaTeX, настроить масштаб, цвет и угол поворота.',
        sliderTitle: 'Водяные знаки в LaTeX (draftwatermark)',
        sliderText: 'Фоновые надписи «Черновик», конфиденциальные метки и настройка прозрачности.',
        sidebarText: 'Добавляйте водяные знаки для рецензирования и проверки черновиков прямо в браузере с Labkeeper.',
        ctaTitle: 'Готовьте чистые черновики в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с возможностью быстрой сборки промежуточных версий документов с водяными знаками и защитой авторства.',
        toc: [
            { id: 'intro', title: 'Для чего нужны водяные знаки' },
            { id: 'setup', title: 'Подключение и базовое использование draftwatermark' },
            { id: 'custom-text', title: 'Водяной знак черновик на фоне latex: кириллица, угол и цвет' },
            { id: 'advanced-options', title: 'Пакет draftwatermark онлайн: масштабирование и позиция' },
            { id: 'single-page', title: 'Как показать знак только на первой странице' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Для чего нужны водяные знаки',
                html: `                        <p>На этапе согласования диссертаций, курсовых проектов или корпоративных отчетов важно однозначно указать статус документа (особенно при многократных вычитках перед <a href="/blog/latex-dissertation">защитой диссертации в LaTeX</a>). Фоновая надпись предотвращает случайную отправку предварительной версии в печать или публикацию.</p>
                        <p>Фоновый <strong>водяной знак черновик на фоне latex</strong> рендерится под основным текстом, не перекрывая формулы и таблицы, но оставаясь четко различимым при чтении как на экране, так и на распечатанном листе.</p>`
            },
            {
                id: 'setup',
                title: 'Подключение и базовое использование draftwatermark',
                html: `                        <p>Самым простым и современным решением является <strong>пакет draftwatermark онлайн</strong>. В новых версиях TeX Live (начиная с 2020 года) он использует синтаксис <code>\\DraftwatermarkOptions</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{draftwatermark}

% По умолчанию выводит полупрозрачное слово DRAFT по центру каждой страницы</code></pre>
                        </div>
                        <p>При базовом подключении на каждой странице под углом 45 градусов появится серая надпись «DRAFT». Для русскоязычных документов надпись кастомизируют.</p>`
            },
            {
                id: 'custom-text',
                title: 'Водяной знак черновик на фоне latex: кириллица, угол и цвет',
                html: `                        <p>Чтобы вывести надпись «ЧЕРНОВИК» или «НЕ ДЛЯ ПУБЛИКАЦИИ», задайте параметры в преамбуле документа:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\usepackage{xcolor}
\\usepackage{draftwatermark}

\\DraftwatermarkOptions{
    text={ЧЕРНОВИК},
    angle=45,
    scale=0.8,
    color={[gray]{0.88}} % Светло-серый цвет
}</code></pre>
                        </div>
                        <p>Параметр <code>color</code> принимает любую цветовую модель: от градаций серого <code>[gray]{0.85}</code> до пастельного красного <code>red!20</code>.</p>`
            },
            {
                id: 'advanced-options',
                title: 'Пакет draftwatermark онлайн: масштабирование и позиция',
                html: `                        <p>С помощью дополнительных опций можно управлять геометрией отображения метки:</p>
                        <ul>
                            <li><code>scale=0.6</code> — относительный масштаб шрифта относительно ширины листа бумаги.</li>
                            <li><code>angle=0</code> — горизонтальное расположение (например, в сочетании с оформлением <a href="/blog/latex-fancyhdr">верхних и нижних колонтитулов fancyhdr</a>).</li>
                            <li><code>hpos=0.5\\paperwidth, vpos=0.5\\paperheight</code> — привязка центра надписи к абсолютным координатам страницы.</li>
                        </ul>`
            },
            {
                id: 'single-page',
                title: 'Как показать знак только на первой странице',
                html: `                        <p>Если водяной знак требуется отобразить исключительно на титульном листе или первой странице препринта, используется специальная команда:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\DraftwatermarkOptions{firstpageonly=true}</code></pre>
                        </div>
                        <p>А при финальной компиляции чистовика достаточно добавить одну команду <code>\\DraftwatermarkOptions{show=false}</code>, чтобы мгновенно скрыть водяной знак во всем документе без удаления преамбулы.</p>`
            }
        ],
        tips: [
            {
                title: 'Вставка картинки вместо текста',
                html: '<p>Пакет позволяет использовать векторный логотип организации вместо текста: <code>text={\\includegraphics[width=0.6\\paperwidth]{logo.pdf}}</code>.</p>'
            },
            {
                title: 'Исключение конфликтов с hyperref',
                html: '<p>Подключайте <code>draftwatermark</code> после пакета <code>xcolor</code>, но до <code>hyperref</code>, чтобы гарантировать корректный Z-индекс слоев в PDF.</p>'
            }
        ]
    },
    {
        slug: 'latex-forest-trees',
        batch: 2,
        title: 'Построение красивых генеалогических и синтаксических деревьев (пакет forest)',
        pageTitle: 'Нарисовать дерево в LaTeX пакет forest: синтаксическое дерево онлайн — Labkeeper',
        metaDescription: 'Построение деревьев в LaTeX с помощью пакета forest: синтаксический разбор, генеалогические схемы, деревья решений. Простой скобочный синтаксис.',
        breadcrumbTitle: 'Деревья в LaTeX (forest)',
        h1: 'Построение красивых генеалогических и&nbsp;синтаксических деревьев (пакет forest)',
        categories: ['latex'],
        keywords: [
            'нарисовать дерево в latex пакет forest',
            'синтаксическое дерево latex онлайн'
        ],
        datePublished: '2026-09-05',
        dateModified: '2026-09-05',
        readingTime: '7 мин',
        cardTitle: 'Построение деревьев в LaTeX: синтаксис и возможности пакета forest',
        cardDescription: 'Как рисовать синтаксические деревья разбора, родословные древа и графы решений в LaTeX с автоматическим расчетом узлов через пакет forest.',
        sliderTitle: 'Деревья и графы в LaTeX (forest)',
        sliderText: 'Скобочная нотация, автоматическая упаковка узлов и синтаксические деревья.',
        sidebarText: 'Верстайте синтаксические и структурные деревья в веб-редакторе Labkeeper с мгновенным предпросмотром.',
        ctaTitle: 'Визуализируйте структуры в&nbsp;Labkeeper',
        ctaText: 'Онлайн-редактор LaTeX с поддержкой TikZ и пакета forest для автоматического построения векторных схем и графов.',
        toc: [
            { id: 'intro', title: 'Почему пакет forest вытеснил qtree и чистый TikZ' },
            { id: 'syntax', title: 'Нарисовать дерево в latex пакет forest: базовый синтаксис скобок' },
            { id: 'linguistics', title: 'Синтаксическое дерево latex онлайн: лингвистический разбор' },
            { id: 'genealogy', title: 'Генеалогические древа и деревья решений' },
            { id: 'styling', title: 'Стилизация узлов: цвета, рамки и стрелки' }
        ],
        sections: [
            {
                id: 'intro',
                title: 'Почему пакет forest вытеснил qtree и чистый TikZ',
                html: `                        <p>Создание иерархических древовидных структур в классическом TikZ требует ручного задания координат каждого узла и постоянного подбора отступов, чтобы ветви не накладывались друг на друга (для сравнения ознакомьтесь с <a href="/blog/latex-tikz-automata-graphs">построением графов и автоматов в TikZ</a>). Устаревший пакет <code>qtree</code> прост, но ограничен в возможностях оформления.</p>
                        <p>Пакет <strong>forest</strong> объединяет простоту скобочной нотации с интеллектуальным алгоритмом упаковки узлов: он автоматически минимизирует площадь дерева, сохраняя равные расстояния между листьями и предотвращая пересечение связей.</p>`
            },
            {
                id: 'syntax',
                title: 'Нарисовать дерево в latex пакет forest: базовый синтаксис скобок',
                html: `                        <p>Подключите пакет: <code>\\usepackage{forest}</code>. Чтобы быстро <strong>нарисовать дерево в latex пакет forest</strong>, используется окружение <code>forest</code>, где каждый узел заключается в квадратные скобки <code>[...]</code>:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{forest}
[Корень
    [Левый потомок
        [Лист 1]
        [Лист 2]
    ]
    [Правый потомок
        [Лист 3]
    ]
]
\\end{forest}</code></pre>
                        </div>
                        <p>Вложенность скобок автоматически определяет глубину дерева в иерархии без необходимости прописывать связи вручную.</p>`
            },
            {
                id: 'linguistics',
                title: 'Синтаксическое дерево latex онлайн: лингвистический разбор',
                html: `                        <p>В лингвистике и компьютерной филологии постоянно строится <strong>синтаксическое дерево latex онлайн</strong> (дерево составляющих или зависимостей):</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{forest}
[S
    [NP [Студент, roof]]
    [VP
        [V [пишет]]
        [NP
            [Adj [отличный]]
            [N [отчет]]
        ]
    ]
]
\\end{forest}</code></pre>
                        </div>
                        <p>Опция <code>roof</code> превращает ветвь в аккуратный треугольник над группой слов, что является общепринятым стандартом лингвистических публикаций.</p>`
            },
            {
                id: 'genealogy',
                title: 'Генеалогические древа и деревья решений',
                html: `                        <p>Для генеалогических исследований или деревьев принятия решений в машинном обучении (а также сопутствующих <a href="/blog/algorithm-flowcharts-gost-markdown-latex">блок-схем алгоритмов по ГОСТ</a>) узлам задают рамки, заливку и подписи условий на дугах:</p>
                        <div class="article-code">
                            <div class="article-code__header"><span class="article-code__lang">LaTeX</span></div>
                            <pre><code>\\begin{forest}
for tree={
    draw,
    rounded corners,
    edge={-latex},
    font=\\small,
    l sep=12mm
}
[Влажность > 70\\%
    [Дождь?, edge label={node[midway,left]{Да}}
        [Сидеть дома, fill=red!20]
        [Гулять, fill=green!20]
    ]
    [Идти в парк, edge label={node[midway,right]{Нет}}, fill=green!20]
]
\\end{forest}</code></pre>
                        </div>
                        <p>Директива <code>for tree={...}</code> применяет стили глобально ко всем узлам дерева: форму рамок, геометрию стрелок и расстояние между уровнями <code>l sep</code>.</p>`
            },
            {
                id: 'styling',
                title: 'Стилизация узлов: цвета, рамки и стрелки',
                html: `                        <p>Основные параметры форматирования пакета forest:</p>
                        <ul>
                            <li><code>grow'=east</code> — ориентация дерева слева направо вместо классического сверху вниз.</li>
                            <li><code>s sep=5mm</code> — минимальное расстояние между соседними узлами одного уровня (sibling separation).</li>
                            <li><code>tier=уровень</code> — принудительное выравнивание разнородных листьев по одной горизонтальной линии.</li>
                        </ul>`
            }
        ],
        tips: [
            {
                title: 'Кириллица внутри формул в узлах',
                html: '<p>Если узел содержит математическую формулу, используйте стандартные знаки доллара: <code>[$x_1 + x_2$, draw]</code>.</p>'
            },
            {
                title: 'Перенос строк внутри узла',
                html: '<p>Для многострочного текста внутри плашки добавьте параметр <code>align=center</code>: <code>[Длинный текст\\\\вторая строка, align=center, draw]</code>.</p>'
            }
        ]
    }
];
