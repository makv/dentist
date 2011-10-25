# == Schema Information
#
# Table name: faqs
#
#  id         :integer         not null, primary key
#  question   :text(255)
#  answer     :text(255)
#  locale     :string(255)
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Faq do
  pending "add some examples to (or delete) #{__FILE__}"
end
