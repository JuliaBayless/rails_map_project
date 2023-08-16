Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions'
  }

  resources :users do
    get 'addresses', to: 'distance_calculations#addresses'
  end

  resources :distance_calculations, only: [:create]

  root to: 'application#react_app'
  get '*path', to: 'application#react_app', constraints: ->(request){ request.format.html? }

end
