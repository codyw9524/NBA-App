class SingleNameFieldForPlayers < ActiveRecord::Migration
  def change
  	remove_column :players, :first_name
  	remove_column :players, :last_name
  end
end
