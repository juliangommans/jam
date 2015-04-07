Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :movies, only: [:index]
  resources :moviejams, only: [:index]

  get '/search/:terms' => 'movies#search', as: 'movie_search'
  get '/trailer' => 'movies#trailer', as: 'movie_trailer'
  get '/mytrailer/:imdb' => 'movies#mytrailer', as: 'movie_mytrailer'
  #get '/upcoming' => 'movies#upcoming', as: 'movie_upcoming'
  get '/find/:title' => 'movies#find', as: 'movie_find'

  get '/index/upcoming' => 'upcomingmovies#index', as: 'upcoming_movies'

  #get '/set/:id/:title' => 'moviejams#set_score', as: 'moviejams_set_score'
  get '/movie_list/:id' => 'moviejams#movie_list', as: 'movie_list'
  get '/admin' => 'moviejams#admin', as: 'admin'
  get '/feature/:id' => 'moviejams#feature', as: 'feature'
  get '/add/:id/:title' => 'moviejams#add', as: 'add_movie'
  post '/remove/:id' => 'moviejams#remove', as: 'remove_movie'
  post '/watched/:id' => 'moviejams#watched', as: 'watch_movie'

  root 'movies#index'

end
