ActiveAdmin.register Gallery do
  
  config.clear_action_items!
  config.clear_sidebar_sections!
  
  index do
    column :title
    column :description      
    column :locale, :label => "Language"
    default_actions
  end
  
  show do |gallery|
    panel("Details") do
      attributes_table_for gallery do
        [:title, :description, :locale].each do |column|
          row column.html_safe
        end
      end
    end
    panel("Photos") do
      table_for gallery.photos do
        column :position
        column :caption
        column "Photo" do |photo|
          image_tag photo.image.url(:thumb)
        end
      end
    end
  end
  
  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :locale
    end
    f.inputs "Photos" do
      f.has_many :photos do |j|
        if !j.object.id.nil?
          j.input :_destroy, :as => :boolean, :label => "Delete"
        end
        j.form_buffers.last << "<fieldset><ol><li><label>Preview</label><img src='#{j.object.image.url(:thumb) rescue nil}' style='float:left;margin:1em;' /></li></ol></fieldset>".html_safe
        j.inputs :caption
        j.inputs :position
        j.inputs :image, :as => :file

      end
    end

    f.buttons
  end

end
