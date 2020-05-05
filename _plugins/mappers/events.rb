class EventsMapper < ::Jekyll::Contentful::Mappers::Base
  
    def map
  
      require 'date'
  
      result = super
  
      entry.sys.each do |k, v|
        name, value = map_field k, v
        result['sys'][name] = value
      end


      if result['event_date']
        result['event_date_sting'] = result['event_date'].to_date.to_s
      end
  
      if result['event_end_date']
        result['event_end_date_string'] = result['event_end_date'].to_date.to_s
      end


      result
    end
  end