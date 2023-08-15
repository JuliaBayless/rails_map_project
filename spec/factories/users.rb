FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { "password123" }
    password_confirmation { "password123" }
    confirmed_at { Time.now }

    # Omniauth attributes
    provider { "some_provider" } # e.g., "facebook", "google", etc.
    uid { SecureRandom.uuid }
    name { Faker::Name.name }
    image { Faker::Avatar.image }

    # Trackable attributes
    sign_in_count { 0 }
    current_sign_in_at { Time.now }
    last_sign_in_at { Time.now - 1.day }
    current_sign_in_ip { Faker::Internet.ip_v4_address }
    last_sign_in_ip { Faker::Internet.ip_v4_address }

    # This trait creates a user with omniauth details
    trait :from_omniauth do
      provider { "facebook" } # As an example
      uid { SecureRandom.uuid }
      email { Faker::Internet.unique.email }
      password { Devise.friendly_token[0, 20] }
      name { Faker::Name.name }
      image { Faker::Avatar.image }
      skip_confirmation!
    end
  end
end

