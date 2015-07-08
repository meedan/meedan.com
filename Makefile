

setup:
	npm install -g bower
	npm install -g gulp
	npm install
	bower install
	echo "======== OPTIONAL: if you want to run `gulp images`, install graphicsmagick (brew install graphicsmagick or apt-get install graphicsmagick)"
	echo "======== OPTIONAL: if you want to run `gulp test`, install casperjs (brew install casperjs)"

.PHONY: setup

watch:
	gulp default

.PHONY: watch
