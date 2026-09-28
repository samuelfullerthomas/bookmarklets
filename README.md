# bookmarklets

This is a collection of useful bookmarklets that I've created / found over the years. This repo allows me to keep track of and update the bookmarklets, which are show at:

https://samuelfullerthomas.github.io/bookmarklets/

## Development

Requires Node 24 (`nvm use`).

```bash
npm ci
npm run watch   # rebuild dist/index.html on changes
npm test        # eslint + tsc type-check + prettier check + build tests
npm run build   # build the page into dist/index.html
```

Pushing to `master` builds the page and deploys it to GitHub Pages; the built
HTML isn't committed.

Add a bookmarklet as `bookmarklets/<name>/index.js` plus a `README.md` whose
`# heading` becomes the link text. Each bookmarklet is bundled with esbuild,
so it can `import` shared helpers. Type-checking uses JSDoc
comments; there is no TypeScript source.
