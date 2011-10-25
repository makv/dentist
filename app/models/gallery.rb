# == Schema Information
#
# Table name: galleries
#
#  id          :integer         not null, primary key
#  title       :string(255)
#  description :string(255)
#  locale      :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Gallery < ActiveRecord::Base
  has_many :photos, :order => "position"
  accepts_nested_attributes_for :photos, :allow_destroy => true
end
