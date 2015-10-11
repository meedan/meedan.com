require "lib/localization_helpers"
helpers LocalizationHelpers

# Assets setup
set :css_dir, 'css'
set :js_dir, 'javascripts'
set :images_dir, 'images'
activate :sprockets

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
