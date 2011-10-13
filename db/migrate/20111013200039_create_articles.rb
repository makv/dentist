class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.integer :article_id
      t.string :locale
      t.string :title
      t.string :description
      t.string :method
      t.string :image_before_url
      t.string :image_after_url
      t.string :permalink
      t.string :type

      t.timestamps
    end
  end
end
