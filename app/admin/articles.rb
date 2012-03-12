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
    panel("Sections") do
      table_for article.article_sections do
        column :position
        column :title
        column :content
      end
    end
  end
  
  form do |f|
    f.inputs do
      f.input :title, :input_html => {:class => 'editor'}
      f.input :type, :as => :select, :collection => Article.select_options
      f.input :locale, :as => :select, :collection => ["en", "gr"]
    end
    f.inputs "Sections" do
      f.has_many :article_sections do |j|
        if !j.object.id.nil?
          j.input :_destroy, :as => :boolean, :label => "Delete"
        end
        j.inputs :position
        j.inputs :title
        j.inputs :content, :input_html => {:class => 'editor'}
      end
    end
    f.buttons
  end
  
end
