---
name: blog-article
description: Create or update LabkeeperPages blog articles with readable math, responsive markup and a runnable editor example. Use for articles in src/blog and the scripts/blog-generator pipeline, not for unrelated landing-page changes.
---

# Labkeeper blog articles

Read `scripts/blog-generator/HOW-TO-WRITE-ARTICLES.md` for content, SEO and batch conventions, and the editor-example section of `scripts/blog-generator/README.md` for the build contract.

- Inspect existing slugs before adding a page. Preserve existing URLs, canonical metadata, navigation and publication dates when correcting an article.
- Edit the article's JSON in `scripts/blog-generator/articles-data`. If a matching source exists in `data-builders`, update it as well. Older articles without JSON keep their HTML as the source; do not replace them with generic template content.
- Add a dedicated entry keyed by the article slug to `scripts/blog-generator/editor-examples.js`. The example must demonstrate the article's subject, not repeat a generic greeting. Use one or more supported segment fields: `latex`, `markdown`, `compute`.
- Keep examples short and self-contained. Include required LaTeX packages. Replace unavailable figures with a drawn diagram, and embed small data/bibliography files when needed. Do not require uploads, shell escape, secrets or third-party services. Explain any illustrative substitution in the article when it changes what the example demonstrates.
- The complete encoded URL must fit the generator's 2000-character budget. Use `buildExampleUrl`; do not concatenate query strings or truncate code to make a link fit. Unicode and TeX special characters must round-trip unchanged.
- Keep the generated `example=1` parameter. It selects the editor's temporary preview without overwriting a draft or personal project. Verify repeat opening and deploy the editor support before publishing these links.
- Use `$...$`, `$$...$$`, `\(...\)` or `\[...\]` for math in prose. Put literal syntax in `<code>` or `<pre><code>`; escape HTML there. The local KaTeX renderer deliberately skips code. Check that rendered formulas have no errors.
- Wrap wide tables in `.article-table-wrapper`. Long code blocks must scroll inside their container, not widen the page. Keep heading and TOC anchors consistent.
- Both article CTAs must use the article example and `data-i18n="blog-example"`. The generator supplies Russian and English labels without changing the generic header link to the editor.

Run `npm run blog:generate`, `npm run blog:check`, `npm test`, `npm run lint`, then `npm run test:blog`. Verify representative pages visually at desktop and mobile widths. For new or changed examples, open the resulting link in the target editor and verify the rendered result, not only HTTP success. Distinguish local page checks from actual compilation checks; report environment or compiler limitations instead of calling an untested example verified.

Review the generated diff, including catalog cards, the recommendation registry and sitemap for new articles. Do not commit, push, deploy or create a PR unless that action was requested.
