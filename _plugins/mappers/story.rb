class StoryMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end
         
      result['date'] = result['sys']['created_at'].to_date.to_s
      
      if result['alt_date']
        result['alt_date_string'] = result['alt_date'].to_date.to_s
      else
        result['alt_date'] = result['sys']['created_at']
        result['alt_date_string'] = result['sys']['created_at'].to_date.to_s
      end
      
      result
    end
  end