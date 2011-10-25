# == Schema Information
#
# Table name: links
#
#  id          :integer         not null, primary key
#  link_id     :integer
#  title       :string(255)
#  url         :string(255)
#  description :string(255)
#  locale      :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Link < ActiveRecord::Base
  validates :title, :presence => :true
  validates :url, :presence => :true
  validates :locale, :presence => :true
end
