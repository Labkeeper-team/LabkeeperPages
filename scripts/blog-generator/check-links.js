const fs = require('fs');
const files = fs.readdirSync('src/blog').filter(f => f.endsWith('.html'));

let withLinks = [];
let withoutLinks = [];

for (const f of files) {
    const c = fs.readFileSync('src/blog/' + f, 'utf8');
    if (c.includes('Пачка 2')) {
        const matches = c.match(/<a\s+href="\/blog\/[a-z0-9-]+"[^>]*>[\s\S]*?<\/a>/gi) || [];
        // filter out /blog (catalog) and anchor tags
        const articleLinks = matches.filter(m => !m.includes('/blog"') && !m.includes('/blog#'));
        if (articleLinks.length > 0) {
            withLinks.push({ file: f, count: articleLinks.length, links: articleLinks });
        } else {
            withoutLinks.push(f);
        }
    }
}

console.log('Batch 2 articles WITH content links:', withLinks.length);
console.log('Batch 2 articles WITHOUT content links:', withoutLinks.length);
if (withoutLinks.length > 0) {
    console.log('Without links files:', withoutLinks);
}

const existingHtmlSet = new Set(files);
let brokenLinks = [];
let totalLinksCount = 0;

for (const item of withLinks) {
    for (const link of item.links) {
        totalLinksCount++;
        const targetSlugMatch = link.match(/href="\/blog\/([a-z0-9-]+)"/i);
        if (targetSlugMatch) {
            const targetSlug = targetSlugMatch[1];
            if (!existingHtmlSet.has(targetSlug + '.html')) {
                brokenLinks.push({ from: item.file, target: targetSlug, link: link });
            }
        }
    }
}

console.log('Total content links checked:', totalLinksCount);
console.log('Broken link targets count:', brokenLinks.length);
if (brokenLinks.length > 0) {
    console.log('Broken links:', brokenLinks);
}
