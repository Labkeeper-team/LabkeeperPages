// One small, self-contained example per article. No manual uploads are needed.
// Keep the encoded URL within the budget checked by buildExampleUrl().
const tex = String.raw;

function latex(body, preamble = '', documentClass = 'article') {
    return { latex: tex`\documentclass[a4paper,12pt]{${documentClass}}
\usepackage[T2A]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[english,russian]{babel}
\usepackage{amsmath,graphicx}
${preamble}
\begin{document}
${body}
\end{document}` };
}

function markdown(text) {
    return { markdown: text };
}

module.exports = {
    'latex-amsthm': latex(tex`\begin{theorem}If $n$ is even, then $n^2$ is even.\end{theorem}
\begin{proof}Write $n=2k$. Then $n^2=4k^2$.\end{proof}`,
    tex`\usepackage{amsthm}\newtheorem{theorem}{Theorem}`),
    'latex-chemfig': latex(tex`Ethanol: \chemfig{CH_3-CH_2-OH}
\qquad Benzene: \chemfig{*6(=-=-=-)}`, tex`\usepackage{chemfig}`),
    'latex-cv-resume': latex(tex`\section*{Anna Petrova}
Software developer \hfill anna@example.com
\section*{Experience}
\textbf{Backend developer}, 2023--2026
\begin{itemize}\item Built a reporting API.\item Reduced response time by 30\%.\end{itemize}
\section*{Skills}Python, PostgreSQL, Docker.`, tex`\pagestyle{empty}`),
    'latex-diploma-gost': latex(tex`\tableofcontents
\newpage\section{Введение}
Цель работы: сравнить методы расчета.
\section{Методика}Описание эксперимента.`,
    tex`\usepackage[left=30mm,right=15mm,top=20mm,bottom=20mm]{geometry}
\usepackage{setspace}\onehalfspacing\setlength{\parindent}{1.25cm}`),
    'latex-dissertation': latex(tex`\tableofcontents
\chapter{Введение}Цель исследования.
\chapter{Методы}\section{Модель}Описание модели.
\chapter{Результаты}Основные выводы.`, '', 'report'),
    'latex-eskd': latex(tex`\section{Назначение}Описание изделия.
\section{Характеристики}Напряжение питания: 12 В.
\vfill\noindent\fbox{\parbox{.9\linewidth}{AB.001\hfill Лист \thepage\\Источник питания}}`,
    tex`\usepackage[left=23mm,right=8mm,top=15mm,bottom=15mm]{geometry}
\usepackage{tikz}
\AddToHook{shipout/background}{\begin{tikzpicture}[remember picture,overlay]
\draw[line width=.4mm] ([xshift=20mm,yshift=5mm]current page.south west)
rectangle ([xshift=-5mm,yshift=-5mm]current page.north east);
\end{tikzpicture}}`),
    'latex-fancyhdr': latex(tex`\section{Methods}First page.
\newpage\section{Results}Second page.`,
    tex`\usepackage{fancyhdr}\pagestyle{fancy}\fancyhf{}
\fancyhead[L]{Research report}\fancyhead[R]{Labkeeper}\fancyfoot[C]{\thepage}`),
    'latex-formulas': latex(tex`\[E=mc^2,\qquad \int_0^1 x^2\,dx=\frac13\]
\begin{align}a^2+b^2&=c^2\\x&=\frac{-b\pm\sqrt{b^2-4ac}}{2a}\end{align}`),
    'latex-gost-bibliography': latex(tex`Метод описан в работе~\cite{book}.
\begin{thebibliography}{9}
\bibitem{book}Иванов И. И. Методы расчета. Москва, 2024. 120 с.
\end{thebibliography}`),
    'latex-lab-reports': latex(tex`\section*{Лабораторная работа}
\section{Цель}Измерить сопротивление.
\section{Результаты}\[R=\frac{U}{I}=\frac{5}{0.1}=50\,\Omega\]
\section{Вывод}Получено $R=50\,\Omega$.`),
    'latex-list-of-figures-tables': latex(tex`\listoffigures\listoftables
\begin{figure}[h]\centering\fbox{\rule{0pt}{15mm}\rule{35mm}{0pt}}
\caption{Experimental setup}\end{figure}
\begin{table}[h]\centering\begin{tabular}{cc}Time & Value\\1 & 2\end{tabular}
\caption{Measurements}\end{table}`),
    'latex-scopus-wos': latex(tex`\title{A Reproducible Measurement Method}\author{Anna Petrova}\maketitle
\begin{abstract}We compare two measurement methods.\end{abstract}
\section{Introduction}Research question.
\section{Methods}Three repeated measurements.
\section{Results}The average was 5.2.
\section{Discussion}A larger sample is needed.`),
    'latex-siunitx': latex(tex`\SI{9.81}{\metre\per\second\squared}
\quad\num{12345.6789}
\begin{tabular}{S[table-format=2.2]}1.25\\12.30\\3.40\end{tabular}`,
    tex`\usepackage{siunitx}`),
    'latex-systems-equations': latex(tex`\[\begin{cases}2x+y=5\\x-y=1\end{cases}
\quad\Longrightarrow\quad x=2,\ y=1.\]
\[\begin{pmatrix}2&1\\1&-1\end{pmatrix}
\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}5\\1\end{pmatrix}\]`),
    'latex-titlepage': latex(tex`\begin{titlepage}\centering
Университет\par\vfill
{\Large Лабораторная работа\par}
Измерение сопротивления\par\vfill
Студент: Иван Иванов\par\vfill 2026
\end{titlepage}`),
    'latex-word-to-latex': latex(tex`\section{Структура документа}
Текст вместо ручного форматирования.
\subsection{Формула}\[s=vt\]
\begin{itemize}\item Заголовки\item Формулы\item Списки\end{itemize}`),

    'latex-minipage-images-tables-side-by-side': latex(tex`\noindent
\begin{minipage}{.46\textwidth}\centering
\fbox{\rule{0pt}{25mm}\rule{35mm}{0pt}}\\Diagram
\end{minipage}\hfill
\begin{minipage}{.46\textwidth}\centering
\begin{tabular}{cc}Time & Value\\1 & 2\\2 & 4\end{tabular}\\Measurements
\end{minipage}`),
    'latex-custom-rgb-hex-colors-xcolor': latex(tex`\textcolor{brand}{Custom HEX color}
\par\colorbox{accent}{Custom RGB background}`,
    tex`\usepackage{xcolor}\definecolor{brand}{HTML}{4469E0}\definecolor{accent}{RGB}{220,235,255}`),
    'latex-multi-file-document-input-include': latex(tex`\section{Shared content}\input{blog-section.tex}`,
    tex`\begin{filecontents*}[overwrite]{blog-section.tex}
This paragraph is read from a separate file created by this example.
\end{filecontents*}`),
    'latex-tcolorbox-theorems-callouts': latex(tex`\begin{tcolorbox}[title=Pythagorean theorem,colback=blue!5,colframe=blue!60!black]
For a right triangle, $a^2+b^2=c^2$.
\end{tcolorbox}`, tex`\usepackage{tcolorbox}`),
    'overleaf-alternatives-russia-online-latex': latex(tex`\title{My first online document}\author{Labkeeper}\maketitle
\section{A working example}Edit this text and compile again.
\[\int_0^1 x^2\,dx=\frac13\]`),
    'markdown-multiline-formulas-matrices-mathjax': markdown(tex`## Матрица и система

$$
A=\begin{pmatrix}1&2\\3&4\end{pmatrix}
$$

$$
\begin{aligned}2x+y&=5\\x-y&=1\end{aligned}
$$`),
    'markdown-image-size-width-height': markdown('## Размер изображения\n\n<div style="display:flex;width:96px"><img src="https://labkeeper.io/assets/img/logo.svg" alt="Labkeeper"></div>\n\nШирина изображения ограничена контейнером 96 px, пропорции сохранены.'),
    'software-screenshots-report-gost-caption': latex(tex`\begin{figure}[h]\centering
\fbox{\begin{minipage}{.6\textwidth}\ttfamily
Program output:\par Result: 42\par Status: OK
\end{minipage}}
\caption{Вывод программы}\label{fig:output}\end{figure}
Результат приведен на рисунке~\ref{fig:output}.`,
    tex`\usepackage{caption}\captionsetup[figure]{labelsep=endash}`),
    'formula-variable-explanation-where-gost': latex(tex`\begin{equation}v=\frac{s}{t}\end{equation}
\noindent где $v$ --- скорость, м/с;\\
$s$ --- путь, м;\\$t$ --- время, с.`),
    'lab-report-bibliography-gost-2008': latex(tex`См. описание метода~\cite{method}.
\begin{thebibliography}{9}
\bibitem{method}Петров П. П. Измерения. Москва, 2024. 80 с.
\end{thebibliography}`),
    'master-thesis-title-page-gost': latex(tex`\begin{titlepage}\centering
Университет\par\vfill
{\Large Магистерская диссертация\par}
Методы измерений\par\vfill
Автор: Иванов И. И.\par\vfill 2026
\end{titlepage}`),
    'legal-regulatory-acts-bibliography-diploma-gost': latex(tex`\section*{Нормативные источники}
\begin{enumerate}
\item Конституция Российской Федерации.
\item Федеральный закон от 27.07.2006 № 152-ФЗ.
\end{enumerate}`),
    'literature-review-structure-diploma-citation': latex(tex`\section{Literature review}
\subsection{Existing methods}The baseline is described in~\cite{baseline}.
\subsection{Research gap}Accuracy on small samples remains uncertain.
\begin{thebibliography}{9}\bibitem{baseline}A. Author. Measurement methods. 2024.\end{thebibliography}`),
    'figure-double-numbering-chapters-gost': latex(tex`\chapter{Методика}
\begin{figure}[h]\centering\fbox{\rule{0pt}{20mm}\rule{40mm}{0pt}}
\caption{Схема опыта}\end{figure}`, '', 'report'),
    'justified-text-spacing-hyphenation-latex-vs-word': latex(tex`\noindent\begin{minipage}{.55\textwidth}
LaTeX automatically balances the spacing between words and chooses line breaks for justified paragraphs. Avoid manual spaces and forced line breaks: edit the text and let the typesetting engine reflow it.
\end{minipage}`, tex`\usepackage{microtype}`),
    'table-continuation-multipage-gost-diploma': latex(tex`\begin{longtable}{cc}
\caption{Measurements}\\Time & Value\\\hline\endfirsthead
\multicolumn{2}{c}{Continuation of table \thetable}\\Time & Value\\\hline\endhead
1 & 10\\2 & 20\\3 & 30\\4 & 40\\5 & 50\\6 & 60\\7 & 70\\8 & 80\\9 & 90\\10 & 100\\
\end{longtable}`, tex`\usepackage{longtable}\usepackage[textheight=55mm]{geometry}`),
    'footnotes-bottom-page-law-history-coursework-gost': latex(tex`Historical sources need precise attribution.\footnote{A. Author. A History of Science. 2024. P. 15.}
Another statement uses an explanatory note.\footnote{This note clarifies the terminology.}`),
    // A single-file citation preview. The article explains the full .bib/Biber workflow.
    'biblatex-biber-advanced-bibliography-management': latex(tex`\section*{Citations and bibliography}
A reproducible method~\cite{demo}.
\begin{thebibliography}{9}
\bibitem{demo}Anna Example. \textit{Measurement Methods}. Example Press, 2024.
\end{thebibliography}`),

    'latex-pgfplots-function-graphs': latex(tex`\begin{tikzpicture}\begin{axis}[width=9cm,xlabel=$x$,ylabel=$y$,grid=major]
\addplot[blue,domain=-2:2,samples=40]{x^2};
\end{axis}\end{tikzpicture}`, tex`\usepackage{pgfplots}\pgfplotsset{compat=1.18}`),
    'latex-xcolor-text-background': latex(tex`\textcolor{blue}{Blue text}\par\colorbox{yellow!30}{Highlighted text}
\begin{tabular}{cc}\rowcolor{blue!15}Item & Value\\A & 10\\B & 20\end{tabular}`,
    tex`\usepackage[table]{xcolor}`),
    'latex-wrapfig-text-flow': latex(tex`\begin{wrapfigure}{r}{.3\textwidth}\centering
\fbox{\rule{0pt}{18mm}\rule{25mm}{0pt}}\caption{Diagram}\end{wrapfigure}
Text flows around the illustration. A narrow figure can sit next to a paragraph without occupying the entire line. Continue editing this paragraph to see how the available line width changes below the image.`, tex`\usepackage{wrapfig}`),
    'latex-draftwatermark': latex(tex`\section{Draft report}This page carries a background watermark.`,
    tex`\usepackage{draftwatermark}\SetWatermarkText{DRAFT}\SetWatermarkScale{.8}`),
    'latex-forest-trees': latex(tex`\begin{forest}for tree={draw,rounded corners}
[Document [Introduction] [Methods [Model] [Experiment]] [Results]]
\end{forest}`, tex`\usepackage{forest}`),
    'latex-sans-serif-fonts': latex(tex`\section{Sans serif document}
Body text uses the same sans serif family as the headings.
\textbf{Bold} and \textit{italic} remain available.`, tex`\renewcommand{\familydefault}{\sfdefault}`),
    'latex-longtable-multipage': latex(tex`\begin{longtable}{cc}Index & Result\\\hline\endfirsthead
Index & Result (continued)\\\hline\endhead
1 & 10\\2 & 20\\3 & 30\\4 & 40\\5 & 50\\6 & 60\\7 & 70\\8 & 80\\9 & 90\\10 & 100\\11 & 110\\12 & 120\\
\end{longtable}`, tex`\usepackage{longtable}\usepackage[textheight=55mm]{geometry}`),
    'latex-prevent-hyphenation-linebreaks': latex(tex`\begin{minipage}{5cm}
Keep a name together: \mbox{Anna Petrova}.\par
Keep a number with its unit: 25~mm.\par
Prevent a product name from breaking: \mbox{LabkeeperEditor}.
\end{minipage}`),
    'latex-tikz-automata-graphs': latex(tex`\begin{tikzpicture}[node distance=3cm,>=stealth]
\node[state,initial] (a) {$q_0$};\node[state,accepting,right of=a] (b) {$q_1$};
\path[->] (a) edge[bend left] node[above]{1} (b) (b) edge[bend left] node[below]{0} (a);
\end{tikzpicture}`, tex`\usepackage{tikz}\usetikzlibrary{automata,positioning}`),
    'programming-lab-report-code-listings-gost': latex(tex`\section{Implementation}
\begin{lstlisting}[language=Python,caption={Mean value}]
values = [2, 4, 6]
print(sum(values) / len(values))
\end{lstlisting}`, tex`\usepackage{listings}\lstset{basicstyle=\ttfamily\small,numbers=left,frame=single,breaklines=true}`),
    'algorithm-flowcharts-gost-markdown-latex': latex(tex`\begin{tikzpicture}[node distance=12mm]
\node[draw,rounded corners] (start) {Start};
\node[draw,below=of start] (calc) {$s=a+b$};
\node[draw,rounded corners,below=of calc] (end) {End};
\draw[->] (start)--(calc);\draw[->] (calc)--(end);
\end{tikzpicture}`, tex`\usepackage{tikz}\usetikzlibrary{positioning}`),
    'formula-numbering-lab-reports-gost': latex(tex`\begin{equation}\label{eq:ohm}U=IR\end{equation}
\begin{equation}P=UI=I^2R\end{equation}
Resistance follows from equation~\eqref{eq:ohm}.`),
    'student-confidence-intervals-error-calculation': {
        compute: 'x = [9.8, 9.8, 10.2, 10.6, 10.6]\nn = 5\nmean = sum(x) / n\ns = sqrt(sum((x - mean)^2) / (n - 1))\n// Two-sided 95% interval, n = 5\nt = 2.776\ndelta = t * s / sqrt(n)\nlo = mean - delta\nhi = mean + delta',
        latex: '\\section*{Confidence interval}\n$n=5$, $P=0.95$, $t_{0.975,4}=2.776$.\n\\[\\Delta x=t\\frac{s}{\\sqrt n}\\]\nMean: ${mean}. Standard deviation: ${s}.\n\\par Confidence half-width: ${delta}.\n\\par Interval: [${lo}; ${hi}].'
    },
    'lab-report-bibliography-gost-7-1': latex(tex`\section*{Список литературы}
\begin{enumerate}\item Иванов И. И. Физика: учебник. Москва, 2024. 200 с.
\item Петров П. П. Практикум. Казань, 2023. 80 с.\end{enumerate}`),
    'diploma-page-numbering-second-page': latex(tex`\thispagestyle{empty}\begin{center}\Large Title page\end{center}
\newpage\section{Introduction}The title counts as page 1 but has no printed number.
\newpage\section{Methods}Numbering continues.`),
    'paragraph-indent-1-25-gost': latex(tex`\section*{Абзацный отступ}
Первый абзац начинается с отступа.

Второй абзац имеет тот же отступ 1,25 см.`, tex`\usepackage{indentfirst}\setlength{\parindent}{1.25cm}`),
    'a4-frames-eskd-stamp-technical-diploma': latex(tex`\section{Technical description}Power supply: 12 V.
\section{Purpose}Laboratory measurement device.`,
    tex`\usepackage[left=23mm,right=8mm,top=15mm,bottom=55mm]{geometry}
\usepackage{tikz}
\AddToHook{shipout/background}{\begin{tikzpicture}[remember picture,overlay,x=1mm,y=1mm]
\begin{scope}[shift={(current page.south west)}]
\draw (20,5) rectangle (205,292) (20,45)--(205,45) (20,20)--(205,20) (185,5)--(185,45);
\node at (100,32){Measurement device: LK.001};
\node at (100,12){Author: Ivanov};\node at (195,12){\thepage};
\end{scope}\end{tikzpicture}}`),
    'it-english-cv-resume-template': markdown('# Anna Petrova\nBackend Engineer | anna@example.com\n\n## Summary\nPython developer building reliable APIs.\n\n## Experience\n- Cut API latency by 30%.\n- Added integration tests for billing.\n\n## Skills\nPython, PostgreSQL, Docker.\n\n## Education\nBSc Computer Science, 2022.'),
    'scientific-article-annotation-abstract-keywords-vak': latex(tex`\title{Measurement accuracy}\author{Anna Petrova}\maketitle
\begin{abstract}We compare two sensors using repeated measurements. Calibration reduced the mean error from 4\% to 1\%. The method is suitable for laboratory work.\end{abstract}
\noindent\textbf{Keywords:} measurement, calibration, uncertainty.`),
    'electronic-resources-bibliography-gost-7-0-100': latex(tex`\begin{thebibliography}{9}
\bibitem{site}Labkeeper: онлайн-редактор. URL: \url{https://labkeeper.io}
(дата обращения: 08.10.2026).
\end{thebibliography}`, tex`\usepackage{url}`),
    'markdown-mathjax-katex-latex-math': markdown(tex`## Формулы

В строке: $E=mc^2$.

$$
\int_0^1 x^2\,dx=\frac13
$$

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$`),
    'github-readme-template-badges-spoilers': markdown('# Measurement toolkit\n\nA small project for repeatable calculations.\n\n## Usage\n\n    npm install\n    npm test\n\n## Features\n- CSV input\n- Reproducible reports\n\n<details>\n<summary>Development notes</summary>\n\nRun the tests before submitting a change.\n\n</details>'),
    'automatic-table-of-contents-diploma-gost': latex(tex`\tableofcontents\newpage
\section{Introduction}Research goal.
\section{Methods}\subsection{Equipment}Measurement setup.
\section{Results}Summary of observations.`),
    'diploma-appendices-listings-diagrams-gost': latex(tex`\section{Main text}The source code is in Appendix~\ref{app:code}.
\appendix\section{Program listing}\label{app:code}
\begin{verbatim}
def square(x):
    return x * x
\end{verbatim}`),
    'essay-report-titlepage-format': latex(tex`\begin{titlepage}\centering
Университет\par\vfill
{\Large Реферат\par}История измерений\par\vfill
Выполнил: Иван Иванов\par\vfill 2026
\end{titlepage}`),
    'markdown-superscript-subscript-indices': markdown(tex`## Индексы

Молекула воды: $H_2O$.

Энергия: $E_0=mc^2$.

Последовательность: $a_1,a_2,\ldots,a_n$.

HTML: H<sub>2</sub>O и x<sup>2</sup>.`),

    'latex-russian-cyrillic-code-listings-minted': latex(tex`\begin{lstlisting}[language=Python]
print("Привет")
\end{lstlisting}`, tex`\usepackage{listings}\lstset{basicstyle=\ttfamily,extendedchars=true,literate={П}{{\CYRP}}1 {р}{{\cyrr}}1 {и}{{\cyri}}1 {в}{{\cyrv}}1 {е}{{\cyre}}1 {т}{{\cyrt}}1}`),
    'physics-lab-measurement-graphs-formatting-gost': latex(tex`\begin{tikzpicture}\begin{axis}[width=9cm,xlabel={$U$, V},ylabel={$I$, A},grid=major]
\addplot+[only marks,error bars/.cd,y dir=both,y explicit]
coordinates {(1,.10)+-(0,.01) (2,.21)+-(0,.02) (3,.30)+-(0,.02)};
\end{axis}\end{tikzpicture}`, tex`\usepackage{pgfplots}\pgfplotsset{compat=1.18}`),
    'how-to-write-lab-report-conclusion-examples': markdown('# Вывод\n\nИзмерено сопротивление проводника: **50 ± 2 Ом**.\n\nРезультат согласуется с номиналом 51 Ом в пределах погрешности. Основной источник неопределенности: измерение тока.'),
    'diploma-assignment-form-calendar-schedule-gost': latex(tex`\section*{Work schedule}
\begin{tabular}{|l|l|l|}\hline Stage & Deadline & Status\\\hline
Literature review & 01.03 & Done\\
Experiment & 15.04 & In progress\\
Final report & 01.06 & Planned\\\hline\end{tabular}`),
    'supervisor-review-external-evaluation-diploma-templates': markdown('# Supervisor review\n\n**Student:** Ivan Ivanov\n**Topic:** Sensor calibration\n\n## Relevance\nThe work addresses measurement accuracy.\n\n## Results\nA reproducible calibration procedure was developed.\n\n## Limitations\nOnly two sensors were tested.\n\n## Conclusion\nThe stated research goal was achieved.'),
    'diploma-annotation-abstract-russian-english': markdown('# Аннотация\n\nРабота посвящена калибровке датчиков. Предложен метод снижения погрешности.\n\n# Abstract\n\nThe thesis studies sensor calibration and proposes a method to reduce measurement error.\n\n**Keywords:** calibration, accuracy.'),
    'how-to-write-it-cover-letter-structure-template': markdown('# Cover letter\n\nDear hiring team,\n\nI am applying for the Backend Engineer role. In my current project I reduced API latency by 30% and added automated integration tests.\n\nYour focus on reliable data services matches my experience with Python and PostgreSQL.\n\nI would welcome an opportunity to discuss the role.\n\nAnna Petrova'),
    'frontend-backend-developer-resume-tech-stack-ats': markdown('# Alex Ivanov\nBackend Developer\n\n## Technical skills\n- Languages: Python, SQL\n- Backend: FastAPI, REST\n- Data: PostgreSQL, Redis\n- Delivery: Docker, CI/CD\n\n## Experience\nBuilt an API serving 20,000 daily requests and reduced p95 latency from 400 to 180 ms.'),
    'student-no-experience-resume-cv-template': markdown('# Maria Ivanova\nJunior Developer | maria@example.com\n\n## Education\nBSc Computer Science, expected 2027.\n\n## Projects\n**Study planner:** React app with reminders and unit tests.\n\n## Skills\nJavaScript, React, Git.\n\n## Activities\nUniversity programming club.'),
    'one-page-resume-cv-template-condensing-experience': latex(tex`\section*{Alex Ivanov | Software Engineer}
alex@example.com
\section*{Selected experience}
\textbf{Team lead, 2022--2026}: led 5 engineers; delivery time reduced by 25\%.
\par\textbf{Developer, 2016--2022}: built reporting services.
\section*{Skills}Python, SQL, system design.
\section*{Education}BSc Computer Science.`, tex`\usepackage[margin=18mm]{geometry}\pagestyle{empty}`),
    'imrad-structure-scientific-article-scopus-template': latex(tex`\section{Introduction}Can calibration reduce sensor bias?
\section{Methods}We compared two sensors over 20 trials.
\section{Results}Mean error decreased from 4\% to 1\%.
\section{Discussion}Calibration improved accuracy; a larger sample is needed.`),
    'complex-markdown-tables-syntax-online-generator': markdown('## Measurement table\n\n| Sensor | Value | Error |\n|:-------|------:|------:|\n| A | 10.2 | 0.2 |\n| B | 10.4 | 0.3 |\n\nThe first column is left-aligned; numbers are right-aligned.'),
    'ideal-lab-report-template-gost-online': latex(tex`\section*{Отчет по лабораторной работе}
\section{Цель}Проверить закон Ома.
\section{Данные}$U=5$ В, $I=0.1$ А.
\section{Расчет}\[R=U/I=50\,\Omega\]
\section{Вывод}Закон подтвержден.`),
    'word-formatting-issues-diploma-lightweight-markup-alternative': markdown(tex`# Структура работы

## Введение
Текст отделен от оформления.

## Расчет
$$v=\frac{s}{t}$$

## Вывод
- Заголовки задают структуру.
- Формулы остаются редактируемыми.`),
    'modern-it-resume-markdown-cv-as-code': markdown('# Anna Petrova\nFullstack Developer | anna@example.com\n\n## Summary\nBuilding accessible web applications.\n\n## Stack\nTypeScript, React, Node.js, PostgreSQL.\n\n## Selected project\n**Report builder:** cut report preparation time by 40%.\n\n## Education\nBSc Computer Science, 2021.'),
    'rinc-vak-scientific-article-template-fonts-margins': latex(tex`\noindent УДК 004.421
\begin{center}\textbf{Метод измерений}\\Иванов И. И.\end{center}
\textbf{Аннотация.} Рассмотрен метод калибровки.
\par\textbf{Ключевые слова:} измерения, погрешность.
\section{Введение}Постановка задачи.`, tex`\usepackage[margin=20mm]{geometry}\usepackage{setspace}\onehalfspacing`),
    'latex-algorithm2e-pseudocode-algorithms': latex(tex`\begin{algorithm}[H]
\KwIn{Array $a$ of length $n$}\KwOut{Sum $s$}
$s\gets0$\;
\For{$i\gets1$ \KwTo $n$}{$s\gets s+a_i$\;}
\caption{Array sum}\end{algorithm}`, tex`\usepackage[ruled]{algorithm2e}`),
    'latex-hyperref-pdf-bookmarks-navigation': latex(tex`\tableofcontents
\section{Introduction}\label{intro}
Visit \href{https://labkeeper.io}{Labkeeper}.
\newpage\section{Results}Back to Section~\ref{intro}.`,
    tex`\usepackage[unicode,colorlinks=true,linkcolor=blue,urlcolor=blue]{hyperref}`),
    'latex-arraystretch-table-row-height-spacing': latex(tex`\renewcommand{\arraystretch}{1.6}
\begin{tabular}{|l|r|}\hline Item & Value\\\hline
Voltage & 12\\Current & 2\\Power & 24\\\hline\end{tabular}`),
    'latex-rotating-package-sidewaystable-rotate-90': latex(tex`\begin{sidewaystable}\centering
\begin{tabular}{lrrrr}Sensor & Trial 1 & Trial 2 & Trial 3 & Mean\\
A & 10 & 11 & 12 & 11\\B & 20 & 21 & 22 & 21\end{tabular}
\caption{Wide results table}\end{sidewaystable}`, tex`\usepackage{rotating}`),
    'latex-multicol-multi-column-layout-journal': latex(tex`\begin{multicols}{2}
\section*{First column}A short newspaper-style article. The package balances the text across columns.
\columnbreak\section*{Second column}An explicit column break starts this section in the next column.
\end{multicols}`, tex`\usepackage{multicol}`),
    'latex-pgfplotstable-import-excel-csv-tables': latex(tex`\pgfplotstabletypeset[col sep=comma,columns/Time/.style={column type=r},columns/Value/.style={column type=r}]{
Time,Value
1,2.5
2,4.0
3,5.5
}`, tex`\usepackage{pgfplotstable}\pgfplotsset{compat=1.18}`),
    'indirect-measurement-error-calculation-lab-report': {
        compute: '// Mass in kg, diameter and height in m\nm = 0.12450 # 0.00005\nd = 0.02012 # 0.00002\nh = 0.05034 # 0.00005\nrho = 4 * m / (3.141592653589793 * d^2 * h)\ndr = err(rho)',
        latex: '\\section*{Cylinder density}\n\\[\\rho=\\frac{4m}{\\pi d^2h}\\]\n$m=(0.12450\\pm0.00005)$ kg,\n$d=(0.02012\\pm0.00002)$ m,\n$h=(0.05034\\pm0.00005)$ m.\n\\par Density: ${rho} kg/m$^3$.\n\\par Absolute uncertainty: ${dr} kg/m$^3$.'
    },
    'resume-language-skills-cefr-scale-a1-c2': markdown('# Languages\n\n| Language | CEFR | Working context |\n|:---------|:-----|:----------------|\n| English | C1 | Technical presentations |\n| German | B1 | Everyday communication |\n| Russian | Native | Professional writing |'),

    'markdown-code-syntax-highlighting': markdown('## Python example\n\n```python\ndef mean(values):\n    return sum(values) / len(values)\n\nprint(mean([2, 4, 6]))\n```'),
    'markdown-strikethrough-underline-highlight': markdown('## Редактирование\n\n~~Устаревшее утверждение~~\n\n**Важный результат** и *пояснение*.\n\n<u>Подчеркнутый текст</u> и <mark>выделение</mark>.'),
    'markdown-to-pdf-export': markdown(tex`# Research notes

## Goal
Measure average speed.

$$v=\frac{s}{t}=\frac{100}{20}=5\ \text{m/s}$$

## Results
| Distance, m | Time, s |
|---:|---:|
| 100 | 20 |

Use the editor's PDF export to save this document.`),
    'markdown-raw-html-integration': markdown('# Markdown + HTML\n\nA normal **Markdown** paragraph.\n\n<table>\n<tr><th>Sensor</th><th>Value</th></tr>\n<tr><td>A</td><td>10.2</td></tr>\n</table>\n\n<details><summary>Notes</summary>Calibrated before measurement.</details>'),
    'markdown-table-merge-cells-rowspan-colspan': markdown('# Merged table cells\n\n<table>\n<tr><th rowspan="2">Sensor</th><th colspan="2">Measurement</th></tr>\n<tr><th>Value</th><th>Error</th></tr>\n<tr><td>A</td><td>10.2</td><td>0.2</td></tr>\n</table>'),
    'markdown-spoilers-details-summary': markdown('# Experiment notes\n\n<details>\n<summary>Show measurement details</summary>\n\n- Temperature: 22 C\n- Trials: 5\n- Calibration: completed\n\n</details>\n\nThe summary remains visible when the details are collapsed.'),
    'latex-newcommand-macros': latex(tex`\[\vect{v}=(1,2,3),\qquad \norm{\vect{v}}=\sqrt{14}\]`,
    tex`\newcommand{\vect}[1]{\mathbf{#1}}\newcommand{\norm}[1]{\left\lVert#1\right\rVert}`),
    'latex-geometry-margins-gost': latex(tex`\section*{Page margins}
Left: 30 mm. Right: 15 mm. Top and bottom: 20 mm.
\par The frame shows the text area.`, tex`\usepackage[left=30mm,right=15mm,top=20mm,bottom=20mm,showframe]{geometry}`),
    'latex-nested-lists-enumerate-itemize': latex(tex`\begin{enumerate}
\item Preparation\begin{itemize}\item Calibrate the sensor.\item Record room temperature.\end{itemize}
\item Measurement\begin{enumerate}\item Take five readings.\item Calculate the mean.\end{enumerate}
\end{enumerate}`),
    'latex-line-spacing-1-5-setspace-gost': latex(tex`\section*{Line spacing}
This paragraph uses one-and-a-half line spacing. Add several lines of text to compare the distance between baselines.
\begin{singlespace}This paragraph uses single spacing. The change is local to this environment.\end{singlespace}`,
    tex`\usepackage{setspace}\onehalfspacing`),
    'markdown-footnotes': markdown('# Measurement notes\n\nThe value was corrected after calibration.[^calibration]\n\n[^calibration]: Calibration was performed at room temperature before the experiment.'),
    'markdown-task-lists': markdown('# План эксперимента\n\n- [x] Подготовить приборы\n- [x] Проверить калибровку\n- [ ] Выполнить измерения\n- [ ] Оформить отчет')
};
