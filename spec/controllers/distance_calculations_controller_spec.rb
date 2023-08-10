require 'rails_helper'

RSpec.describe DistanceCalculationsController, type: :controller do
  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          street_1: '2400 3rd Ave S', city_1: 'St Paul', state_1: 'MN', zip_1: '55404',
          lat_1: 44.9593, lng_1: -93.2749,
          street_2: '725 Vineland Pl', city_2: 'Minneapolis', state_2: 'MN', zip_2: '55403',
          lat_2: 44.9672, lng_2: -93.2890, distance: 3.2
        }
      end

      it 'creates a new distance calculation' do
        expect {
          post :create, params: { distance_calculation: valid_params }
        }.to change(DistanceCalculation, :count).by(1)
      end
    end

    # You may add more tests to check invalid parameters, response status, etc.
  end
end

