class AddLocaleIndexToPeriodontologyArticles < ActiveRecord::Migration
  def self.up
    add_index :periodontology_articles, :locale
  end
  
  def self.down
    remove_index :periodontology_articles, :locale
  end
end
