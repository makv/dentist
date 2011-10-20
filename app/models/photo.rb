class Photo < ActiveRecord::Base
  
  belongs_to :gallery
  acts_as_list :scope => :gallery
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  
end
