require_relative './helpers'

# 1. Run casper tests to ensure redirection and RTL
#
system 'casperjs test --log-level=error test/casper.js --engine=slimerjs'

# 2. Run wraith to check for CSS regressions
#
text_banner(" Starting Wraith CSS regression tests")

# Check for screenshot history first, if it's missing, create it so this test will work next time
# See http://bbc-news.github.io/wraith
if Dir.exists?('./test/screenshot_history')
	text_banner("Creating latest screenshots and comparing to history...")
	system 'wraith latest test/wraith.yml'
else
	text_banner("There is no screenshot history yet. Creating it...")
	system 'wraith history test/wraith.yml'
end

# 3. Run HTML Proofer to check for broken links
#
text_banner("Starting HTML-Proofer tests")
HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run

# 4. Check localization of the site
#
text_banner("Starting localization check")
require_relative "./localization.rb"
