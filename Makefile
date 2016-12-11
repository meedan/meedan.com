

setup:
	gem install bundler
	npm install -g gulp
	npm install
	echo "======== OPTIONAL: if you want to run the tests, `brew install imagemagick casperjs`"

.PHONY: setup

watch:
	bundle exec middleman --verbose

.PHONY: watch
