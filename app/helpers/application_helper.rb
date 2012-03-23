module ApplicationHelper

	def thtml(key)
		if !Translation.find_by_key_and_locale(key, params[:locale]).nil?
			return t(key).gsub(/^<p>(.*)<\/p>/, '\\1').html_safe
		else
			return key
		end
	end

end

