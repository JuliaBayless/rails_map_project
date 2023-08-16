require 'rails_helper'

RSpec.describe DistanceCalculationsController, type: :controller do
  let(:user) { create(:user) } 

  before do
    sign_in user
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          address_1: '2400 3rd Ave S, St Paul, MN 55404',
          lat_1: 44.9593, lng_1: -93.2749,
          address_2: '725 Vineland Pl, Minneapolis, MN 55403',
          lat_2: 44.9672, lng_2: -93.2890,
          distance: 3.2,
          title: 'Some Title'
        }
      end

      it 'creates a new distance calculation' do
        expect {
          post :create, params: { distance_calculation: valid_params }
        }.to change(DistanceCalculation, :count).by(1)
      end

      it 'associates the created distance calculation with the signed in user' do
        post :create, params: { distance_calculation: valid_params }
        expect(DistanceCalculation.last.user).to eq(user)
      end

      it 'saves with correct attributes' do
        post :create, params: { distance_calculation: valid_params }
        latest_distance_calculation = DistanceCalculation.order(created_at: :desc).first
        expect(latest_distance_calculation.address_1).to eq(valid_params[:address_1])
        expect(latest_distance_calculation.address_2).to eq(valid_params[:address_2])
      end
    end
  end

  describe 'GET #show' do
    let(:user) { create(:user) }
    let!(:distance_calculation) { create(:distance_calculation, user: user) }

    before do
      sign_in user
    end

    context 'with valid id' do
      before do
        get :show, params: { id: distance_calculation.id }
      end

      it 'returns the correct distance calculation' do
        parsed_response = JSON.parse(response.body)
        expect(parsed_response["id"]).to eq(distance_calculation.id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid id' do
      it 'returns status code 404' do
        get :show, params: { id: 'invalid_id' }
        expect(response).to have_http_status(:not_found)
      end
    end
  end


  describe 'GET #addresses' do
    let!(:user_distance_calculation) { create(:distance_calculation, user: user) }
    let!(:other_distance_calculation) { create(:distance_calculation) } # not associated with user

    before do
      get :addresses, params: { user_id: user.id }
    end

    it 'returns addresses associated with the given user' do
      returned_addresses = JSON.parse(response.body)
      expect(returned_addresses.size).to eq(1)
      expect(returned_addresses.first['id']).to eq(user_distance_calculation.id)
    end

    it 'does not return addresses not associated with the user' do
      returned_addresses = JSON.parse(response.body)
      expect(returned_addresses).not_to include(hash_including('id' => other_distance_calculation.id))
    end
  end

  describe 'PUT #update' do
    let(:user) { create(:user) }
    let!(:distance_calculation) { create(:distance_calculation, user: user) }

    before do
      sign_in user
    end

    context 'with valid parameters' do
      let(:new_address) { '123 New Address St, New City, ST 12345' }
      let(:valid_params) do
        {
          id: distance_calculation.id,
          distance_calculation: {
            address_1: new_address
          }
        }
      end

      it 'updates the distance calculation' do
        put :update, params: valid_params
        expect(distance_calculation.reload.address_1).to eq(new_address)
      end

      it 'returns status code :ok' do
        put :update, params: valid_params
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {
          id: distance_calculation.id,
          distance_calculation: {
            address_1: '' # invalid
          }
        }
      end

      it 'does not update the distance calculation' do
        original_address = distance_calculation.address_1
        put :update, params: invalid_params
        expect(distance_calculation.reload.address_1).to eq(original_address)
      end

      it 'returns status code :unprocessable_entity' do
        put :update, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:user) { create(:user) }
    let!(:distance_calculation) { create(:distance_calculation, user: user) }

    before do
      sign_in user
    end

    it 'deletes the distance calculation' do
      expect {
        delete :destroy, params: { id: distance_calculation.id }
      }.to change(DistanceCalculation, :count).by(-1)
    end

    it 'returns status code :ok' do
      delete :destroy, params: { id: distance_calculation.id }
      expect(response).to have_http_status(:ok)
    end
  end
end
