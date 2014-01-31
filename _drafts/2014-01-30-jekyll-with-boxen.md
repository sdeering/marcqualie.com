---
published: false
---
Jekyll has been one of the main tools I use on a daily basis for almost 2 months now.
I'm using it to power this blog and I also use it at my day job which is refreshing.
Due to it's growing role in our company I was starting to get fed up with having to manually pull down repositories and ask other team members to do the same.
We use boxen for all of our ruby projects so I started wonder how easy it would be to also use boxen to manage our Jekyll projects.
This post is to share my knowledge of how I was able to very easily modify a boxen project to work with an install of Jekyll instead of the default ruby setup.

To start with, you're going to want to navigate to your boxen repo directory which is installed at ```/opt/boxen/repo``` by default.
Once there, create a new project in ```modules/projects/manifests``` called ```jekyll.pp```.
You may want to name this file the same as your project name (especially if you end up having multiple projects) but to keep things simple I will be referring to this file as jekyll.pp to make it easier to follow.
The contents of the file should be as follows.

``` puppet
class projects::jekyll {
  boxen::project { 'jekyll':
    server_name   => 'jekyll.dev',
    source        => 'yourname/jekyll-project',
    ruby          => '2.0.0-p353',
    nginx         => "projects/shared/nginx.jekyll.conf.erb"
  }
}
```

I could have went the route of building a custom puppet module but this way if way more straight forward and easier to work with.
Each of these settings should be straight forward to anyone who's set up a boxen project before but for those who haven't I will explain what each one does.

setting | description
------- | -----------
server_name | Unique hostname you use to access the site in your browser
source | Location of your repository on Github
ruby | Ruby version you wish to use Jekyll with
nginx | Path to your custom nginx template
