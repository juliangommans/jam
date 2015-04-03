module MoviesHelper
  
  class TrailerAddictAPI
    include HTTParty
    
    def self.trailer
      @data = HTTParty.get("http://api.traileraddict.com/?featured=yes")
      @data = @data.parsed_response["trailers"]["trailer"]
      return @data.to_json
    end
    
    def self.mytrailer(imdb)
      @data = HTTParty.get("http://api.traileraddict.com/?imdb=#{imdb}&count=1&width=640")
      @data = @data.parsed_response["trailers"]["trailer"]
      return @data.to_json
    end

  end

  class RottenTomatoesAPI
    include HTTParty

    def self.upcoming
      @data = HTTParty.get("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=pavxvfcq6kjfscnvdj6cga6r")
      return @data.strip
    end

    def self.search(name)
      @data = HTTParty.get( )
      # do stuff to data
      # return @data
    end

  end
end
