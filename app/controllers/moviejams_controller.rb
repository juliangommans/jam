class MoviejamsController < ApplicationController

	def add
    redirect_to new_user_session_path unless user_signed_in?
    movie = Movie.find_by(title: params[:id])
    if !check_db(movie.id)
      j = Moviejam.new
      j.movie_id = movie.id
      j.user_id = current_user.id
      j.watched = false
      j.prerating = rand(0..100)
      j.save
    end
    redirect_to moviejams_path
	end

  def remove
    redirect_to new_user_session_path unless user_signed_in?
    @moviejam = Moviejam.find(params[:id])
    @moviejam.destroy
    redirect_to moviejams_path
  end

  def watched
    redirect_to new_user_session_path unless user_signed_in?
    @moviejam = Moviejam.find(params[:id])
    @moviejam.watched = true
    @moviejam.postrating = rand(0..100)
    @moviejam.save
    redirect_to moviejams_path
  end

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @moviejams = Moviejam.where(user_id: current_user.id)
    @moviejams = Moviejam.sort_moviejams(@moviejams) #.json ? eventually
  end

  def check_db(movie)
    Moviejam.find_by(user_id: current_user, movie_id: movie)
  end

end
