Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions'
  }

  get 'welcome', to: 'welcome#index', as: :welcome

  root to: 'static_pages#home'
  resources :distance_calculations, only: [:create] 

end
