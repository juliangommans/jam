module MoviesHelper
  class TrailerAddictAPI
    include HTTParty

    def self.trailer
      @data = HTTParty.get("http://api.traileraddict.com/?featured=yes")
      @data = @data.parsed_response["trailers"]["trailer"]
      return @data.to_json
    end

  end

  class RottenTomatoesAPI
    include HTTParty

    def self.search(name)
      @data = HTTParty.get( )
      # do stuff to data
      # return @data
    end

  end
end
