source 'http://rubygems.org'

gem 'rails', '3.1.1'
# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

gem 'activeadmin'
gem 'sass-rails'
gem "meta_search",    '>= 1.1.0.pre'

gem "rake", "0.9.2"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

gem 'jquery-rails'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'
group :production do
  gem 'pg'
end
group :development do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'execjs'
  gem 'therubyracer'
end
group :test do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'webrat'
end
