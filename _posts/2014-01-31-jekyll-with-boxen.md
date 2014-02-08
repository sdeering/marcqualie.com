---
title: Jekyll with Boxen
layout: post
thumb: boxen.png
tags:
  - Boxen
  - Jekyll
  - Github
---
Not only does Jekyll power this blog but it has been one of the main tools I use on a daily basis for almost 2 months now.
Due to it's growing role in our company I was starting to get fed up with having to manually pull down repositories and ask other team members to do the same, especially when all of our ruby projects are managed via [Boxen](https://boxen.github.com). This post is to share my knowledge of how I was able to very easily modify a boxen project to work with an install of Jekyll instead of the default ruby setup.

To start with, you're going to want to navigate to your boxen repo directory which is installed at ```/opt/boxen/repo``` by default.
Once there, create a new project in ```modules/projects/manifests``` called ```jekyll.pp```.
You may want to name this file the same as your project name (especially if you end up having multiple projects) but to keep things simple I will be referring to this file as jekyll.pp to make it easier to follow.
The file contents should be as follows.

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

I could have gone the route of building a custom puppet module but this way is way more straight forward and easier to work with.
Each of these settings should be straight forward to anyone who's set up a boxen project before but for those who haven't I will explain what each one does.

setting     | description
------------| -----------
server_name | Unique hostname you use to access the site in your browser
source      | Location of your repository on Github
ruby        | Ruby version you wish to use Jekyll with
nginx       | Path to your custom nginx template

Next, create a file in ```modules/projects/templates/shared/nginx.jekyll.conf.erb```.
You will notice it looks very similar to the path you supplied above but they are purposefully different.
I found this out the hard way when my boxen run kept complaining the file was missing.
The file contents should be as follows.

```
server {

  listen 80;
  root <%= @repo_dir %>/_site;
  server_name <%= @server_name %>;

  # Logging
  access_log <%= scope.lookupvar "nginx::config::logdir" %>/<%= @name %>.access.log main;
  access_log <%= scope.lookupvar "nginx::config::logdir" %>/<%= @name %>.error.log main;

  # Variables
  index index.html;
  client_max_body_size 1M;

  # Error Pages
  error_page 500 502 503 504 /50x.html;

  # Proxy
  try_files $uri/index.html $uri =404;

}
```

You can customize this template a bit more to suite your needs using the variables below.

variable              | description
----------------------|------------
@repo.dir             | Document root of your application code
@server_name          | server_name setting you provided earlier
nginx::config::logdir | Internal logging path which nginx is setup to use
@name                 | Name of your project class above


Now run the ```boxen``` command to install the project.
Once that completes you should compile your site if you haven't already using ```jekyll build```.
You can watch for file changes and auto build using the ```--watch``` flag.
There is more information on [Jekyll usage](http://jekyllrb.com/docs/usage/) in the documentation.
If everything goes correctly there should be no errors and you will be able to access your new compiled boxen site from the vhost you setup earlier (jekyll.dev).
If you have changed the _config.yml file to have a different destination folder then make sure you set the correct root directive in your template instead of _site.

That is all you should need to get a default install of Jekyll running.
If you run into any troubles or have any questions then please contact me in the comments below.
