TEST_PORT = "8080"
require 'rubygems'
require 'yaml'
require 'net/http'
require 'pry'
require 'rainbow'
require 'html-proofer'

LOCALES_PATH = 'locales'
PAGES = ["/en/", "/ar/", "/en/check/", "/ar/check/", "/en/bridge/", "/ar/bridge/", "/en/about/", "/ar/about/"]
LEGACY_PATHS = ["/bridge", "/en/checkdesk/", "/ar/checkdesk/", "/checkdesk", "/about", "/"]

system "export SLIMERJSLAUNCHER='/Applications/Firefox.app/Contents/MacOS/firefox'"

# Banner helper
#
def text_banner(text = "")
  puts "==========================================================".yellow
  puts text.yellow
  puts "==========================================================".yellow
end
