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
end
