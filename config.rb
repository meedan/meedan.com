# Assets setup
#
set :css_dir, 'css'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

# Livereload
#
activate :livereload

# Routing
#
activate :directory_indexes
redirect "index.html", :to => "en/index.html"
activate :i18n, :mount_at_root => "en"
page "**/*_tos.html", :directory_index => false
page "**/*_privacy.html", :directory_index => false


# Open Graph Tags
#
# See: https://github.com/ngs/middleman-ogp
#
activate :ogp do |ogp|
  ogp.namespaces = {
    og: data.ogp.og
  }
  ogp.base_url = 'http://meedan.com/'
end

# Build config
#
configure :build do
	activate :minify_css
	activate :minify_javascript
  activate :autoprefixer
end


# RSS parsing on home page
require 'feedjira'
require 'date'