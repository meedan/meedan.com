# To start the test server do this in another console window:
#
# `ruby -run -ehttpd build -p8000`

require 'rubygems'
require 'yaml'
require 'colorize'
LOCALES_PATH = 'locales'

lang_1_name = "en"
lang_2_name = "ar"

lang_1_data = YAML.load_file(File.join(LOCALES_PATH,lang_1_name + ".yml"))
lang_2_data = YAML.load_file(File.join(LOCALES_PATH,lang_2_name + ".yml"))

def diff(root, compared, structure = [])
  root.each_key do |key|
    next_root     = root[key]
    next_compared = compared.nil? ? nil : compared[key]
    new_structure = structure.dup << key
    puts "#{new_structure.join(".")}" if compared.nil? || compared[key].nil?
    diff(next_root, next_compared, new_structure) if next_root.kind_of? Hash
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

puts "==========================================".red
puts " Starting casper tests".red
puts " Make sure the build is running on port ".red
puts "==========================================".red

system("casperjs test --log-level=error test.js --engine=slimerjs")

puts "==========================================".red
puts " Starting HTML-Proofer tests".red
puts "==========================================".red
require 'html/proofer'
HTML::Proofer.new("./build", { :url_ignore => ["/bridge", "/checkdesk", "/about"]}).run
