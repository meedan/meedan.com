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

text_banner 'Rebuilding the site and starting test server...'

system `rm -rf build`

# Rebuild the site to ensure we test the latest static output
system 'npm run build'

text_banner 'Starting server...'
# Start the server, and note the server PID so we can stop it post test
# system 'node server.js && echo $! > tmp/server.pid'
system 'node server.js &'

text_banner 'Starting test...'

# 1. Run casper tests to ensure redirection and RTL
#
text_banner("Starting Casper route tests...")
system 'casperjs test --log-level=error test/casper.js --engine=slimerjs'

# 2. Run HTML Proofer to check for broken links
#
text_banner("Starting HTML-Proofer tests...")
HTMLProofer.check_directory("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run

# 3. Check localization of the site
#
text_banner("Starting localization check...")
require_relative "./localization.rb"

# 4. Check for accessibility issues
#
system 'a11y ./build/**/*.html'

text_banner 'Post test cleanup...'

# require_relative "./helpers"

# text_banner 'Stopping test server...'

# Shut down the server, but swallow errors if something goes wrong
# system 'kill $(cat test/server.pid) || true'
# system 'rm test/server.pid || true'

