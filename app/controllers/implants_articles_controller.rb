class ImplantsArticlesController < ApplicationController
  def index
    @article = ImplantsArticle.first
  end
  
  def show
    @article = ImplantsArticle.find_by_permalink(params[:id])
    if request.xhr?
      render :template => 'implants_articles/show', :layout => false
    else
      render :template => 'implants_articles/index'
    end
  end

end
