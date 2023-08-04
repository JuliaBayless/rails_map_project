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
class DistaceCalculation < ApplicationRecord
  validates :address_1, presence: true
  validates :address_2, presence: true
  validate :validate_addresses_are_real

  private

  def validate_addresses_are_real
    return if valid_address?(address_1) && valid_address?(address_2)
  end

  def valid_address?(address)
    # Use the geocoder gem to check if the address is valid
    results = Geocoder.search(address)
    !results.empty?
  end
end
