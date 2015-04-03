Rails.application.routes.draw do
  devise_for :users

  root 'movies#index'
  get '/seach' => 'movies#search', as: 'movie_search'
  get '/trailer' => 'movies#trailer', as: 'movie_trailer'
  get '/upcoming' => 'movies#upcoming', as: 'movie_upcoming'
  post '/add/:id' => 'jamjams#add', as: 'add_movie'
  post '/remove/:id' => 'jamjams#remove', as: 'remove_movie'
  post '/watched/:id' => 'jamjams#watched', as: 'watch_movie'



end
