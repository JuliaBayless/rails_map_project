# redirects user to login page if not logged in
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
end
