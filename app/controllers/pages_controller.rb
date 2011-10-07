class PagesController < ApplicationController
  def home
  end

  def contact
    @title = t('.contact_title');
  end

end
