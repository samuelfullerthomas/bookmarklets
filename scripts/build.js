import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import site from '../site.config.js';
import {
  ROOT_DIR,
  buildBookmarklet,
  listBookmarklets,
  readBookmarklet,
} from './bookmarklets.js';
import { renderBookmarklet, renderPage } from './page.js';

const OUT_DIR = join(ROOT_DIR, 'dist');

const bookmarkletsHTML = await Promise.all(
  listBookmarklets().map(async name =>
    renderBookmarklet({
      docs: readBookmarklet(name).docs,
      url: await buildBookmarklet(name),
    })
  )
);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'index.html'), renderPage(site, bookmarkletsHTML));
