Rails.application.routes.draw do
  resources :shots do 
    resources :comments 
    member do 
      put 'like', to: "shots#like"
      put 'unlike', to: "shots#unlike"
    end
  end
   
  root 'shots#index'

  devise_for :users
end
