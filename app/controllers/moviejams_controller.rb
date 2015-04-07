class MoviejamsController < ApplicationController

	def add
    redirect_to new_user_session_path unless user_signed_in?
    movie = find_movie(params[:id])
    if !check_db(movie.id)
      j = Moviejam.new
      j.movie_id = movie.id
      j.user_id = current_user.id
      j.watched = false
      j.prerating = params[:id]
      j.save
    end
    redirect_to moviejams_path
	end

  # def set_score
  #   movie = find_movie(params[:title])
  #   movie_score = check_db(movie.id)
  #   movie_score.update(prerating: (score.to_i))

  # end

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
    @moviejam.postrating = rand(-1..5)#-1 i.e. no rating yet
    @moviejam.save
    redirect_to moviejams_path
  end

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @moviejams = Moviejam.where(user_id: current_user.id)
    @moviejams = Moviejam.sort_moviejams(@moviejams) #.json ? eventually
  end

  def movie_list
    movie = find_movie(params[:id])
    movie_exists = false
    if check_db(movie.id)
      movie_exists = true
    end
    render json: movie_exists
  end

  def find_movie(movie)
    Movie.find_by(title: movie)
  end

  def admin
    redirect_to new_user_session_path unless user_signed_in? and current_user.admin?
    users = User.all
    moviejams = Moviejam.all
    @admindata = Moviejam.sort_admindata(users, moviejams)
  end

  def feature
    redirect_to new_user_session_path unless user_signed_in? and current_user.admin?
    movie = Movie.find(params[:id])
    moviejams = Moviejam.all
    @featuredata = {movie: movie, moviejams: Moviejam.filter_featuredata(movie, moviejams)}
  end

  def check_db(movie)
    Moviejam.find_by(user_id: current_user, movie_id: movie)
  end

end
