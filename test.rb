# To start the test server do this in another console window:
#
# `ruby -run -ehttpd build -p4567`
#
# This will start a webrick server that loads only the static files.
# (This extra server is needed because
# Sometimes middleman is too slow to run the tests before timeouts.)
#
# 2015 Nov 2 CGB
#
require './test_helpers'
require './test_pagesize'
require './test_localization'

# Casper tests use casper.js
banner(" Starting casper tests")
if test_server_running?
  system("casperjs test --log-level=error test-casper.js --engine=slimerjs")
else
  puts "Sry, you need to start the test server like this:"
  puts "ruby -run -ehttpd build -p#{TEST_PORT}"
  puts "(first, shut down middleman)"
end

banner(" Starting HTML-Proofer tests".red)
# TODO We should probably rebuild the site to avoid testing stale output. — CGB 2015 Nov 6
# For now, make sure you `be middleman build` before running this.
HTML::Proofer.new("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run

banner("Starting pagespeed")
system("gulp pagespeed")