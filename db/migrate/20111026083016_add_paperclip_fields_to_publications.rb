class AddPaperclipFieldsToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :pub_pdf_file_name, :string
    add_column :publications, :pub_pdf_content_type, :string    
    add_column :publications, :pub_pdf_file_size, :integer
  end
end
