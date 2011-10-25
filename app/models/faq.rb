# == Schema Information
#
# Table name: faqs
#
#  id         :integer         not null, primary key
#  question   :text(255)
#  answer     :text(255)
#  locale     :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Faq < ActiveRecord::Base
  validates :question, :presence => :true
  validates :answer, :presence => :true
  validates :locale, :presence => :true
end
