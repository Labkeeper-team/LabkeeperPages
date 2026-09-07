const fs = require('fs');
const path = require('path');

const a1 = require('./articles-44-48');
const a2 = require('./articles-49-53');
const a3 = require('./articles-54-58');
const a4 = require('./articles-59-63');
const a5 = require('./articles-64-68');

const all25 = [...a1, ...a2, ...a3, ...a4, ...a5];

console.log(`Loaded ${all25.length} articles.`);

if (all25.length !== 25) {
    throw new Error(`Expected 25 articles, but got ${all25.length}`);
}

// Проверка уникальности slug
const slugs = new Set();
for (const art of all25) {
    if (!art.slug) {
        throw new Error(`Article without slug: ${art.title}`);
    }
    if (slugs.has(art.slug)) {
        throw new Error(`Duplicate slug found: ${art.slug}`);
    }
    slugs.add(art.slug);

    if (!Array.isArray(art.keywords) || art.keywords.length < 2) {
        throw new Error(`Article ${art.slug} has less than 2 keywords`);
    }

    if (art.batch !== 2) {
        throw new Error(`Article ${art.slug} batch must be 2, got ${art.batch}`);
    }
}

const outputPath = path.resolve(__dirname, '..', 'articles-data', 'batch-2-new-25.json');
fs.writeFileSync(outputPath, JSON.stringify(all25, null, 2), 'utf8');
console.log(`Saved 25 articles to: ${outputPath}`);
