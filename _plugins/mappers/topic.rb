class TopicMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end
         
      result['slug'] = result['title'].strip.downcase
      result['topic'] = result['title']
      
      result
    end
  end