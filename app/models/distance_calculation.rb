class DistanceCalculation < ApplicationRecord
  validates :address_1, :lat_1, :lng_1, :address_2, :lat_2, :lng_2, presence: true
  validates :lat_1, :lng_1, :lat_2, :lng_2, numericality: true
  validates :distance, numericality: { greater_than_or_equal_to: 0 }
  belongs_to :user
end

  
