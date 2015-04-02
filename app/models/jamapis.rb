module JamAPIs

  class TrailerAddictAPI
    include HTTParty

    def self.?
      @data = HTTParty.get( )
      # do stuff to data
      # return @data
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
