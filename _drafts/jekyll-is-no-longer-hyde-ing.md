---
layout: post
title: "Jekyll is no longer Hyde-ing"
date: 2014-01-06 21:00:00
thumb: /images/jekyll.png
tags:
  - Update
  - Personal
  - Development
  - Programming
  - Jekyll
  - CMS
---

After convincing myself all year that I will finally *Go Static* and get rid of my custom CMS for this Blog, I decided to finally launch it on the very last day of the year; Talk about leaving things until the last minute! This isn't a complete coincidence though, as I've been working hard on a new project which I will be writing about very shortly into the new year. I'm hopefully going to cover why I chose Jekyll, and why it's going to be so powerful moving into 2014.

### Why Jekyll over custom CMS?

This is the question on almost everyone's mind when I talk to them about Jekyll. A custom CMS can do almost anything you need it do, so why change? There are hundreds of them actively developed by the open source community which brings tons of great software to the market. This is a great thing, however the whole work-flow gets on my nerves for many reasons. Jekyll has solved almost all of these annoyances and the ones it didn't solve, I created custom plugins for.

### Almost too easy to set up

For those of you who have set-up a CMS (e.g Wordpress) you know it can be difficult to both initially set up and to maintain for a client. Setting up a performant and secure database. Installing a cache to keep things snappy. What about plug-ins? Wordpress version bumps and new plug-in versions? New themes? Your new theme doesn't work with one of the plug-ins that are running but an alternative plug-in doesn't work with another plug-in that is installed? Security patches? These are just a few of the many issues that developers run into when creating and maintaining a traditional CMS. Imagine if all of that was gone. Since Jekyll is entirely flat file based there is no database or cache needed to get high performance. There is no dynamic scripting language so it's virtually impossible to get hacked via your web server. Updating the software is very easy in comparison and since it's all flat files you can simply role back (you are using version control, right?) to a previous version in seconds.

### No backup strategy needed

Continuing on from my previous point, since all your files are in version control they are naturally backed up without needing any form of extra backup system. You no longer have to worry about paying for storage elsewhere or make sure that crons run to backup the data. You also know that your data will be 100% up-to-date, unlike a system where you backups could be as much as 24 hours behind in a major outage where your main database is corrupted. This ia huge win for both always consistent content and ease of maintainability.

### Cheaper to maintain

Since there are no complex runtimes are scripting languages to run, the compiled site can be run out of almost any standard HTTP web server. I am currently using Nginx due to it's great scalability and high performance. A site which would maybe hold a couple of hundred concurrent users with PHP could now easily scale to 10s of thousands as long as there is enough bandwidth and RAM on the machine.

### CDN All The Things

Why serve just your assets out of a CDN when your entire site could be served from Edge cache? Imagine every single request for a page on your domain coming from a server in the same country as your visitors. Let that sink in for a second. This is something that is simply not possible without the site being 100% static or havinh stale data that has to be updated.

### Personal Editing Interface

I'm currently using a custom fork of http://prose.io to write this post, but nothing is stopping you using any tool. Since all files are plain text markdown (by default, can be changed) then you can use your preferred editor of choice on your own machine. If you need to edit on the go to keep the site updated then go for an online editor such as Prose, Cloud9 or various other online text editors. If you're a little code-savvy you could even code up something nice for yourself and host it somewhere like Heroku to have a fully custom experience.

### Drawbacks

Jekyll isn't for everyone. It's mainly aimed at developers due to the fact you need to push to content somewhere and there's no nice control panel like you get with Wordpress. For most developers this will be fine, but for non-techies this can be a huge drawback.

### Conclusion

Overall Jekyll is a great platform for managing your content but it's a nice platform that's still maturing. The platform I mentioned earlier should hopefully help bridge the gap between flat file, version controlled markdown with a beautiful and easy to use control panel which requires no technical knowledge to set up and use. Use the comments below if you have any questions or thoughts around Jekyll, I'd love to get your feedback!








