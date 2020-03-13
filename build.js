const { join } = require('path');
const { statSync, readdirSync, writeFileSync } = require('fs');

const { createHTML, createBookmarkletsHTML } = require('./util');

function run() {
  const bookmarkletsList = readdirSync('bookmarklets').filter(f =>
    statSync(join('bookmarklets', f)).isDirectory()
  );
  const bookmarkletHTML = createBookmarkletsHTML(bookmarkletsList);

  writeFileSync('index.html', createHTML(bookmarkletHTML));
}

run();
