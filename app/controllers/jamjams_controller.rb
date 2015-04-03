class JamjamsController < ApplicationController

	def add
    redirect_to new_user_session_path unless user_signed_in?
    j = Jamjam.new
    j.movie_id = params[:id]
    j.user_id = current_user.id
    j.watched = false
    # prompt for pre-rating (ajax?)
    j.save
    redirect_to jamjams_path
	end

  def remove
    redirect_to new_user_session_path unless user_signed_in?
    @jamjam = Jamjam.find(params[:id])
    @jamjam.destroy
    redirect_to jamjams_path
  end

  def watched
    redirect_to new_user_session_path unless user_signed_in?
    @jamjam = Jamjam.find(params[:id])
    @jamjam.watched = true
    # prompt for pre-rating (ajax?)
    @jamjam.save
    redirect_to jamjams_path
  end

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @jamjams = Jamjam.where(user_id: current_user.id)
  end

end
