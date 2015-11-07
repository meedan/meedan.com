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
require 'colorize'
LOCALES_PATH = 'locales'

# Languages
#
lang_1_name = "en"
lang_2_name = "ar"

# Data from YAML files
#
lang_1_data = YAML.load_file(File.join(LOCALES_PATH,lang_1_name + ".yml"))
lang_2_data = YAML.load_file(File.join(LOCALES_PATH,lang_2_name + ".yml"))

# Recursive diff
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

# Meedan.com Tests
#
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

puts "==========================================".red
puts " Starting casper tests".red
puts " Make sure the build is running on port ".red
puts "==========================================".red
system("casperjs test --log-level=error test.js --engine=slimerjs")

puts "==========================================".red
puts " Starting HTML-Proofer tests".red
puts "==========================================".red
require 'html/proofer'

# We ignore some URLs because they are just aliases
#
HTML::Proofer.new("./build", { :url_ignore => ["/bridge", "/checkdesk", "/about"]}).run

puts "==========================================".red
puts " Starting response size tests".red
puts "==========================================".red
require 'net/http'

MEGABYTE = 1024.0 * 1024.0
def bytes_to_meg bytes
  bytes /  MEGABYTE
end

response = nil
["/en/", "/ar/", "/en/checkdesk", "/ar/checkdesk", "/en/bridge", "/ar/bridge", "/en/about", "/ar/about"].each do |link|
  Net::HTTP.start('localhost', 4567) do |http|
   response = http.get(link)
   size = bytes_to_meg(response.body.size).to_s.slice(0,6)
   puts "#{link} is #{size}" + " MB"
  end
end