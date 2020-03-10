class JobsMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end
         
      result['date'] = result['sys']['created_at'].to_date.to_s
      
      result
    end
  end