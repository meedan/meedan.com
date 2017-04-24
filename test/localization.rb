require 'yaml'

lang_1_name = "en"
lang_2_name = "ar"

# Data from YAML files
#
lang_1_data = YAML.load_file(File.join("locales",lang_1_name + ".yml"))
lang_2_data = YAML.load_file(File.join("locales",lang_2_name + ".yml"))

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

text_banner("MISSING FROM #{lang_2_name}.yml")
diff(lang_1_data[lang_1_name], lang_2_data[lang_2_name], [lang_2_name])

text_banner(" MISSING FROM #{lang_1_name}.yml")
diff(lang_2_data[lang_2_name], lang_1_data[lang_1_name], [lang_1_name])
