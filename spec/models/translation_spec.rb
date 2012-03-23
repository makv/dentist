# == Schema Information
#
# Table name: translations
#
#  id             :integer         not null, primary key
#  locale         :string(255)
#  key            :string(255)
#  value          :text
#  interpolations :text
#  is_proc        :boolean         default(FALSE)
#  created_at     :datetime
#  updated_at     :datetime
#

require 'spec_helper'

describe Translation do
  pending "add some examples to (or delete) #{__FILE__}"
end
