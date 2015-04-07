class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :feature_movie

  def feature_movie
    @movies = Movie.all
    @movie = @movies.sample
  end

end
