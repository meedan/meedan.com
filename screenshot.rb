require "smartshot"

# see the capybara + poltergeist options listed at:
# https://github.com/teampoltergeist/poltergeist#taking-screenshots-with-some-extensions
fetcher = Smartshot::Screenshot.new(window_size: [1200, 900])
urls = ['meedan.com','meedan.checkmedia.org/en', 'meedan.checkmedia.org/ar']

urls.each do |u|
  fetcher.take_screenshot! url: "http://#{u}", output: "./screenshots/#{u}.png", sleep: 10, timeout: 30, full: false
end