class PeriodontologyArticlesController < ApplicationController
  def index
    @article = PeriodontologyArticle.first
  end
  
  def show
    @article = PeriodontologyArticle.find_by_permalink(params[:id])
    if request.xhr?
      render :template => 'periodontology_articles/show', :layout => false
    else
      render :template => 'periodontology_articles/index'
    end
  end

end
