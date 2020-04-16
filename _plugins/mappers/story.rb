class StoryMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end
         
      result['date'] = result['sys']['created_at'].to_date.to_s

      if result['lead_image']
        result['lead_image_full'] = result['lead_image']
        result['lead_image']['description'] = result['lead_image']['en-US']['description']
        result['lead_image']['title'] = result['lead_image']['en-US']['title']
        result['lead_image']['url'] = result['lead_image']['en-US']['url']
      end

      if result['title']
        result['title-ar'] = result['title']['ar']
        result['title-es'] = result['title']['es']
        result['title-pt'] = result['title']['pt']
        result['title-en'] = result['title']['en-US']
        result['title'] = result['title']['en-US']
      end

      if result['slug']
        result['slug-ar'] = result['slug']['ar']
        result['slug-es'] = result['slug']['es']
        result['slug-pt'] = result['slug']['pt']
        result['slug-en'] = result['slug']['en-US']
        result['slug'] = result['slug']['en-US']
      end
      
      if result['body']
        result['body-ar'] = result['body']['ar']
        result['body-es'] = result['body']['es']
        result['body-pt'] = result['body']['pt']
        result['body'] = result['body']['en-US']
      end
      
      if result['alt_date']
        result['alt_date_string'] = result['alt_date']['en-US'].to_date.to_s
        result['alt_date'] = result['alt_date']['en-US']
      else
        result['alt_date'] = result['sys']['created_at']
        result['alt_date_string'] = result['sys']['created_at'].to_date.to_s
      end
      
      result
    end
  end