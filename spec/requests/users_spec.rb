require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #current_user_info' do
    let(:user) { create(:user) } 

    context 'when user is authenticated' do
      before do
        sign_in user
        get :current_user_info
      end

      it 'returns the user id' do
        expect(response.body).to eq({ user_id: user.id }.to_json)
      end

      it 'returns HTTP status 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when user is not authenticated' do
      before do
        get :current_user_info
      end

      it 'redirects to the sign-in page' do
        expect(response).to redirect_to(new_user_session_path)
      end

      it 'returns HTTP status 302' do
        expect(response).to have_http_status(302)
      end
    end
  end
end

