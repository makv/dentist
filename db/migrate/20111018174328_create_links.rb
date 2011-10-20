class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.integer :link_id
      t.string :title
      t.string :url
      t.string :description
      t.string :locale

      t.timestamps
    end
  end
end
