class ArticleSection < ActiveRecord::Base
	belongs_to :article
	acts_as_list :scope => :article

	validates :content, :presence => true
	validates :article_id, :presence => true
	validates :position, :presence => true
end
