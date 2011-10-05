class PagesController < ApplicationController
  def home
    @title = "Home Page"
  end

  def contact
    @title = "Contact"
  end

end
