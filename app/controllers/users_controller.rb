class UsersController < ApplicationController

  def current_user_info
    if current_user
      render json: { user_id: current_user.id }
    else
      render json: { error: 'Not Authenticated' }, status: :unauthorized
    end
  end
end
