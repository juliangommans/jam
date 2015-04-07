class UpcomingmoviesController < ApplicationController

  def index
    @upcoming = Upcomingmovie.all
    puts @upcoming
    render json: @upcoming
  end

end
