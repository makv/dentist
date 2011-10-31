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
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" },
                            :storage => :s3,
                            :bucket => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["bucket_base_name"],
                            :path => "photos/:id/:basename-:style.:extension",
                            :s3_credentials => {
                              :access_key_id => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["aws_access_key"],
                              :secret_access_key => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["aws_secret_access_key"]
                            },
                            :url  => ":s3_eu_url"

end
