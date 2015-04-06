Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :movies, only: [:index]
  resources :moviejams, only: [:index]

  get '/search/:terms' => 'movies#search', as: 'movie_search'
  get '/trailer' => 'movies#trailer', as: 'movie_trailer'
  get '/mytrailer/:imdb' => 'movies#mytrailer', as: 'movie_mytrailer'
  get '/upcoming' => 'movies#upcoming', as: 'movie_upcoming'

  get '/admin' => 'moviejams#admin', as: 'admin'
  get '/add/:id' => 'moviejams#add', as: 'add_movie'
  post '/remove/:id' => 'moviejams#remove', as: 'remove_movie'
  post '/watched/:id' => 'moviejams#watched', as: 'watch_movie'

  root 'movies#index'

end
