class CreatePeriodontologyArticles < ActiveRecord::Migration
  def self.up
    create_table :periodontology_articles do |t|
      t.integer :article_id
      t.string :locale
      t.string :title
      t.string :description
      t.string :method
      t.string :image_before_url
      t.string :image_after_url

      t.timestamps
    end
  end
  def self.down
    drop_table :periodontology_articles
  end
end
