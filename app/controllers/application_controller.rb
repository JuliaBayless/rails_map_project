# redirects user to login page if not logged in
class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def react_app
    render layout: 'application'
  end  
end
