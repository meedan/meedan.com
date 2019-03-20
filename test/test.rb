require 'html-proofer'
require 'rainbow'

# Banner helper
#
def text_banner(text = "")
  puts Rainbow("==========================================================").yellow
  puts Rainbow(text).yellow
  puts Rainbow("==========================================================").yellow
end

if RUBY_PLATFORM == "x86_64-darwin16"
  puts "Configuring Slimer for Mac... "
  system "export SLIMERJSLAUNCHER='/Applications/Firefox.app/Contents/MacOS/firefox'"
else
  puts "WARNING: Make sure you set SLIMERJSLAUNCHER to your Firefox path..."
end

# Start the server
#
text_banner("Starting server...")
system 'node server.js &'

# Run casper tests to ensure redirection and RTL
#
text_banner("Starting tests...")
text_banner("Starting Casper route tests...")
system 'casperjs test --log-level=error test/casper.js --engine=slimerjs' or raise "Casper route tests failed!"

# Run HTML Proofer to check for broken links
#
text_banner("Starting HTML Proofer tests...")
HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :only_4xx => true,
  :allow_hash_href => true
}).run

# Check for accessibility issues
#
text_banner("Starting accessibility tests...")
system 'a11y ./build/**/*.html' or raise "Accessibility tests failed!"

# Check localization of the site
#
text_banner("Starting localization check...")
require_relative "./localization.rb"
