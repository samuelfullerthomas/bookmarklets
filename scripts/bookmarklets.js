import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from 'esbuild';

export const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
export const BOOKMARKLETS_DIR = join(ROOT_DIR, 'bookmarklets');

/** @returns {string[]} the bookmarklet folder names */
export function listBookmarklets() {
  return readdirSync(BOOKMARKLETS_DIR).filter(name =>
    statSync(join(BOOKMARKLETS_DIR, name)).isDirectory()
  );
}

/** @param {string} name */
export function readBookmarklet(name) {
  /** @param {string} file */
  const read = file => readFileSync(join(BOOKMARKLETS_DIR, name, file), 'utf8');
  return { js: read('index.js'), docs: read('README.md') };
}

/**
 * Bundles a bookmarklet (inlining anything it imports), minifies it into a
 * single IIFE and percent-encodes it as a `javascript:` URL.
 *
 * @param {string} name
 * @returns {Promise<string>}
 */
export async function buildBookmarklet(name) {
  const result = await build({
    entryPoints: [join(BOOKMARKLETS_DIR, name, 'index.js')],
    bundle: true,
    format: 'iife',
    minify: true,
    target: 'es2020',
    platform: 'browser',
    legalComments: 'none',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text.trim();
  return `javascript:${encodeURIComponent(code)}`;
}
