require 'rails_helper'

RSpec.describe DistanceCalculation, type: :model do
  it { should belong_to(:user) }
  
  it { should validate_presence_of(:address_1) }
  it { should validate_presence_of(:lat_1) }
  it { should validate_presence_of(:lng_1) }
  it { should validate_presence_of(:address_2) }
  it { should validate_presence_of(:lat_2) }
  it { should validate_presence_of(:lng_2) }
  
  it { should validate_numericality_of(:lat_1) }
  it { should validate_numericality_of(:lng_1) }
  it { should validate_numericality_of(:lat_2) }
  it { should validate_numericality_of(:lng_2) }
  it { should validate_numericality_of(:distance).is_greater_than_or_equal_to(0) }
end
