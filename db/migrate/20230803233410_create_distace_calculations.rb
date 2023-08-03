class CreateDistaceCalculations < ActiveRecord::Migration[7.0]
  def change
    create_table :distace_calculations do |t|
      t.string :address_1
      t.string :address_2
      t.decimal :lat, precision: 10, scale: 6, null: false
      t.decimal :lng, precision: 10, scale: 6, null: false
      t.string :distance

      t.timestamps
    end
  end
end
