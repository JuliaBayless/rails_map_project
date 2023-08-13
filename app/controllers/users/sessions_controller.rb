module Users
  class SessionsController < Devise::SessionsController
    # After sign in, redirect to the welcome page
    def after_sign_in_path_for(resource)
      welcome_path
    end
  end
end
