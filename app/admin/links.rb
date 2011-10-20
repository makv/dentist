ActiveAdmin.register Link do
  
  filter :locale, :label => "Language", :as => :select, :collection => ["gr", "en"]
  
  index do
    column :title
    column :url   
    column :description   
    column :locale, :label => "Language"
    default_actions
  end
  
  show do |link|
    attributes_table_for link do
        [:title, :url, :description, :locale].each do |column|
          row column
        end
      end
    end
    
  form do |f|
    f.inputs do
      f.input :title
      f.input :url
      f.input :description
      f.input :locale, :as => :select, :collection => ["gr", "en"]
    end
    f.buttons
  end
end
