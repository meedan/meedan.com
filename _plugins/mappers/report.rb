class ReportMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end

      if result['social_card_image']
        result['image'] = "https:" + result['social_card_image']['url']
      elsif result['cover_image']
        result['image'] = "https:" + result['cover_image']['url']
      end

      result
    end
  end