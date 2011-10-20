class ChangeFaqTextFieldType < ActiveRecord::Migration
  def change
    change_column :faqs, :question, :text
    change_column :faqs, :answer, :text
  end
end
