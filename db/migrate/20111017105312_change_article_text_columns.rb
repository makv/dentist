class ChangeArticleTextColumns < ActiveRecord::Migration
  def change
    change_column :articles, :description, :text
    change_column :articles, :method, :text
    drop_table :periodontology_articles
    drop_table :implants_articles
  end
end
