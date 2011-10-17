class Article < ActiveRecord::Base

  before_create :set_helper_fields
  after_save :rearrange_ids_globally
  after_destroy :rearrange_ids
  
  def to_param
    permalink
  end
      
  has_attached_file :image_before, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  has_attached_file :image_after, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  validates :locale, :presence => true
  validates :type, :presence => true
  validates :title, :presence => true
  validates :description, :presence => true
  validates :method, :presence => true
  attr_accessible :type
  attr_accessible :locale
  attr_accessible :title
  attr_accessible :description
  attr_accessible :method
  attr_accessible :image_before
  attr_accessible :image_after
  
def self.inherited(child)
  child.instance_eval do
    def model_name
      Article.model_name
    end
  end
  super
end

def self.select_options
  descendants.map{ |c| c.to_s }.sort
end
  
  private
    
    def set_helper_fields
      self.permalink = title
      max_id = self.class.where(:locale => locale, :type => type).maximum(:article_id)
      self.article_id = max_id.nil? ? 1 : max_id + 1
    end
    
    def rearrange_ids
      i=1
      self.class.where(:locale => locale, :type => type).each do |article|
        article.article_id = i
        i += 1
        article.save
      end
    end
    
    def rearrange_ids_globally
      locale = ["gr", "en"]
      classes = Article.subclasses
        locale.each do |l|
          classes.each do |c|
            i=1
            self.class.where(:locale => l, :type => c).each do |article|
              article.update_column(:article_id, i)
              i +=1
            end
          end
        end
    end
            
    
end
