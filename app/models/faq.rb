class Faq < ActiveRecord::Base
  validates :question, :presence => :true
  validates :answer, :presence => :true
  validates :locale, :presence => :true
end
