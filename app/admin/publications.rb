ActiveAdmin.register Publication do
  filter :locale, :label => "Language", :as => :select, :collection => ["gr", "en"]
  
  index do
    column :title  
    column :description
    column :pub_date   
    column :locale, :label => "Language"
    default_actions
  end
  
  show do |pub|
    attributes_table_for pub do
        [:title, :description, :pub_date, :locale].each do |column|
          row column
        end
      end
    end
    
  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :pub_date
      f.input :locale, :as => :select, :collection => ["gr", "en"]
    end
    f.buttons
  end
end
