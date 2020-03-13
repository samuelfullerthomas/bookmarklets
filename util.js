const { convert } = require('bookmarklet');
const { readFileSync } = require('fs');
const { join } = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function createHTML(bookmarkletHTML) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>sam's bookmarklets page</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://user-images.githubusercontent.com/10165959/72994059-5e30f900-3dee-11ea-8ed2-54fa62961538.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://user-images.githubusercontent.com/10165959/72994194-8f112e00-3dee-11ea-9673-ae29fee0a9aa.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://user-images.githubusercontent.com/10165959/72994195-90daf180-3dee-11ea-9708-50d94ef2a77a.png"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      />
      <style>
        body {
          text-align: center;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }
        .shadow {
          width: 300px;
          box-shadow: 3px 3px 5px 6px #ccc;
        }
        .page-footer {
          background: #0000001a;
        }
        main {
          flex: 1 0 auto;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>sam's bookmarklets page</h1>
        <div>some bookmarklets for usefull things</div>
      </header>
      <main>
        <div class="row">
          <div class="col s6">
            <h3>bookmarklets</h3>
            ${bookmarkletHTML}
          </div>
          <div class="col s6">
            <h4>installing a bookmarklet</h4>
            <p>
              drag the link into your toolbar, and click on it to run the
              bookmarklet
            </p>
            <img
              class="shadow"
              src="https://user-images.githubusercontent.com/10165959/72991898-b960ec80-3dea-11ea-89c5-3c33f6d266c2.gif"
              alt="installing a bookmarklet"
            />
          </div>
        </div>
      </main>
      <footer class="page-footer">
        <div class="row">
          <a class="col s3" href="https://samthomas.io">samthomas.io</a>
          <a class="col s3" href="https://samuelfullerthomas.com"
            >samuelfullerthomas.com</a
          >
          <a class="col s3" href="https://thomasarchive.com">thomasarchive.com</a>
          <a class="col s3" href="https://github.com/samuelfullerthomas"
            >github.com/samuelfullerthomas</a
          >
        </div>
      </footer>
    </body>
  </html>
  `;
}

function createBookmarkletsHTML(bookmarkletsList) {
  return bookmarkletsList.reduce((html, marklet) => {
    const bookmarkletJS = convert(
      readFileSync(join(__dirname, `bookmarklets/${marklet}/index.js`)),
      {}
    );
    const docs = readFileSync(
      join(__dirname, `bookmarklets/${marklet}/README.md`),
      'utf8'
    );
    const bookmarkletDocs = md.render(docs).replace(
      /<h1>(.*)<\/h1>/,
      `
      <h4>
        <a
          class="bookmarklet"
          href="${bookmarkletJS}"
        >
          $1
        </a>
      </h4>`
    );

    html =
      html +
      `
      <div>
          ${bookmarkletDocs}
      </div>
    `;
    return html;
  }, '');
}

module.exports = {
  createHTML,
  createBookmarkletsHTML,
};
