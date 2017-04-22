require_relative './helpers'

# 1. Run casper tests to ensure redirection and RTL
#
text_banner("Starting Casper route tests")
system 'casperjs test --log-level=error test/casper.js --engine=slimerjs'

# 2. Run HTML Proofer to check for broken links
#
text_banner("Starting HTML-Proofer tests")
HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run

# 3. Check localization of the site
#
text_banner("Starting localization check")
require_relative "./localization.rb"

# 4. Check for accessibility issues
#
system 'a11y ./build/**/*.html'
