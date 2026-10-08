const fs = require('fs');
const path = require('path');
const { buildExampleUrl } = require('./article-tools');

const DATA_DIR = path.join(__dirname, 'articles-data');

function validateArticle(article) {
    if (!article || typeof article.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
        throw new Error('Article slug must contain lowercase letters, numbers and hyphens');
    }
    buildExampleUrl(article.editorExample, article.slug);
}

function loadArticles(files) {
    const articleFiles = files || fs.readdirSync(DATA_DIR)
        .filter(file => file.endsWith('.json')).sort()
        .map(file => path.join(DATA_DIR, file));
    const articles = [];
    const slugs = new Set();
    for (const file of articleFiles) {
        try {
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            for (const article of Array.isArray(data) ? data : [data]) {
                validateArticle(article);
                if (slugs.has(article.slug)) throw new Error(`Duplicate article: ${article.slug}`);
                slugs.add(article.slug);
                articles.push(article);
            }
        } catch (error) {
            throw new Error(`${file}: ${error.message}`, { cause: error });
        }
    }
    if (!articles.length) throw new Error('No articles found in JSON sources');
    return articles;
}

module.exports = { loadArticles, validateArticle };
