# rubocop:disable Naming/VariableNumber
class CreateDistanceCalculations < ActiveRecord::Migration[7.0]
  def change

    create_table :distance_calculations, id: :integer do |t|
      t.string :address_1
      t.decimal :lat_1, precision: 10, scale: 6, null: false
      t.decimal :lng_1, precision: 10, scale: 6, null: false

      t.string :address_2
      t.decimal :lat_2, precision: 10, scale: 6, null: false
      t.decimal :lng_2, precision: 10, scale: 6, null: false

      t.decimal :distance, precision: 10, scale: 2
      t.string :title

      t.timestamps
    end
  end
end
# rubocop:enable Naming/VariableNumber