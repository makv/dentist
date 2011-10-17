if Rails.env.development?
  %w[implants_article periodontology_article].each do |c|
    require_dependency File.join("app","models","#{c}.rb")
  end
end
