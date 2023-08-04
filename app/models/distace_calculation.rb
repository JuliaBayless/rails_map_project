# == Schema Information
#
# Table name: distace_calculations
#
#  id         :integer          not null, primary key
#  address_1  :string
#  address_2  :string
#  lat        :decimal(10, 6)   not null
#  lng        :decimal(10, 6)   not null
#  distance   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class DistanceCalculation < ApplicationRecord
  validates :street_1, :city_1, :state_1, :zip_1, presence: true
  validates :street_2, :city_2, :state_2, :zip_2, presence: true
  validate :validate_addresses_are_real

  private

  def validate_addresses_are_real
    address_1 = [street_1, city_1, state_1, zip_1].join(', ')
    address_2 = [street_2, city_2, state_2, zip_2].join(', ')

    return if valid_address?(address_1) && valid_address?(address_2)

    errors.add(:base, "One or both of the addresses are not valid.")
  end
  
  def valid_address?(address)
    # Use the geocoder gem to check if the address is valid
    results = Geocoder.search(address)
    !results.empty?
  end
  end
  
