

setup:
	npm install -g bower
	npm install -g gulp
	npm install
	bower install
	echo "======== OPTIONAL: if you want to run `gulp images`, install graphicsmagick (brew install graphicsmagick or apt-get install graphicsmagick)"

.PHONY: setup

watch:
	gulp default

.PHONY: watch
