FactoryBot.define do
  factory :distance_calculation do
    address_1 { '2400 3rd Ave S, St Paul, MN 55404' }
    lat_1 { 44.9593 }
    lng_1 { -93.2749 }
    address_2 { '725 Vineland Pl, Minneapolis, MN 55403' }
    lat_2 { 44.9672 }
    lng_2 { -93.2890 }
    distance { 3.2 }
    title { 'Some Title' }
    user
  end
end
