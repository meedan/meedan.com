###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
	activate :livereload
end

helpers do

	# Language toggle WIP
	# https://forum.middlemanapp.com/t/i18n-list-of-language-siblings-and-links-to-them/978/2
  def translated_url(locale)
    # Assuming /:locale/page.html
    page_name = @page_id.split("/", 2).last.sub(/\..*$/, '')

    untranslated_path = t(:paths).index(page_name)
    
    begin
      translated = I18n.translate!("paths.#{untranslated_path}", locale: locale)
    rescue I18n::MissingTranslationData
      translated = untranslated_path
    end
    # return "page id is #{@page_id}...page name is #{page_name} ... untranslated_path is #{untranslated_path} ... /#{locale}/#{translated} ... "
  end

  def other_langs
    langs - [I18n.locale]
  end
end

set :css_dir, 'css'

set :js_dir, 'javascripts'

set :images_dir, 'images'

activate :directory_indexes

activate :i18n, :mount_at_root => "en"

redirect "index.html", :to => "en/index.html"


# Asset pipeline
activate :sprockets

# Build-specific configuration
configure :build do
	# For example, change the Compass output style for deployment
	# activate :minify_css

	# Minify Javascript on build
	# activate :minify_javascript

	# Enable cache buster
	# activate :asset_hash

	# Use relative URLs
	# activate :relative_assets

	# Or use a different image path
	# set :http_prefix, "/Content/images/"
end
