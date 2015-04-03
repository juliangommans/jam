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

    def self.upcoming
      @data = HTTParty.get("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=pavxvfcq6kjfscnvdj6cga6r")
      return @data.strip
    end

    # def self.search#(name)"http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=pavxvfcq6kjfscnvdj6cga6r&q="+name+"&page_limit=10"
    #   @data = HTTParty.get("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=pavxvfcq6kjfscnvdj6cga6r&q=star&page_limit=10")
    #   hashed = JSON.parse(@data.strip)
    #   hashed = hashed["movies"]
    #   hashed.each do |movie|
    #     if check_db(movie)

    #     end
    #   return @data
    # end

    def check_db(movie)

    end

  end
end
