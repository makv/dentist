class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.integer :pub_id
      t.string :title
      t.string :description
      t.date :pub_date
      t.string :locale

      t.timestamps
    end
  end
end
