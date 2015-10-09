

setup:
	gem install bundler
	npm install -g bower
	npm install -g gulp
	npm install
	bower install
	echo "======== OPTIONAL: if you want to run `npm test`, install casperjs (brew install casperjs)"

.PHONY: setup

watch:
	gulp default

.PHONY: watch
