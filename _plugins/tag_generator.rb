module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['layout'] = "tag"
      self.data['canonical'] = "/tag/#{tag.downcase.gsub(' ', '-')}"
      self.data['permalink'] = "#{self.data['canonical']}/"
      self.data['description'] = "Blog posts tagged &ldquo;#{tag}&rdquo;"
      self.data['title'] = "#{tag} Posts on Marc Qualie's Blog"
    end
  end
  class TagGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'tag'
        dir = site.config['tag_dir'] || 'tag'
        site.tags.keys.each do |tag|
          tag = tag
          write_tag_index(site, File.join(dir, tag.downcase.gsub(' ', '-')), tag)
        end
      end
    end
    def write_tag_index(site, dir, tag)
      index = TagIndex.new(site, site.source, dir, tag)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end
