# rubocop:disable Naming/VariableNumber
class CreateDistanceCalculations < ActiveRecord::Migration[7.0]
  def change
    create_table :distance_calculations do |t|
      t.string :street_1
      t.string :city_1
      t.string :state_1
      t.string :zip_1
      t.decimal :lat_1, precision: 10, scale: 6, null: false
      t.decimal :lng_1, precision: 10, scale: 6, null: false

      t.string :street_2
      t.string :city_2
      t.string :state_2
      t.string :zip_2
      t.decimal :lat_2, precision: 10, scale: 6, null: false
      t.decimal :lng_2, precision: 10, scale: 6, null: false

      t.decimal :distance, precision: 10, scale: 2

      t.timestamps
    end
  end
end
# rubocop:enable Naming/VariableNumber
