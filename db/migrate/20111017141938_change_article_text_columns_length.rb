class ChangeArticleTextColumnsLength < ActiveRecord::Migration
  def change
    change_column :articles, :description, :text, :limit => 1024
    change_column :articles, :method, :text, :limit => 1024
  end
end
