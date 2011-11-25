ActiveAdmin.register Faq do
  menu false
  filter :locale, :label => "Language", :as => :select, :collection => ["gr", "en"]
  
  index do
    column :question
    column :answer      
    column :locale, :label => "Language"
    default_actions
  end
  
  show do |faq|
    attributes_table_for faq do
        [:question, :answer, :locale].each do |column|
          row column
        end
      end
    end
    
  form do |f|
    f.inputs do
      f.input :question
      f.input :answer
      f.input :locale, :as => :select, :collection => ["gr", "en"]
    end
    f.buttons
  end
end
