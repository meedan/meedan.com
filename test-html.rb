require './test-helpers'

banner(" Starting HTML-Proofer tests".red)

HTML::Proofer.new("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run