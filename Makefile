.PHONY: bootstrap build

BIN = node_modules/.bin


bootstrap:
	@npm install

build:
	@node scripts/build.js

demo:
	@open index.html
	@$(BIN)/nodemon -e js,md scripts/build.js
