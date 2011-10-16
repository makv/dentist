ActiveAdmin.register Article do
  
  controller do
    defaults :finder => :find_by_permalink
  end
    
  index do
    column :article_id
    column :type      
    column :locale, :label => "Language"
    column :title
    default_actions
  end
  
  form do |f|
    f.inputs "Details" do
      f.input :type, :as => :select, :collection => Article.subclasses
      f.input :locale, :as => :select, :collection => ["en", "gr"]
      f.input :title
    end
    f.inputs "Content" do
      f.input :description
      f.input :method
      f.input :image_before, :as => :file
      f.input :image_after, :as => :file
    end
    f.buttons
  end
  
end
