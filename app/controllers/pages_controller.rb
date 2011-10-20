class PagesController < ApplicationController
  def home
    @title = t('.home_title');
  end

  def contact
    @title = t('.contact_title');
  end
  
  def bio
    @title = t('.bio_title');
  end

end
