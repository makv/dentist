class ChangeArticleSectionsContentType < ActiveRecord::Migration
  def change
  	change_column :article_sections, :content, :text
  end
end
