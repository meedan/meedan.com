

setup:
	gem install bundler
	npm install -g gulp
	npm install
	echo "======== OPTIONAL: if you want to run `npm run test`: `mkdir tmp && npm install -g casperjs slimerjs`"

.PHONY: setup

watch:
	bundle exec middleman --verbose

.PHONY: watch
