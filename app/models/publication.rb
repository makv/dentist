# == Schema Information
#
# Table name: publications
#
#  id                   :integer         not null, primary key
#  pub_id               :integer
#  title                :string(255)
#  description          :string(255)
#  pub_date             :date
#  locale               :string(255)
#  created_at           :datetime
#  updated_at           :datetime
#  pub_pdf_file_name    :string(255)
#  pub_pdf_content_type :string(255)
#  pub_pdf_file_size    :integer
#

class Publication < ActiveRecord::Base
  has_attached_file :pub_pdf, :default_url => '/file-missing.png',
                    :storage => :s3,
                    :bucket => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["bucket_base_name"],
                    :path => "publications/:id/:basename.:extension",
                    :s3_credentials => {
                        :access_key_id => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["aws_access_key"],
                        :secret_access_key => YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]["aws_secret_access_key"]
                    },
                    :url => ":s3_eu_url"
  before_post_process :forbid_pdf
  validates_attachment_content_type :pub_pdf, :content_type => ['application/pdf'],
                                    :message => 'file must be of filetype .pdf'
  validates :title, :presence => :true
  validates :description, :presence => :true
  validates :locale, :presence => true

  private

  def forbid_pdf
    return false if (pub_pdf_content_type =~ /application\/.*pdf/)
  end

end
