const fs = require('node:fs');
const path = require('node:path');

function vendorMath() {
    const source = path.dirname(require.resolve('katex/package.json'));
    const target = path.resolve(__dirname, '../../src/assets/vendor/katex');
    fs.mkdirSync(path.join(target, 'fonts'), { recursive: true });
    for (const [from, to] of [
        ['dist/katex.min.js', 'katex.min.js'],
        ['dist/katex.min.css', 'katex.min.css'],
        ['dist/contrib/auto-render.min.js', 'auto-render.min.js'],
        ['LICENSE', 'LICENSE']
    ]) {
        fs.copyFileSync(path.join(source, from), path.join(target, to));
    }
    for (const font of fs.readdirSync(path.join(source, 'dist/fonts'))) {
        fs.copyFileSync(path.join(source, 'dist/fonts', font), path.join(target, 'fonts', font));
    }
}

if (require.main === module) vendorMath();
module.exports = { vendorMath };
