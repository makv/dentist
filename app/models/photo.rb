# == Schema Information
#
# Table name: photos
#
#  id                 :integer         not null, primary key
#  caption            :string(255)
#  locale             :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  gallery_id         :integer
#  position           :integer
#

class Photo < ActiveRecord::Base
  
  belongs_to :gallery
  acts_as_list :scope => :gallery
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  
end
