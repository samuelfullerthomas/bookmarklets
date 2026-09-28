import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  buildBookmarklet,
  listBookmarklets,
  readBookmarklet,
} from './bookmarklets.js';
import { renderBookmarklet } from './page.js';

const bookmarklets = listBookmarklets();

test('finds bookmarklets', () => {
  assert.ok(bookmarklets.length > 0);
});

for (const name of bookmarklets) {
  describe(name, () => {
    test('has an index.js and a README.md with a # heading', () => {
      const { js, docs } = readBookmarklet(name);
      assert.ok(js.trim(), 'index.js is empty');
      assert.match(docs, /^# \S/m, 'README.md needs a "# heading"');
    });

    test('builds to a valid, fully encoded javascript: URL', async () => {
      const url = await buildBookmarklet(name);
      assert.ok(url.startsWith('javascript:'));

      // A raw #, ", < or > or whitespace can truncate or corrupt the URL.
      const payload = url.slice('javascript:'.length);
      assert.doesNotMatch(payload, /[#"\s<>]/);

      // new Function also rejects leftover import/export statements.
      const code = decodeURIComponent(payload);
      assert.doesNotThrow(() => new Function(code), 'does not parse');
    });

    test('renders a link and a copy button', async () => {
      const url = await buildBookmarklet(name);
      const html = renderBookmarklet({ docs: readBookmarklet(name).docs, url });
      assert.ok(html.includes(`href="${url}"`));
      assert.match(html, /<button type="button" class="copy" data-copy>/);
    });
  });
}
