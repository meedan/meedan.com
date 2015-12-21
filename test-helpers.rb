TEST_PORT = "4567"
require 'rubygems'
require 'yaml'
require 'net/http'
require 'pry'
require 'rainbow'
require 'html/proofer'

LOCALES_PATH = 'locales'
PAGES = ["/en/", "/ar/", "/en/checkdesk/", "/ar/checkdesk/", "/en/bridge/", "/ar/bridge/", "/en/about/", "/ar/about/"]
LEGACY_PATHS = ["/bridge", "/checkdesk", "/about", "/"]

# Banner helper
#
def banner(text = "")
  puts "==========================================".red
  puts text.red
  puts "==========================================".red
end

# Helper to avoid hanging when server is not ready
#
# Ideally this should just boot the server — CGB 2015 Nov 6
def url_exists?(url_string)
  url = URI.parse(url_string)
  req = Net::HTTP.new(url.host, url.port)
  req.use_ssl = (url.scheme == 'https')
  path = url.path
  res = req.request_head(path || '/')
  if res.kind_of?(Net::HTTPRedirection)
    url_exists?(res['location']) # Go after any redirect and make sure you can access the redirected URL
  else
    res.code[0] != "4" #false if http code starts with 4 - error on your side.
  end
rescue Errno::ECONNREFUSED
  false
rescue Errno::ENOENT
  false
end

def test_server_running?
  url_exists?("http://127.0.0.1:#{TEST_PORT}/")
end