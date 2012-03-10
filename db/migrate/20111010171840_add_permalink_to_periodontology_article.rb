class AddPermalinkToPeriodontologyArticle < ActiveRecord::Migration
  def change
    add_column :periodontology_articles, :permalink, :string
  end
end