ActiveAdmin.register Publication do
  menu false
  filter :locale, :label => "Language", :as => :select, :collection => LOCALES

  index do
    column :title
    column :description
    column :pub_date
    column :locale, :label => "Language"
    column :pub_pdf_file_name
    default_actions
  end

  show do |pub|
    attributes_table_for pub do
      [:title, :description, :pub_date, :locale].each do |column|
        row column
      end
      row "Pdf file" do
        link_to pub.pub_pdf_file_name, pub.pub_pdf.url
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :pub_date
      f.input :locale, :as => :select, :collection => LOCALES
    end
    f.inputs "Pdf File" do
      f.form_buffers.last << "<fieldset><ol><li><label>Current file</label><a href='#{f.object.pub_pdf.url rescue nil}' style='float:left'>#{f.object.pub_pdf_file_name}</a></li></ol></fieldset>".html_safe
      f.input :pub_pdf, :as => :file, :label => "Pdf File"
    end
    f.buttons
  end
end
