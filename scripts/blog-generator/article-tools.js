const { parse } = require('parse5');

// Conservative budget for a complete, percent-encoded link, including the origin.
const MAX_EXAMPLE_URL_LENGTH = 2000;
const EXAMPLE_ORIGIN = 'https://labkeeper.io';
const EXAMPLE_TYPES = ['compute', 'latex', 'markdown'];

function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function buildExampleUrl(example, slug = 'article') {
    if (!example || typeof example !== 'object' || Array.isArray(example)) {
        throw new Error(`${slug}: add an editor example`);
    }
    const keys = Object.keys(example);
    if (!keys.length || keys.some(key => !EXAMPLE_TYPES.includes(key))) {
        throw new Error(`${slug}: example keys must be compute, latex or markdown`);
    }
    const query = new URLSearchParams();
    query.set('example', '1');
    query.set('open', example.latex || example.compute ? 'latex' : 'markdown');
    for (const type of EXAMPLE_TYPES) {
        if (!Object.hasOwn(example, type)) continue;
        if (typeof example[type] !== 'string' || !example[type].trim()) {
            throw new Error(`${slug}: ${type} must contain non-empty text`);
        }
        query.set(type, example[type]);
    }
    const url = `/project/default?${query}`;
    const length = EXAMPLE_ORIGIN.length + url.length;
    if (length > MAX_EXAMPLE_URL_LENGTH) {
        throw new Error(`${slug}: encoded example URL is ${length} characters (limit ${MAX_EXAMPLE_URL_LENGTH})`);
    }
    return url;
}

function walk(node, visit) {
    visit(node);
    for (const child of node.childNodes || []) walk(child, visit);
}

function attribute(node, name) {
    return (node.attrs || []).find(attr => attr.name === name)?.value;
}

function hasClass(node, name) {
    return (attribute(node, 'class') || '').split(/\s+/).includes(name);
}

function within(node, predicate) {
    for (let parent = node.parentNode; parent; parent = parent.parentNode) {
        if (predicate(parent)) return true;
    }
    return false;
}

function escapeCode(html) {
    // Code is literal source, not markup. Preserve already escaped entities.
    return html.replace(/(<code\b[^>]*>)([\s\S]*?)(<\/code>)/gi, (match, open, code, close) => {
        const escaped = code.replace(/&(?!#\d+;|#x[\da-f]+;|[a-z][\da-z]+;)/gi, '&amp;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return open + escaped + close;
    });
}

function prepareArticleHtml(source, example, slug) {
    const url = buildExampleUrl(example, slug);
    let html = escapeCode(source);
    const document = parse(html, { sourceCodeLocationInfo: true });
    const edits = [];
    let ctaCount = 0;
    walk(document, node => {
        const location = node.sourceCodeLocation;
        if (!location) return;
        if (node.tagName === 'a' && (attribute(node, 'id') === 'sidebar-cta-btn' ||
                hasClass(node, 'cta-features__intro-btn'))) {
            const attrs = node.attrs.filter(attr => !['href', 'data-blog-example', 'data-i18n'].includes(attr.name));
            const preserved = attrs.map(attr => ` ${attr.name}="${escapeHtml(attr.value)}"`).join('');
            const lineStart = html.lastIndexOf('\n', location.startOffset - 1) + 1;
            const indent = html.slice(lineStart, location.startOffset).match(/^[\t ]*/)[0];
            edits.push({ start: location.startOffset, end: location.endOffset,
                text: `<a href="${escapeHtml(url)}"${preserved} data-blog-example>\n` +
                    `${indent}    <span data-i18n="blog-example">Просмотреть пример в редакторе</span>\n` +
                    `${indent}    <span class="button__arrow" aria-hidden="true">→</span>\n` +
                    `${indent}</a>` });
            ctaCount++;
        }
        if (node.tagName === 'table' && within(node, parent => hasClass(parent, 'article-content')) &&
                !within(node, parent => hasClass(parent, 'article-table-wrapper'))) {
            edits.push({ start: location.startOffset, end: location.startOffset,
                text: '<div class="article-table-wrapper" tabindex="0">' });
            edits.push({ start: location.endOffset, end: location.endOffset, text: '</div>' });
        }
    });
    if (ctaCount !== 2) throw new Error(`${slug}: expected two article example buttons, found ${ctaCount}`);
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
        html = html.slice(0, edit.start) + edit.text + html.slice(edit.end);
    }
    if (!html.includes('href="../assets/vendor/katex/katex.min.css"')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="../assets/vendor/katex/katex.min.css">\n</head>');
    }
    if (!html.includes('src="../assets/js/blog.js"')) {
        html = html.replace('</body>', '    <script src="../assets/vendor/katex/katex.min.js" defer></script>\n' +
            '    <script src="../assets/vendor/katex/auto-render.min.js" defer></script>\n' +
            '    <script src="../assets/js/blog.js" defer></script>\n</body>');
    }
    return html;
}

module.exports = { buildExampleUrl, escapeHtml, prepareArticleHtml, walk, attribute, hasClass, MAX_EXAMPLE_URL_LENGTH };
