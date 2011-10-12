class PeriodontologyArticle < ActiveRecord::Base
  
  def to_param
    permalink
  end

end
