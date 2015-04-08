class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :feature_movie

  def feature_movie
    matching_movies = []
    all_movies = Movie.all
    all_movies.each do |movie|
      if movie.title.downcase.include? 'ultron'
        matching_movies << movie
      end
    end
    @movie = matching_movies.sample
  end

end
