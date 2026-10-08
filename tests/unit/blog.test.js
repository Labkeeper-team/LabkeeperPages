const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('parse5');
const { buildExampleUrl, prepareArticleHtml, walk, attribute, MAX_EXAMPLE_URL_LENGTH } = require('../../scripts/blog-generator/article-tools');
const { generateArticleHtml, loadTemplate } = require('../../scripts/blog-generator/generate');
const examples = require('../../scripts/blog-generator/editor-examples');

const blogDir = path.resolve(__dirname, '../../src/blog');
const slugs = fs.readdirSync(blogDir).filter(file => file.endsWith('.html')).map(file => file.slice(0, -5));

test('example links round-trip all segment types without changing source text', () => {
    const example = { latex: String.raw`$x+y$ & 50% #1 \frac{a}{b}`, markdown: '# Пример\n<sup>2</sup> + $$', compute: 'a = 1\nb = a + 2' };
    const url = new URL(buildExampleUrl(example), 'https://labkeeper.io');
    assert.equal(url.pathname, '/project/default');
    assert.equal(url.searchParams.has('example'), false);
    assert.equal(url.searchParams.get('open'), 'latex');
    for (const [type, value] of Object.entries(example)) assert.equal(url.searchParams.get(type), value);
});

test('Markdown examples explicitly select Markdown mode', () => {
    assert.equal(new URL(buildExampleUrl({ markdown: '# Notes' }), 'https://labkeeper.io').searchParams.get('open'), 'markdown');
});

test('the URL budget includes percent encoding and the origin', () => {
    const prefix = 'https://labkeeper.io/project/default?open=latex&latex=';
    const text = 'a'.repeat(MAX_EXAMPLE_URL_LENGTH - prefix.length);
    assert.equal('https://labkeeper.io'.length + buildExampleUrl({ latex: text }).length, MAX_EXAMPLE_URL_LENGTH);
    assert.throws(() => buildExampleUrl({ latex: text + 'a' }), /limit/);
    assert.throws(() => buildExampleUrl({ latex: 'я'.repeat(400) }), /limit/);
});

for (const example of [undefined, null, [], {}, { latex: '' }, { markdown: '  ' }, { latex: 12 }, { unknown: 'text' }]) {
    test(`invalid example is rejected: ${JSON.stringify(example)}`, () => {
        assert.throws(() => buildExampleUrl(example));
    });
}

test('template substitution preserves dollars, backslashes and literal placeholders', () => {
    const article = {
        slug: 'regression', title: 'Formula "example"', description: 'A < B & C',
        datePublished: '2026-10-08', batch: 2,
        sections: [{ id: 'example', title: 'Example', html: '<p>$$x^2$$</p><pre><code>$$\\alpha$$ $& $` $\' {{H1}} &lt;p&gt;</code></pre>' }]
    };
    const html = generateArticleHtml(article, loadTemplate(), { latex: '$x$' });
    assert.ok(html.includes('<p>$$x^2$$</p>'));
    assert.ok(html.includes('$$\\alpha$$ $&amp; $` $\' {{H1}} &lt;p&gt;'));
    assert.ok(html.includes('content="A &lt; B &amp; C"'));
    assert.ok(html.includes('<title>Formula &quot;example&quot;'));
    assert.ok(html.includes('<h1 class="article-content__title h1">Formula "example"</h1>'));
    assert.throws(() => generateArticleHtml(article, '{{UNKNOWN_2}}', { latex: 'x' }), /Unknown template placeholder/);
    assert.throws(() => generateArticleHtml({ ...article, slug: '../escape' }, loadTemplate(), { latex: 'x' }), /slug/);
});

test('legacy content, literal HTML examples and existing table wrappers survive repeated builds', () => {
    const source = '<!DOCTYPE html><html><head><title>Original title</title></head><body>' +
        '<article class="article-content"><p>Original text $$x$$</p><pre><code><img src="example.png">&lt;b&gt; & value</code></pre>' +
        '<table><tr><td>Wide table</td></tr></table><div class="article-table-wrapper"><table><tr><td>Wrapped</td></tr></table></div></article>' +
        '<a id="sidebar-cta-btn" href="/old">Old</a><a class="cta-features__intro-btn" href="/old">Old</a></body></html>';
    const result = prepareArticleHtml(source, { latex: 'x+y' }, 'legacy');
    assert.ok(result.includes('<title>Original title</title>'));
    assert.ok(result.includes('<p>Original text $$x$$</p>'));
    assert.ok(result.includes('&lt;img src="example.png"&gt;&lt;b&gt; &amp; value'));
    assert.equal((result.match(/class="article-table-wrapper"/g) || []).length, 2);
    assert.equal(prepareArticleHtml(result, { latex: 'x+y' }, 'legacy'), result);
    assert.throws(() => prepareArticleHtml('<html></html>', { latex: 'x' }, 'broken'), /two article example buttons/);
});

test('every article has a distinct, bounded example and no orphan examples exist', () => {
    assert.deepEqual(Object.keys(examples).sort(), [...slugs].sort());
    const links = slugs.map(slug => buildExampleUrl(examples[slug], slug));
    assert.equal(new Set(links).size, slugs.length);
    for (const link of links) assert.equal(new URL(link, 'https://labkeeper.io').searchParams.has('example'), false);
});

for (const slug of ['student-confidence-intervals-error-calculation', 'indirect-measurement-error-calculation-lab-report']) {
    test(slug + ': calculation example passes compute and result substitutions together', () => {
        const example = examples[slug];
        assert.ok(example.compute.trim());
        assert.match(example.latex, /\$\{[a-z]+\}/);
        assert.doesNotMatch(example.latex, /\\(?:documentclass|begin\{document\}|end\{document\})/);
        const query = new URL(buildExampleUrl(example), 'https://labkeeper.io').searchParams;
        assert.equal(query.get('compute'), example.compute);
        assert.equal(query.get('latex'), example.latex);
        assert.equal(query.get('open'), 'latex');
    });
}

for (const slug of slugs) {
    test(`${slug}: generated links, metadata and code are valid`, () => {
        const html = fs.readFileSync(path.join(blogDir, `${slug}.html`), 'utf8');
        const document = parse(html);
        const links = [];
        const tocAnchors = [];
        const ids = new Set();
        walk(document, node => {
            const id = attribute(node, 'id');
            if (id) { assert.ok(!ids.has(id), `Duplicate id: ${id}`); ids.add(id); }
            if (attribute(node, 'data-blog-example') !== undefined) links.push(attribute(node, 'href'));
            if ((attribute(node, 'class') || '').split(/\s+/).includes('article-toc__link')) {
                tocAnchors.push(attribute(node, 'href'));
            }
            if (node.tagName === 'code') {
                assert.ok((node.childNodes || []).every(child => child.nodeName === '#text'), 'Code must contain literal text, not HTML elements');
            }
            if (node.tagName === 'h1') {
                const text = node.childNodes.map(child => child.value || '').join('');
                assert.ok(!text.includes('{{'), 'The article heading must not contain template placeholders');
            }
            if (node.tagName === 'script' && attribute(node, 'type') === 'application/ld+json') {
                JSON.parse(node.childNodes.map(child => child.value || '').join(''));
            }
        });
        for (const anchor of tocAnchors) {
            assert.ok(anchor?.startsWith('#') && ids.has(anchor.slice(1)), `Missing TOC target: ${anchor}`);
        }
        assert.deepEqual(links, [buildExampleUrl(examples[slug]), buildExampleUrl(examples[slug])]);
        assert.equal(prepareArticleHtml(html, examples[slug], slug), html);
    });
}

test('vendored math assets match the locked dependency', () => {
    const katexDir = path.dirname(require.resolve('katex/package.json'));
    const vendorDir = path.resolve(__dirname, '../../src/assets/vendor/katex');
    for (const [source, target] of [['dist/katex.min.js', 'katex.min.js'], ['dist/katex.min.css', 'katex.min.css'], ['dist/contrib/auto-render.min.js', 'auto-render.min.js'], ['LICENSE', 'LICENSE']]) {
        assert.deepEqual(fs.readFileSync(path.join(vendorDir, target)), fs.readFileSync(path.join(katexDir, source)));
    }
    for (const font of fs.readdirSync(path.join(katexDir, 'dist/fonts'))) {
        assert.deepEqual(fs.readFileSync(path.join(vendorDir, 'fonts', font)), fs.readFileSync(path.join(katexDir, 'dist/fonts', font)));
    }
});
