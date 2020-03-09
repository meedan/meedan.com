# Custom date sort filter for the data file generated from Contentful
# See: http://stackoverflow.com/questions/30933741/jekyll-cant-sort-collection-by-date
module Jekyll
    module DateFilter
      require 'date'
      def date_sort(collection)
        collection.sort_by do |el|
          Date.parse(el['sys']['created_at'].strftime("%B %d %Y"), '%d-%m-%Y')
        end
      end
      def story_date_sort(collection)
        collection.sort_by do |el|
          Date.parse(el['alt_date'].strftime("%B %d %Y"), '%d-%m-%Y')
        end
      end
    end
  end
  Liquid::Template.register_filter(Jekyll::DateFilter)