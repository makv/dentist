ActiveAdmin.register Article do
  
  controller do
    defaults :finder => :find_by_permalink
  end
  
  filter :type, :as => :select, :collection => Article.select_options
  filter :locale, :as => :select, :collection => ["gr", "en"]
  filter :title
    
  index do |i|
    column :article_id
    column :type
    column :locale, :label => "Language"
    column "Title" do |article|
      article.title.html_safe 
    end
    default_actions
  end
  
  show do |article|
    panel("Details") do
      attributes_table_for article do
        row "Title" do
          article.title.html_safe
        end
        [:article_id, :locale, :type].each do |column|
          row column
        end
      end
    end
    panel("Sections") do
      table_for article.article_sections do
        column "Title" do |section|
          section.title.html_safe
        end
        column "Content" do |section|
          section.content.html_safe
        end
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
