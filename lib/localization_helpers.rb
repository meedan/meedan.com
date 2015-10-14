module LocalizationHelpers
  # Language toggle WIP
  #
  # https://forum.middlemanapp.com/t/i18n-list-of-language-siblings-and-links-to-them/978/2
  def translated_url(locale)
    # Assuming /:locale/page.html
    page_name = @page_id.split("/", 2).last.sub(/\..*$/, '')
    untranslated_path = t(:paths).index(page_name)

    begin
      translated = I18n.translate!("paths.#{untranslated_path}", locale: locale)
    rescue I18n::MissingTranslationData
      translated = untranslated_path
    end
    # return "page id is #{@page_id}...page name is #{page_name} ... untranslated_path is #{untranslated_path} ... /#{locale}/#{translated} ... "
  end

  def other_langs
    langs - [I18n.locale]
  end
end