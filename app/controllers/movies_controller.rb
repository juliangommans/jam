class MoviesController < ApplicationController

  def index
    redirect_to new_user_session_path unless user_signed_in?
  end

  def trailer
    @trailer = MoviesHelper::TrailerAddictAPI.trailer
    render json: @trailer
  end

  def mytrailer
      @mytrailer = MoviesHelper::TrailerAddictAPI.mytrailer(params[:imdb])
      render json: @mytrailer
  end

  def upcoming
    @data = MoviesHelper::RottenTomatoesAPI.upcoming
    render json: @data
  end

  def search
    @search = MoviesHelper::RottenTomatoesAPI.search(params[:terms])
    render json: @search
  end

end
