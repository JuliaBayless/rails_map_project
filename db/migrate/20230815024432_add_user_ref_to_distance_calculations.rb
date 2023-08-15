class AddUserRefToDistanceCalculations < ActiveRecord::Migration[7.0]
  def change
    add_reference :distance_calculations, :user, null: false, foreign_key: true
  end
end
