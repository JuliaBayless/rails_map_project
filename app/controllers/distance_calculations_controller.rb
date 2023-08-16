class DistanceCalculationsController < ApplicationController
  before_action :find_distance_calculation, only: [:show, :edit, :update, :destroy]

  def index
    @distance_calculations = DistanceCalculation.all
  end

  def new
    @distance_calculation = DistanceCalculation.new
  end

  def create
    @distance_calculation = current_user.distance_calculations.build(distance_calculation_params)

    if @distance_calculation.save
      render json: { distance_calculation: @distance_calculation }, status: :created
    else
      render json: { errors: @distance_calculation.errors }, status: :unprocessable_entity
    end
  end

  def addresses
    user = User.find(params[:user_id])
    @addresses = user.distance_calculations

    render json: @addresses
  end

  private

  def distance_calculation_params
    # Updated permitted parameters to match new migration
    params.require(:distance_calculation).permit(:address_1, :lat_1, :lng_1, :address_2, :lat_2, :lng_2, :distance, :title, :id)
  end

  def destroy
    @distance_calculation.destroy
    redirect_to distance_calculations_url, notice: 'Distance calculation was successfully destroyed.'
  end

  def find_distance_calculation
    @distance_calculation = DistanceCalculation.find(params[:id])
  end
end
