Rails.application.routes.draw do
  devise_for :users

  root 'movies#index'
  get '/seach' => 'movies#search', as: 'movie_search'
  post '/add/:id' => 'jamjams#add', as: 'add_movie'
  post '/remove/:id' => 'jamjams#remove', as: 'remove_movie'
  post '/watched/:id' => 'jamjams#watched', as: 'watch_movie'



end
