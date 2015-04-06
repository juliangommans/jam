class Moviejam < ActiveRecord::Base
  belongs_to :user
  belongs_to :movie

  def self.sort_moviejams(mjs)
    unwatched = []
    watched = []
    mjs.each do |mj|
      if mj.watched
        watched << mj
      else
        unwatched << mj
      end
    end
    return [unwatched,watched]
  end

  def self.sort_admindata(users,mjs)
    admindata = []
    users.each do |user|
      watched = 0
      unwatched = 0
      mjs.each do |mj|
        if user.id == mj.user_id
          if mj.watched
            watched += 1
          else
            unwatched += 1
          end
        end
      end
      admindata << [user, unwatched, watched]
    end
    return admindata
  end

  def self.filter_featuredata(movie,mjs)
    featuredata = []
    mjs.each do |mj|
      if movie.id == mj.movie_id
        featuredata << mj
      end
    end
    return featuredata
  end

end
