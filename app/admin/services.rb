ActiveAdmin.register Service do

  filter :locale, :label => "Language", :as => :select, :collection => LOCALES

  index do
    column :title
    column :locale, :label => "Language"
    default_actions
  end

  show do |service|
    attributes_table_for service do
      [:title, :locale].each do |column|
        row column
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :locale, :as => :select, :collection => LOCALES
    end
    f.buttons
  end
end