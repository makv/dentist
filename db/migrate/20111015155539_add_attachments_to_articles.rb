class AddAttachmentsToArticles < ActiveRecord::Migration
  def up
    rename_column :articles, :image_before_url, :image_before_file_name
    rename_column :articles, :image_after_url, :image_after_file_name
  end
  def down
    rename_column :articles, :image_before_file_name, :image_before_url
    rename_column :articles, :image_after_file_name, :image_after_url
  end
end
