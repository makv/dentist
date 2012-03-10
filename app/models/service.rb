class Service < ActiveRecord::Base
	validates :title, :presence => true
	validates :locale, :presence => true
end

# == Schema Information
#
# Table name: services
#
#  id         :integer         not null, primary key
#  title      :string(255)
#  locale     :string(255)
#  created_at :datetime
#  updated_at :datetime
#

