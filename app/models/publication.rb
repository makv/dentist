class Publication < ActiveRecord::Base
  validates :title, :presence => :true
  validates :description, :presence => :true
  validates :locale, :presence => true
end
