class DistanceCalculationsController < ApplicationController
  before_action :find_distance_calculation, only: %i[show update destroy]

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

  def show
    if @distance_calculation.nil?
      render json: { error: 'Distance calculation not found' }, status: :not_found
    else
      render json: @distance_calculation
    end
  end

  def addresses
    user = User.find(params[:user_id])
    @addresses = user.distance_calculations

    render json: @addresses
  end

  def update
    if @distance_calculation.update(distance_calculation_params)
      render json: { distance_calculation: @distance_calculation }, status: :ok
    else
      render json: { errors: @distance_calculation.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @distance_calculation.destroy
    render json: { message: 'Deleted successfully' }, status: :ok
  end

  private

  def distance_calculation_params
    params.require(:distance_calculation).permit(:address_1, :lat_1, :lng_1, :address_2, :lat_2, :lng_2, :distance, :title, :id)
  end

  def find_distance_calculation
    @distance_calculation = DistanceCalculation.find_by(id: params[:id])
  end
end
