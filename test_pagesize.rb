require './test_helpers'

class Integer
  def to_filesize
    {
      'B'  => 1024,
      'KB' => 1024 * 1024,
      'MB' => 1024 * 1024 * 1024,
      'GB' => 1024 * 1024 * 1024 * 1024,
      'TB' => 1024 * 1024 * 1024 * 1024 * 1024
    }.each_pair { |e, s| return "#{(self.to_f / (s / 1024)).round(0)}#{e}" if self < s }
  end
end

banner("Starting response size tests")
if test_server_running?
  response = nil
  PAGES.each do |link|
    Net::HTTP.start('localhost', TEST_PORT) do |http|
     response = http.get(link)
     puts "#{link} is #{response.body.size.to_filesize}"
    end
  end
end
