module Jekyll
    class EnvironmentTag < Liquid::Tag
  
      def initialize(tag_name, content, tokens)
        super
        @content = content
      end
  
      def render(context)
        "#{ENV[@content.strip]}"
      end
    end
  end
  
  Liquid::Template.register_tag('env', Jekyll::EnvironmentTag)
  