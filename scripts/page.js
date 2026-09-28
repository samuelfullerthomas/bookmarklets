import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const INSTALL_GIF =
  'https://user-images.githubusercontent.com/10165959/' +
  '72991898-b960ec80-3dea-11ea-89c5-3c33f6d266c2.gif';

/** @param {string} text */
const escapeHTML = text =>
  text.replace(
    /[&<>"']/g,
    char =>
      /** @type {Record<string, string>} */ ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]
  );

/**
 * @param {{ docs: string, url: string }} bookmarklet
 *   `docs` is the README (its `# heading` becomes the link text) and `url`
 *   the percent-encoded `javascript:` URL, which is safe inside an attribute.
 */
export function renderBookmarklet({ docs, url }) {
  const html = md.render(docs).replace(
    /<h1>(.*)<\/h1>/,
    (_, title) => `
      <h3 class="bookmarklet-title">
        <a class="bookmarklet" href="${url}">${title}</a>
        <button type="button" class="copy" data-copy>
          Copy<span class="visually-hidden"> ${title} bookmarklet</span>
        </button>
        <span class="copy-status" role="status"></span>
      </h3>`
  );
  return `<article class="card">${html}</article>`;
}

/**
 * @param {{
 *   title: string,
 *   tagline: string,
 *   footerLinks: { href: string, label: string }[],
 * }} site
 * @param {string[]} bookmarkletsHTML
 */
export function renderPage(site, bookmarkletsHTML) {
  const footer = site.footerLinks
    .map(
      ({ href, label }) =>
        `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHTML(site.title)}</title>
    <style>
      :root {
        color-scheme: light dark;
        --accent: #1372ec;
        --muted: color-mix(in srgb, currentColor 60%, transparent);
        --border: color-mix(in srgb, currentColor 15%, transparent);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font: 16px/1.5 system-ui, -apple-system, 'Segoe UI', sans-serif;
      }
      header, main, footer {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 1.5rem;
      }
      header { text-align: center; }
      header p { color: var(--muted); margin: 0; }
      main {
        flex: 1;
        display: grid;
        gap: 2rem;
        grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
        align-items: start;
      }
      @media (max-width: 760px) {
        main { grid-template-columns: 1fr; }
      }
      .card {
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 0.25rem 1rem;
        margin-bottom: 1rem;
      }
      .bookmarklet-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
      }
      .bookmarklet {
        color: var(--accent);
        border: 1px dashed var(--accent);
        border-radius: 6px;
        padding: 0.1rem 0.6rem;
        text-decoration: none;
        cursor: grab;
      }
      .copy {
        font: inherit;
        font-size: 0.8rem;
        padding: 0.2rem 0.6rem;
        border: 1px solid var(--border);
        border-radius: 6px;
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .copy:focus-visible, .bookmarklet:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
      .copy-status { font-size: 0.8rem; color: var(--muted); }
      .install img {
        max-width: 100%;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgb(0 0 0 / 20%);
      }
      footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem 2rem;
        border-top: 1px solid var(--border);
      }
      a { color: var(--accent); }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHTML(site.title)}</h1>
      <p>${escapeHTML(site.tagline)}</p>
    </header>
    <main>
      <section aria-labelledby="bookmarklets-heading">
        <h2 id="bookmarklets-heading">Bookmarklets</h2>
        ${bookmarkletsHTML.join('\n')}
      </section>
      <aside class="install" aria-labelledby="install-heading">
        <h2 id="install-heading">Installing a bookmarklet</h2>
        <p>
          Drag the link into your bookmarks bar, then click the bookmark to
          run it. If dragging doesn't work, press <strong>Copy</strong> and
          paste the result as the URL of a new bookmark.
        </p>
        <img
          src="${INSTALL_GIF}"
          alt="Dragging a bookmarklet link into the bookmarks bar"
        />
      </aside>
    </main>
    <footer>
      ${footer}
    </footer>
    <script>
      document.addEventListener('click', async event => {
        const button = event.target.closest('[data-copy]');
        if (!button) return;
        const title = button.closest('.bookmarklet-title');
        const status = title.querySelector('.copy-status');
        try {
          await navigator.clipboard.writeText(
            title.querySelector('.bookmarklet').href
          );
          status.textContent = 'Copied';
        } catch {
          status.textContent = 'Copy failed';
        }
        setTimeout(() => (status.textContent = ''), 2000);
      });
    </script>
  </body>
</html>
`;
}
