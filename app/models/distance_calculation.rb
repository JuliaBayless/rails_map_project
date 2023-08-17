class DistanceCalculation < ApplicationRecord
  belongs_to :user

  validates :address_1, :lat_1, :lng_1, :address_2, :lat_2, :lng_2, presence: true
  validates :lat_1, :lng_1, :lat_2, :lng_2, numericality: true
  validates :distance, numericality: { greater_than_or_equal_to: 0 }
  validate :validate_addresses

  private

  def validate_addresses
    [address_1, address_2].each do |address|
      results = Geocoder.search(address)
      results.empty? && errors.add(:base, "#{address} is not a valid address")
    end
  end
end
