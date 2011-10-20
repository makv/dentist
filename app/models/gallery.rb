class Gallery < ActiveRecord::Base
  has_many :photos, :order => "position"
  accepts_nested_attributes_for :photos, :allow_destroy => true
end
