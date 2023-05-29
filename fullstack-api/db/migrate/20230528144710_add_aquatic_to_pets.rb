class AddAquaticToPets < ActiveRecord::Migration[7.0]
  def change
    add_column :pets, :aquatic, :boolean
  end
end
