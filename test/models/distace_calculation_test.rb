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
require "test_helper"

class DistaceCalculationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
