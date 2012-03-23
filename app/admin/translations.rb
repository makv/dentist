ActiveAdmin.register Translation do

  filter :locale, :label => "Language", :as => :select, :collection => ["gr", "en"]
  
  index do
    column :key  
    column :locale
    column :value
    default_actions
  end
  
  show do |tr|
    attributes_table_for tr do
      [:key, :locale, :value].each do |column|
        row column
      end
    end
  end
    
  form do |f|
    f.inputs do
      f.input :key
      f.input :locale, :as => :select, :collection => ["gr", "en"]
      f.input :value
    end
    f.buttons
  end

end
