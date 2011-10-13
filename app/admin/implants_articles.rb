ActiveAdmin.register ImplantsArticle do
  controller do
    defaults :finder => :find_by_permalink
  end
end
