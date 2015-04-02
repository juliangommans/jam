class JamjamsController < ApplicationController

	def add
		# Jamjam.create(user_id = current_user.id, movie_id = params[:id])
	end

  def remove
    #@movie = Jamjam.find(params[:id])
      #if @movie.watched = false
        #@movie.destroy!
      #end
  end

  def watched
    #@movie = Jamjam.find(params[:id])
      #if @movie.watched = false
        #@movie.watched = true
        #@movie.save
      #end
  end

end
