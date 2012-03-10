class Service < ActiveRecord::Base
	validates :title, :presence => true
	validates :locale, :presence => true
end
