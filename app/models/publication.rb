# == Schema Information
#
# Table name: publications
#
#  id          :integer         not null, primary key
#  pub_id      :integer
#  title       :string(255)
#  description :string(255)
#  pub_date    :date
#  locale      :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class Publication < ActiveRecord::Base
  validates :title, :presence => :true
  validates :description, :presence => :true
  validates :locale, :presence => true
end
