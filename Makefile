

setup:
	gem install bundler
	npm install -g gulp
	npm install
	echo "======== OPTIONAL: if you want to run `npm test`, install casperjs (brew install casperjs)"

.PHONY: setup

watch:
	bundle exec middleman --verbose

.PHONY: watch
