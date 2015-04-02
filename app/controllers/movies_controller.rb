class MoviesController < ApplicationController

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @movies = Movie.all
  end

  def search

  end

end
