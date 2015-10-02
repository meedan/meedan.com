require 'rubygems'
require 'yaml'

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

puts "========================================== \n"
puts " MISSING FROM #{lang_2_name} "
puts "========================================== \n"
diff(lang_1_data[lang_1_name], lang_2_data[lang_2_name], [lang_2_name])

puts "========================================== \n"
puts " MISSING FROM #{lang_1_name}"
puts "========================================== \n"
diff(lang_2_data[lang_2_name], lang_1_data[lang_1_name], [lang_1_name])


# puts "======================================================= \n"
# puts "Add keys from primary locale to secondary locale? [y/n]"
# puts "======================================================= \n"

# if gets.chomp == "y"
#   puts "=> ok, loading #{lang_1_name} ..."
#   primary = lang_1_data

#   if file_name == lang_1_name
#     puts "=> skipping primary locale #{File.basename(lang_1_name)} ..."
#     next
#   end
#   language_code = File.basename(file_name, '.yml')
#   secondary = YAML::load_file(file_name)
#   merged = Utils.deep_merge_hashes(primary[primary_language_code], secondary[language_code])
#   final = { language_code => merged } # remove other keys
#   File.open(file_name, 'w') do |file|
#     file.write final.to_yaml.gsub(/\s+$/, '')
#   end
#   puts "+ merged #{File.basename(file_name)} with primary"

# else
#   puts "quitting"
# end


# HTML Proofer
require 'html/proofer'
HTML::Proofer.new("./build", { :url_ignore => ["/bridge", "/checkdesk", "/about"]}).run