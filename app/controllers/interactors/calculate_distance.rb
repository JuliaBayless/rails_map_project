require 'google_maps_service'

class CalculateDistance
  include Interactor

  def call
    gmaps = GoogleMapsService::Client.new(key: ENV['GOOGLE_MAPS_API_KEY'])
    distance_result = gmaps.distance_matrix(context.address_1, context.address_2)

    if distance_result[:status] == "OK"
      context.distance = distance_result[:rows].first[:elements].first[:distance][:value] # Distance in meters
    else
      context.fail!(message: "Distance calculation failed for given addresses")
    end
  end
end