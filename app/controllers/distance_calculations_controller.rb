class DistanceCalculationsController < ApplicationController
  before_action :find_distance_calculation, only: [:show, :edit, :update, :destroy]

  def index
    @distance_calculations = DistanceCalculation.all
  end

  def show
  end

  def new
    @distance_calculation = DistanceCalculation.new
  end

  def create
    result = CalculateDistance.call(distance_calculation_params)

    if result.success?
      @distance_calculation = DistanceCalculation.create!(distance_calculation_params.merge(distance: result.distance))
      render json: { distance_calculation: @distance_calculation }, status: :created
    else
      render json: { error: result.message }, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @distance_calculation.update(distance_calculation_params)
      redirect_to @distance_calculation, notice: 'Distance calculation was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @distance_calculation.destroy
    redirect_to distance_calculations_url, notice: 'Distance calculation was successfully destroyed.'
  end

  private

  def find_distance_calculation
    @distance_calculation = DistanceCalculation.find(params[:id])
  end

  def distance_calculation_params
    params.require(:distance_calculation).permit(:address_1, :address_2)
  end
end


# class DistanceCalculationsController < ApplicationController
#   def index
#     # You can render an empty form here where users can enter two addresses
#     # Or display any other content as needed
#   end

#   def calculate_distance
#     address_1 = params[:address_1]
#     address_2 = params[:address_2]

#     # Use a geocoding service (e.g., Google Maps Geocoding API) to get lat/lng for the addresses
#     lat_lng_1 = geocode_address(address_1)
#     lat_lng_2 = geocode_address(address_2)

#     if lat_lng_1.nil? || lat_lng_2.nil?
#       respond_to do |format|
#         format.json { render json: { error: 'Could not geocode one or both of the provided addresses' }, status: :unprocessable_entity }
#       end
#     else
#       # Calculate the distance between the two locations using the lat/lng
#       distance = calculate_distance_between(lat_lng_1, lat_lng_2)

#       # Respond to the client with the calculated distance
#       respond_to do |format|
#         format.json { render json: { distance: distance } }
#       end
#     end
#   end

#   private

#   def geocode_address(address)
#     # Implement a method here to geocode the address and return its lat/lng
#     result = Geocoder.search(address).first
#     { lat: result.latitude, lng: result.longitude } if result.present?
#   end

#   def calculate_distance_between(lat_lng_1, lat_lng_2)
#     # Implement a method here to calculate the distance between two lat/lng points
#     Geocoder::Calculations.distance_between([lat_lng_1[:lat], lat_lng_1[:lng]], [lat_lng_2[:lat], lat_lng_2[:lng]])
#   end
# end
