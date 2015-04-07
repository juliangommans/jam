module MoviesHelper
  
  class TrailerAddictAPI
    include HTTParty
    
    def self.trailer
      data = HTTParty.get("http://api.traileraddict.com/?featured=yes")
      data = data.parsed_response["trailers"]["trailer"]
      return data.to_json
    end
    
    def self.mytrailer(imdb)
      data = HTTParty.get("http://api.traileraddict.com/?imdb=#{imdb}&count=1&width=640")
      data = data.parsed_response["trailers"]["trailer"]
      return data.to_json
    end

  end

  class RottenTomatoesAPI
    include HTTParty

    def self.upcoming
      data = HTTParty.get("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?apikey=pavxvfcq6kjfscnvdj6cga6r")
      add_movies(hash(data))
      return data.strip
    end

    def self.search(name)
      terms = name.gsub(' ','+')
      data = HTTParty.get("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=pavxvfcq6kjfscnvdj6cga6r&q="+terms+"&page_limit=10")
      add_movies(hash(data))
      return data.strip
    end

    def self.check_description(movies)
      movies.each do |movie|
        tester = check_db(movie["title"])
        if tester.description == '' || tester.description == nil
          terms = movie["title"].split(' ').slice(0,4)
          new_description = search_omdb(terms.join('+'))
          tester.update(description: new_description["Plot"])
        end
      end
    end

    def self.search_omdb(movie)
      terms = movie.gsub(':','%3A')
      data = HTTParty.get('http://www.omdbapi.com/?t='+terms+'&y=&plot=full&r=json')
      return data
    end

    def self.check_db(movie)
      Movie.find_by(title: movie)
    end

    def self.hash(data)
      hashed = JSON.parse(data.strip)
      hashed = hashed["movies"]
    end

    def self.add_movies(movies)
      movies.each do |movie|
        if !check_db(movie["title"])
          if movie["alternate_ids"] == nil
            Movie.create(title: movie["title"], description: movie["synopsis"], poster: movie["posters"]["profile"], rating: movie["ratings"]["critics_score"])
          else
            Movie.create(title: movie["title"], description: movie["synopsis"], poster: movie["posters"]["profile"], rating: movie["ratings"]["critics_score"], imdb: movie["alternate_ids"]["imdb"])
          end
        end
      end
      check_description(movies)
    end

  end
end
