class DistanceCalculation < ApplicationRecord
  validates :street_1, :city_1, :state_1, :zip_1, :lat_1, :lng_1, :street_2, :city_2, :state_2, :zip_2, :lat_2, :lng_2, presence: true
  validates :lat_1, :lng_1, :lat_2, :lng_2, numericality: true
  validates :distance, numericality: { greater_than_or_equal_to: 0 }
end
  
