# Assets setup
#
set :css_dir, 'css'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

# Make sprockets aware of bower
#
# note that this does not seem to add them to the sass Load_path,
# so for now we have to use "../../" syntax in our @imports — 2015 Oct 14 CGB
bower_path = File.join root, 'bower_components'
sprockets.append_path bower_path

# Routing
#
activate :directory_indexes
redirect "index.html", :to => "en/index.html"
activate :i18n, :mount_at_root => "en"

# I18n Fallbacks
#
# Image names are only kept in the en.yml
I18n.fallbacks.map(:ar => :en)

# Dev config only
#
# (while editing templates)
configure :development do
  # activate :livereload
end

# Build config
#
# (when generating the static files)
configure :build do
	# activate :minify_css
	# activate :minify_javascript
end