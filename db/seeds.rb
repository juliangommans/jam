require 'faker'

Movie.delete_all
Moviejam.delete_all

random_movies = []

10.times do |i|
  random_movies << Movie.create(title: Faker::Commerce.product_name).id
end

50.times do |j|
  random_watched = rand(1..5) == 1 ? true : false
  Moviejam.create(user_id: rand(1..5), movie_id: random_movies.sample, watched: random_watched, prerating: rand(0..100), postrating: rand(0..100))
end
