# == Schema Information
#
# Table name: article_sections
#
#  id         :integer         not null, primary key
#  title      :string(255)
#  content    :text(255)
#  article_id :integer
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#

class ArticleSection < ActiveRecord::Base
	belongs_to :article
	acts_as_list :scope => :article

	# validates :content, :presence => true
	# validates :position, :presence => true

	attr_accessible :id
	attr_accessible :title
	attr_accessible :content
  	attr_accessible :article_id
  	attr_accessible :position
  	attr_accessible :created_at
  	attr_accessible :updated_at
end
