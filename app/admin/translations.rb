ActiveAdmin.register Translation do

  filter :locale, :label => "Language", :as => :select, :collection => LOCALES

  index do
    column :key
    column :locale
    column "Value" do |t|
      t.value.html_safe
    end
    default_actions
  end

  show do |tr|
    attributes_table_for tr do
      [:key, :locale, :value].each do |column|
        row column
      end
      row "Value" do |t|
        t.value.html_safe
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :key
      f.input :locale, :as => :select, :collection => LOCALES
      f.input :value
    end
    f.buttons
  end

end
