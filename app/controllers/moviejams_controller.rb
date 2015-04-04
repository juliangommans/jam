class MoviejamsController < ApplicationController

	def add
    redirect_to new_user_session_path unless user_signed_in?
    j = Moviejam.new
    j.movie_id = params[:id]
    j.user_id = current_user.id
    j.watched = false
    # prompt for pre-rating (ajax?)
    j.save
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
    # prompt for pre-rating (ajax?)
    @moviejam.save
    redirect_to moviejams_path
  end

  def index
    redirect_to new_user_session_path unless user_signed_in?
    @moviejams = Moviejam.where(user_id: current_user.id)
    @moviejams = Moviejam.sort_moviejams(@moviejams) #.json ? eventually
  end

end
