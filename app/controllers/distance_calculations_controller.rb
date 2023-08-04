class DistanceCalculationsController < ApplicationController
  def index
    # You can render an empty form here where users can enter two addresses
    # Or display any other content as needed
  end

  def calculate_distance
    address_1 = params[:address_1]
    address_2 = params[:address_2]

    # Use a geocoding service (e.g., Google Maps Geocoding API) to get lat/lng for the addresses
    lat_lng_1 = geocode_address(address_1)
    lat_lng_2 = geocode_address(address_2)

    if lat_lng_1.nil? || lat_lng_2.nil?
      respond_to do |format|
        format.json { render json: { error: 'Could not geocode one or both of the provided addresses' }, status: :unprocessable_entity }
      end
    else
      # Calculate the distance between the two locations using the lat/lng
      distance = calculate_distance_between(lat_lng_1, lat_lng_2)

      # Respond to the client with the calculated distance
      respond_to do |format|
        format.json { render json: { distance: distance } }
      end
    end
  end

  private

  def geocode_address(address)
    # Implement a method here to geocode the address and return its lat/lng
    result = Geocoder.search(address).first
    { lat: result.latitude, lng: result.longitude } if result.present?
  end

  def calculate_distance_between(lat_lng_1, lat_lng_2)
    # Implement a method here to calculate the distance between two lat/lng points
    Geocoder::Calculations.distance_between([lat_lng_1[:lat], lat_lng_1[:lng]], [lat_lng_2[:lat], lat_lng_2[:lng]])
  end
end
