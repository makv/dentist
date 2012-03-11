class ImplantsArticlesController < ApplicationController
  def index
    @article = ImplantsArticle.first
    @title = t('.implants_title')
  end
  
  def show
    @article = ImplantsArticle.find_by_permalink(params[:id])
    @title = @article.title
    if request.xhr?
      render :template => 'implants_articles/show', :layout => false
    else
      render :template => 'implants_articles/index'
    end
  end

end