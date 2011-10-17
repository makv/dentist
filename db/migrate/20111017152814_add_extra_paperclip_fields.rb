class AddExtraPaperclipFields < ActiveRecord::Migration
  def change
    add_column :articles, :image_before_content_type, :string
    add_column :articles, :image_before_file_size, :integer
    add_column :articles, :image_after_content_type, :string
    add_column :articles, :image_after_file_size, :integer
  end
  
end
