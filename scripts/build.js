const { join } = require('path');
const { statSync, readdirSync, writeFileSync } = require('fs');

const { createHTML, createBookmarkletsHTML } = require('./util');

async function run() {
  const bookmarkletsList = readdirSync(
    join(__dirname, '../bookmarklets')
  ).filter(f => statSync(join(__dirname, '../bookmarklets', f)).isDirectory());

  const bookmarkletHTML = await createBookmarkletsHTML(bookmarkletsList);
  const webpageHTML = createHTML(bookmarkletHTML);

  writeFileSync('index.html', webpageHTML);
}

run();
