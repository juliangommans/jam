class MoviesController < ApplicationController


  def index
    redirect_to new_user_session_path unless user_signed_in?
    @movies = Movie.all
    @trailer = MoviesHelper::TrailerAddictAPI.trailer
  end

  def search

  end

end
