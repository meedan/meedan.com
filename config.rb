require "lib/localization_helpers"
helpers LocalizationHelpers

# Assets setup
set :css_dir, 'css'
set :js_dir, 'javascripts'
set :images_dir, 'images'
activate :sprockets

# Make sprockets aware of bower
# note that this does not seem to add them to the sass Load_path,
# so for now we have to use "../../" syntax in our @imports — 2015 Oct 14 CGB
bower_path = File.join root, 'bower_components'
sprockets.append_path bower_path

# This would be nice but doesn't seem to work with our 2x strategy. — 2015 Oct 11 CGB
# activate :automatic_image_sizes

# Routing
activate :directory_indexes
activate :i18n, :mount_at_root => "en"
redirect "index.html", :to => "en/index.html"

# Dev config only (while editing templates)
configure :development do
  activate :livereload
end

# Build config only (when generating the static files)
configure :build do
	activate :minify_css
	activate :minify_javascript
	# activate :asset_hash
end
