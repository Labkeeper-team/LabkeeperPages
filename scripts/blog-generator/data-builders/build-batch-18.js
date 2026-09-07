const fs = require('fs');
const path = require('path');

const a1 = require('./articles-26-34');
const a2 = require('./articles-35-43');

const all18 = [...a1, ...a2];

console.log(`Loaded ${all18.length} articles.`);

// Проверка уникальности slug
const slugs = new Set();
for (const art of all18) {
    if (slugs.has(art.slug)) {
        throw new Error(`Duplicate slug found: ${art.slug}`);
    }
    slugs.add(art.slug);
}

const outputPath = path.resolve(__dirname, '..', 'articles-data', 'batch-2-18.json');
fs.writeFileSync(outputPath, JSON.stringify(all18, null, 2), 'utf8');
console.log(`Saved 18 articles to: ${outputPath}`);
