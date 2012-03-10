ActiveAdmin.register Article do
  
  controller do
    defaults :finder => :find_by_permalink
  end
  
  filter :type, :as => :select, :collection => Article.select_options
  filter :locale, :as => :select, :collection => ["gr", "en"]
  filter :title
    
  index do
    column :article_id
    column :type      
    column :locale, :label => "Language"
    column :title
    default_actions
  end
  
  show do |article|
    panel("Details") do
      attributes_table_for article do
        [:article_id, :locale, :type, :title].each do |column|
          row column
        end
      end
    end
    panel("Description") do
      attributes_table_for article do
        [:description, :method].each do |column|
          row column
        end
        row "Image Before" do
          image_tag article.image_before.url(:thumb)
        end
        row "Image After" do
          image_tag article.image_after.url(:thumb)
        end
      end
    end
  end
  
  form :partial => "form"
  
end
