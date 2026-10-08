const { test, expect } = require('@playwright/test');
const examples = require('../../scripts/blog-generator/editor-examples');
const { buildExampleUrl } = require('../../scripts/blog-generator/article-tools');

async function setLanguage(page, language) {
    const burger = page.locator('.js-burger-btn');
    if (await burger.isVisible() && !(await page.locator('.js-nav').evaluate(nav => nav.classList.contains('header__nav--open')))) {
        await burger.click();
    }
    const button = page.locator(`.js-lang-switcher [data-lang="${language}"]:visible`);
    await button.click();
}

for (const [slug, example] of Object.entries(examples)) {
    test(`${slug}: layout, math and localized example links`, async ({ page }) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`/blog/${slug}`);
        await expect(page.locator('.article-content')).toHaveAttribute('data-math-ready', 'true');
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('.katex-error')).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
        await expect(page.locator('.article-content pre code *')).toHaveCount(0);
        const links = page.locator('[data-blog-example]');
        await expect(links).toHaveCount(2);
        for (const link of await links.all()) {
            await expect(link).toHaveAttribute('href', buildExampleUrl(example));
            await expect(link).toContainText('Просмотреть пример в редакторе');
        }
        await setLanguage(page, 'en');
        for (const link of await links.all()) await expect(link).toContainText('View example in editor');
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
        await setLanguage(page, 'ru');
        await expect(links.last()).toContainText('Просмотреть пример в редакторе');
        expect(errors).toEqual([]);
    });
}

test('math is rendered, while the original code remains copyable', async ({ page }) => {
    await page.goto('/blog/indirect-measurement-error-calculation-lab-report');
    await expect(page.locator('.article-section .katex').first()).toBeVisible();
    await expect(page.locator('.article-section pre code').first()).toContainText('\\Delta');
    await expect(page.locator('pre .katex, code .katex')).toHaveCount(0);
});

test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('example links work', async ({ page }) => {
        await page.goto('/blog/latex-formulas');
        await expect(page.locator('[data-blog-example]').last()).toHaveAttribute('href', buildExampleUrl(examples['latex-formulas']));
        await page.locator('[data-blog-example]').last().click();
        expect(new URL(page.url()).searchParams.get('latex')).toBe(examples['latex-formulas'].latex);
    });
});
