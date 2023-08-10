class DistanceCalculationsController < ApplicationController
  before_action :find_distance_calculation, only: [:show, :edit, :update, :destroy]

  def index
    @distance_calculations = DistanceCalculation.all
  end

  def new
    @distance_calculation = DistanceCalculation.new
  end

  def create
    @distance_calculation = DistanceCalculation.new(distance_calculation_params)
  
    if @distance_calculation.save
      render json: { distance_calculation: @distance_calculation }, status: :created
    else
      render json: { errors: @distance_calculation.errors }, status: :unprocessable_entity
    end
  end
  
  private
  
  def distance_calculation_params
    params.require(:distance_calculation).permit(:street_1, :city_1, :state_1, :zip_1, :lat_1, :lng_1, :street_2, :city_2, :state_2, :zip_2, :lat_2, :lng_2, :distance)
  end

  def destroy
    @distance_calculation.destroy
    redirect_to distance_calculations_url, notice: 'Distance calculation was successfully destroyed.'
  end

  def find_distance_calculation
    @distance_calculation = DistanceCalculation.find(params[:id])
  end  
end