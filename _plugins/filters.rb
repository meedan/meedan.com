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
      def event_date_sort(collection)
        collection.sort_by do |el|
          Date.parse(el['event_date'].strftime("%B %d %Y"), '%d-%m-%Y')
        end
      end
      def year_sort(collection)
        collection.sort_by do |el|
          el['year']
        end
      end
    end
  end
  Liquid::Template.register_filter(Jekyll::DateFilter)

  module Jekyll
    module ConvertToDate
      def convert_to_date(date)
        return date.to_date
      end
    end
  
  end
  Liquid::Template.register_filter(Jekyll::ConvertToDate)

  module Jekyll
    module CSVEscape
      require 'cgi'
      def csv_escape(input)
        return CGI.unescapeHTML(input)
      end
    end
  
  end
  Liquid::Template.register_filter(Jekyll::CSVEscape)

  module Jekyll
    module CSVEscape2
      def csv_escape_2(input)
        return input.to_s.gsub('"', '""').gsub('”','""').gsub('“','""')
      end
    end
  
  end
  Liquid::Template.register_filter(Jekyll::CSVEscape2)