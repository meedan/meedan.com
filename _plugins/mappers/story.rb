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
        # result['lead_image_full'] = result['lead_image']
        result['lead_image']['description'] = result['lead_image']['en-US']['description']
        result['lead_image']['title'] = result['lead_image']['en-US']['title']
        result['lead_image']['url'] = result['lead_image']['en-US']['url']
        result['image'] = "https:" + result['lead_image']['en-US']['url']
      end

      if result['title']['ar']
        result['title-ar'] = result['title']['ar']
      end
      if result['title']['es']
        result['title-es'] = result['title']['es']
      end
      if result['title']['pt']
        result['title-pt'] = result['title']['pt']
      end
      if result['title']['en-US']
        result['title-en'] = result['title']['en-US']
        result['title'] = result['title']['en-US']
      end

      if result['slug']
        result['slug'] = result['slug']['en-US']
      end
      
      if result['body']
        # add description
        if result['body']['es']
          result['description-es'] = result['body']['es'].to_s.split[0...30].join(' ')
        end
        if result['body']['pt']
          result['description-pt'] = result['body']['pt'].to_s.split[0...30].join(' ')
        end
        if result['body']['ar']
          result['description-ar'] = result['body']['ar'].to_s.split[0...30].join(' ')
        end
        if result['body']['en']
          result['description-en'] = result['body']['en'].to_s.split[0...30].join(' ')
        end
        # set body
        if result['body']['ar']
          result['body-ar'] = result['body']['ar']
        end
        if result['body']['es']
          result['body-es'] = result['body']['es']
        end
        if result['body']['pt']
          result['body-pt'] = result['body']['pt']
        end
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