module TagFilter

  def tag_url(input)
    input.downcase.gsub(' ', '-')
  end

end

Liquid::Template.register_filter(TagFilter)
