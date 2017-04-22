TEST_PORT = "8080"
require 'rainbow'
LOCALES_PATH = 'locales'

if RUBY_PLATFORM == "x86_64-darwin16"
  puts "Configuring Slimer... "
  system "export SLIMERJSLAUNCHER='/Applications/Firefox.app/Contents/MacOS/firefox'"
end

# Banner helper
#
def text_banner(text = "")
  puts Rainbow("==========================================================").yellow
  puts Rainbow(text).yellow
  puts Rainbow("==========================================================").yellow
end
