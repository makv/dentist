# == Schema Information
#
# Table name: photos
#
#  id                 :integer         not null, primary key
#  caption            :string(255)
#  locale             :string(255)
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string(255)
#  image_content_type :string(255)
#  image_file_size    :integer
#  gallery_id         :integer
#  position           :integer
#

require 'spec_helper'

describe Photo do
  pending "add some examples to (or delete) #{__FILE__}"
end
