# == Schema Information
#
# Table name: article_sections
#
#  id         :integer         not null, primary key
#  title      :string(255)
#  content    :text
#  article_id :integer
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe ArticleSection do
  pending "add some examples to (or delete) #{__FILE__}"
end
