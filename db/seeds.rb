require 'faker'

Movie.delete_all
Jamjam.delete_all

3.times do |i|
  Movie.create(title: Faker::Commerce.product_name)
  3.times do |j|
    Jamjam.create(user_id: j+1, movie_id: i+1, watched: false, prerating: 50, postrating: 50)
  end
end
