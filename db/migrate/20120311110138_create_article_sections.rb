class CreateArticleSections < ActiveRecord::Migration
  def change
    create_table :article_sections do |t|
      t.string :title
      t.string :content
      t.integer :article_id
      t.integer :position

      t.timestamps
    end
  end
end
