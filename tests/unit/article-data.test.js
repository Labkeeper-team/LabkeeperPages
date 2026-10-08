const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { parse } = require('parse5');
const { loadArticles, validateArticle } = require('../../scripts/blog-generator/article-data');
const { generateArticleHtml, loadTemplate } = require('../../scripts/blog-generator/generate');
const { buildExampleUrl, attribute, walk } = require('../../scripts/blog-generator/article-tools');

const root = path.resolve(__dirname, '../..');
const sample = {
    slug: 'sample', title: 'Sample', metaDescription: 'Article description',
    datePublished: '2026-10-08', batch: 1,
    sections: [{ id: 'example', title: 'Example', html: '<p>Source text</p>' }],
    editorExample: { latex: '$x$' }
};

function temporaryDirectory(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'labkeeper-article-data-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return directory;
}

test('JSON batches and single articles retain every example character', t => {
    const directory = temporaryDirectory(t);
    const first = { ...sample, editorExample: { latex: '\\[x = ${value}\\]', compute: 'value = 2\n// вычисление' } };
    const second = { ...sample, slug: 'notes', editorExample: { markdown: '# Заметки\n\n$ & <tag> \\' } };
    const files = [path.join(directory, 'batch.json'), path.join(directory, 'article.json')];
    fs.writeFileSync(files[0], JSON.stringify([first]));
    fs.writeFileSync(files[1], JSON.stringify(second));
    assert.deepEqual(loadArticles(files), [first, second]);
    for (const article of loadArticles(files)) {
        const query = new URL(buildExampleUrl(article.editorExample), 'https://labkeeper.io').searchParams;
        for (const [type, text] of Object.entries(article.editorExample)) assert.equal(query.get(type), text);
    }
});

for (const data of [[sample, sample], [sample, { ...sample, editorExample: { markdown: '# Different' } }]]) {
    test('duplicate slugs in a batch are rejected regardless of example type: ' + JSON.stringify(data[1].editorExample), t => {
        const file = path.join(temporaryDirectory(t), 'duplicate.json');
        fs.writeFileSync(file, JSON.stringify(data));
        assert.throws(() => loadArticles([file]), /duplicate\.json: Duplicate article: sample/);
    });
}

test('duplicate slugs across batches are rejected', t => {
    const directory = temporaryDirectory(t);
    const files = ['first.json', 'second.json'].map(name => path.join(directory, name));
    for (const file of files) fs.writeFileSync(file, JSON.stringify([sample]));
    assert.throws(() => loadArticles(files), /second\.json: Duplicate article: sample/);
});

test('invalid JSON and empty sources produce actionable errors', t => {
    const directory = temporaryDirectory(t);
    const file = path.join(directory, 'broken.json');
    fs.writeFileSync(file, '{');
    assert.throws(() => loadArticles([file]), /broken\.json:/);
    fs.writeFileSync(file, '[]');
    assert.throws(() => loadArticles([file]), /No articles/);
    assert.throws(() => loadArticles([]), /No articles/);
    fs.writeFileSync(file, 'null');
    assert.throws(() => loadArticles([file]), /broken\.json: Article slug/);
});

for (const [label, editorExample] of [
    ['missing', undefined], ['empty', {}], ['blank text', { latex: '' }],
    ['non-string text', { latex: 42 }], ['unknown segment', { unknown: 'text' }],
    ['oversized URL', { latex: 'я'.repeat(400) }]
]) {
    test('article validation rejects an invalid editorExample: ' + label, t => {
        const article = { ...sample, editorExample };
        const file = path.join(temporaryDirectory(t), 'invalid-example.json');
        fs.writeFileSync(file, JSON.stringify(article));
        assert.throws(() => loadArticles([file]), /invalid-example\.json: sample:/);
        assert.throws(() => generateArticleHtml(article, loadTemplate()), /sample:/);
    });
}

test('invalid slugs cannot escape the output directory', () => {
    for (const slug of [undefined, null, '', '../outside', 'a/b', 'A', 'a.html']) {
        assert.throws(() => validateArticle({ ...sample, slug }), /slug/);
    }
});

test('article-specific social and structured metadata are escaped without losing their text', () => {
    const article = {
        ...sample, pageTitle: 'Browser title',
        ogTitle: 'Open Graph "title" < &', ogDescription: 'Open Graph description < &',
        twitterTitle: 'Twitter "title" < &', twitterDescription: 'Twitter description < &',
        schemaDescription: 'Structured description </script>',
        breadcrumbTitle: 'Visible breadcrumb', schemaBreadcrumbTitle: 'Structured breadcrumb </script>',
        sidebarImageAlt: 'Image "alt" < &'
    };
    const nodes = [];
    walk(parse(generateArticleHtml(article, loadTemplate())), node => nodes.push(node));
    const meta = key => attribute(nodes.find(node => node.tagName === 'meta' &&
        (attribute(node, 'name') === key || attribute(node, 'property') === key)), 'content');
    for (const [key, field] of Object.entries({ 'og:title': 'ogTitle', 'og:description': 'ogDescription', 'twitter:title': 'twitterTitle', 'twitter:description': 'twitterDescription' })) {
        assert.equal(meta(key), article[field]);
    }
    assert.equal(meta('description'), sample.metaDescription);
    const schemas = nodes.filter(node => attribute(node, 'type') === 'application/ld+json')
        .map(node => JSON.parse(node.childNodes.map(child => child.value || '').join('')));
    assert.equal(schemas.find(schema => schema['@type'] === 'Article').description, article.schemaDescription);
    assert.equal(schemas.find(schema => schema['@type'] === 'BreadcrumbList').itemListElement[2].name, article.schemaBreadcrumbTitle);
    assert.equal(attribute(nodes.find(node => attribute(node, 'class') === 'article-sidebar__img'), 'alt'), article.sidebarImageAlt);
});

test('CLI builds all articles from JSON alone, checks freshness and rejects orphan HTML before writing', t => {
    const directory = temporaryDirectory(t);
    const generator = path.join(directory, 'scripts/blog-generator');
    fs.cpSync(path.join(root, 'scripts/blog-generator'), generator, { recursive: true });
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    fs.mkdirSync(path.join(directory, 'src/assets/js'), { recursive: true });
    fs.copyFileSync(path.join(root, 'src/assets/js/generate-sitemap.js'), path.join(directory, 'src/assets/js/generate-sitemap.js'));
    const run = (...args) => spawnSync(process.execPath, [path.join(generator, 'generate.js'), ...args], { cwd: directory, encoding: 'utf8' });
    const build = run();
    assert.equal(build.status, 0, build.stderr);
    const articles = loadArticles();
    assert.equal(fs.readdirSync(path.join(directory, 'src/blog')).length, articles.length);
    for (const { slug } of articles) {
        assert.equal(fs.readFileSync(path.join(directory, `src/blog/${slug}.html`), 'utf8'), fs.readFileSync(path.join(root, `src/blog/${slug}.html`), 'utf8'));
    }
    assert.equal(run('--check').status, 0);
    const file = path.join(generator, 'articles-data/batch-1.json');
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const output = path.join(directory, `src/blog/${data[0].slug}.html`);
    const original = fs.readFileSync(output, 'utf8');
    data[0].editorExample = { latex: '$y$' };
    fs.writeFileSync(file, JSON.stringify(data));
    const stale = run('--check');
    assert.equal(stale.status, 1);
    assert.match(stale.stderr, /Outdated articles: latex-amsthm/);
    assert.equal(fs.readFileSync(output, 'utf8'), original, '--check must not write');
    fs.writeFileSync(path.join(generator, 'articles-data/z-invalid.json'), JSON.stringify({ ...sample, editorExample: {} }));
    const invalid = run();
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /z-invalid\.json: sample:/);
    assert.equal(fs.readFileSync(output, 'utf8'), original, 'All sources must be validated before writing');
    fs.writeFileSync(path.join(generator, 'articles-data/z-invalid.json'), JSON.stringify(sample));
    fs.writeFileSync(path.join(directory, 'src/blog/orphan.html'), 'Untracked article');
    for (const args of [[], ['--check']]) {
        const orphan = run(...args);
        assert.equal(orphan.status, 1);
        assert.match(orphan.stderr, /Article without a JSON source: orphan/);
        assert.equal(fs.readFileSync(output, 'utf8'), original);
    }
    assert.equal(run(file).status, 0, 'A selected JSON batch can still be built independently');
    assert.equal(run(file, '--check').status, 0);
    assert.notEqual(fs.readFileSync(output, 'utf8'), original);
});
