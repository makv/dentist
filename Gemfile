source 'http://rubygems.org'

gem 'rails', '3.1.1'
# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'
gem 'thin'
gem "meta_search",    '>= 1.1.0.pre'
gem 'sass-rails', "~> 3.1.5"
gem 'activeadmin', '0.4.1'  #0.4.2 breaks the asset pipeline
gem 'acts_as_list'
gem "rake", "0.9.2"
gem 'jquery-rails'
gem "paperclip", "~> 2.4.4"
gem 'aws-s3'
gem 'tinymce-rails'
gem 'i18n-active_record', :git => 'git://github.com/svenfuchs/i18n-active_record.git', :require => 'i18n/active_record'
gem 'taps'
# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end
# Use unicorn as the web server
# gem 'unicorn'
# Deploy with Capistrano
# gem 'capistrano'
group :production do
  gem 'pg'
end
group :development do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'execjs'
  gem 'therubyracer'
  gem 'ruby-debug19', :require => 'ruby-debug'
  gem 'annotate'
end
group :test do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'webrat'
end