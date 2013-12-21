require 'digest/sha1'

module Jekyll
  class PostId < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @site_url ||= Jekyll.configuration({})['url']
      @text = text
    end

    def render(context)
      site_hash = Digest::SHA1.hexdigest(@site_url)[0, 7]
      post_hash = Digest::SHA1.hexdigest(@text)
      "#{site_hash}#{post_hash}"
    end
  end
end

Liquid::Template.register_tag('post_id', Jekyll::PostId)
