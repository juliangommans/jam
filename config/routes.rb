Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :movies, only: [:index]
  resources :moviejams, only: [:index]

  get '/search' => 'movies#search', as: 'movie_search'
  get '/trailer' => 'movies#trailer', as: 'movie_trailer'
  get '/upcoming' => 'movies#upcoming', as: 'movie_upcoming'

  post '/add/:id' => 'moviejams#add', as: 'add_movie'
  post '/remove/:id' => 'moviejams#remove', as: 'remove_movie'
  post '/watched/:id' => 'moviejams#watched', as: 'watch_movie'

  root 'movies#index'

end
