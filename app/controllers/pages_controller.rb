class PagesController < ApplicationController
  def home
    @title = t('.home_title');
  end

  def contact
    @title = t('.contact_title');
  end
  
  def cv
    @title = t('.bio_title');
  end

  def research
    @title = t('.research_title')
  end
end
