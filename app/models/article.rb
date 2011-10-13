class Article < ActiveRecord::Base

  before_create :set_helper_fields
  after_destroy :rearrange_ids
  
  def to_param
    permalink
  end
  

  validates :locale, :presence => true
  validates :title, :presence => true
  validates :description, :presence => true
  validates :method, :presence => true

  private
    
    def set_helper_fields
      self.permalink = title
      max_id = self.class.where(:locale => locale).maximum(:article_id)
      self.article_id = max_id.nil? ? 1 : max_id + 1
    end
    
    def rearrange_ids
      i=1
      self.class.find_all_by_locale(locale, :order => :article_id).each do |article|
        article.article_id = i
        i += 1
        article.save
      end
    end
    
end
