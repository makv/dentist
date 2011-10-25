# == Schema Information
#
# Table name: articles
#
#  id                        :integer         not null, primary key
#  article_id                :integer
#  locale                    :string(255)
#  title                     :string(255)
#  description               :text(1024)
#  method                    :text(1024)
#  image_before_file_name    :string(255)
#  image_after_file_name     :string(255)
#  permalink                 :string(255)
#  type                      :string(255)
#  created_at                :datetime
#  updated_at                :datetime
#  image_before_content_type :string(255)
#  image_before_file_size    :integer
#  image_after_content_type  :string(255)
#  image_after_file_size     :integer
#

class PeriodontologyArticle < Article
end
