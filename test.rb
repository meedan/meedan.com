require './test-helpers'

# 1. Run wraith to check for CSS regressions
banner(" Starting Wraith CSS regression tests".red)

# To work there must be reference screenshots
# See http://bbc-news.github.io/wraith
#
if Dir.exists?('screenshot_history')
	banner("Creating latest screenshots and comparing to history...".red)
	system 'wraith latest wraith.yml'
else
	banner("There is no screenshot history yet. Creating history for next time...".red)
	system 'wraith history wraith.yml'
end

# 2. Run HTML Proofer to check for broken links
#
banner(" Starting HTML-Proofer tests".red)
HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run
