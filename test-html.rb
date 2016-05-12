require './test-helpers'

banner(" Starting HTML-Proofer tests".red)

HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run