# To start the test server do this in another console window:
#
# `ruby -run -ehttpd build -p4567`
#
# This will start a webrick server that loads only the static files.
# (This extra server is needed because
# Sometimes middleman is too slow to run the tests before timeouts.)
#
# 2015 Nov 2 CGB
#
require 'rubygems'
require 'yaml'
require 'net/http'
require 'pry'
require 'rainbow'
require 'html/proofer'

LOCALES_PATH = 'locales'
PAGES = ["/en/", "/ar/", "/en/checkdesk", "/ar/checkdesk", "/en/bridge", "/ar/bridge", "/en/about", "/ar/about"]
LEGACY_PATHS = ["/bridge", "/checkdesk", "/about", "/"]

lang_1_name = "en"
lang_2_name = "ar"

# Data from YAML files
#
lang_1_data = YAML.load_file(File.join(LOCALES_PATH,lang_1_name + ".yml"))
lang_2_data = YAML.load_file(File.join(LOCALES_PATH,lang_2_name + ".yml"))

# Recursive diff for YAML comparison
#
def diff(root, compared, structure = [])
  root.each_key do |key|
    next_root     = root[key]
    next_compared = compared.nil? ? nil : compared[key]
    new_structure = structure.dup << key
    puts "#{new_structure.join(".")}" if compared.nil? || compared[key].nil?
    diff(next_root, next_compared, new_structure) if next_root.kind_of? Hash
  end
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
  url_exists?("http://127.0.0.1:4567/")
end

# Helper to measure page sizes
#
MEGABYTE = 1024.0 * 1024.0
def bytes_to_megabytes bytes
  bytes /  MEGABYTE
end


puts "==========================================".red
puts " Starting casper tests".red
puts "==========================================".red

if test_server_running?
  system("casperjs test --log-level=error test.js --engine=slimerjs")
else
  puts "Sry, you need to start the test server like this:"
  puts "ruby -run -ehttpd build -p4567"
end

puts "==========================================".red
puts " Starting HTML-Proofer tests".red
puts "==========================================".red

# We should probably rebuild the site to avoid testing stale output. — CGB 2015 Nov 6
HTML::Proofer.new("./build", {
  :verbose => true,
  :check_html => true,
  :url_ignore => LEGACY_PATHS
  }).run

puts "==========================================".red
puts " Starting response size tests".red
puts "==========================================".red

if test_server_running?
  response = nil
  PAGES.each do |link|
    Net::HTTP.start('localhost', 4567) do |http|
     response = http.get(link)
     size = bytes_to_megabytes(response.body.size).to_s.slice(0,6)
     puts "#{link} is #{size}" + " MB"
    end
  end
end

puts "==========================================".blue
puts " MISSING FROM #{lang_2_name}.yml".blue
puts "==========================================".blue
diff(lang_1_data[lang_1_name], lang_2_data[lang_2_name], [lang_2_name])

puts "==========================================".green
puts " MISSING FROM #{lang_1_name}.yml".green
puts "==========================================".green
diff(lang_2_data[lang_2_name], lang_1_data[lang_1_name], [lang_1_name])

puts "==========================================".green
puts " Starting".green
puts "==========================================".green
system("gulp pagespeed")
