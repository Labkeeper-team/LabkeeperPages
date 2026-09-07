const fs = require('fs');
const path = require('path');

const a1 = require('./articles-1-5');
const a2 = require('./articles-6-10');
const a3 = require('./articles-11-15');
const a4 = require('./articles-16-20');
const a5 = require('./articles-21-25');

const all25 = [...a1, ...a2, ...a3, ...a4, ...a5];

console.log(`Loaded ${all25.length} articles.`);

// Проверка уникальности slug
const slugs = new Set();
for (const art of all25) {
    if (slugs.has(art.slug)) {
        throw new Error(`Duplicate slug found: ${art.slug}`);
    }
    slugs.add(art.slug);
}

const outputPath = path.resolve(__dirname, '..', 'articles-data', 'batch-2-25.json');
fs.writeFileSync(outputPath, JSON.stringify(all25, null, 2), 'utf8');
console.log(`Saved 25 articles to: ${outputPath}`);
