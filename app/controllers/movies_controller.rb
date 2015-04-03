class MoviesController < ApplicationController

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @movies = "test subject"
  end

  def trailer
    @trailer = MoviesHelper::TrailerAddictAPI.trailer
  end

  def upcoming
    @data = MoviesHelper::RottenTomatoesAPI.upcoming
    render json: @data
  end

  def search

  end

end
