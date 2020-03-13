.PHONY: bootstrap build

BIN = node_modules/.bin


bootstrap:
	@npm install

build:
	@node build.js

demo:
	@open index.html
	@$(BIN)/nodemon -e js,md build.js
