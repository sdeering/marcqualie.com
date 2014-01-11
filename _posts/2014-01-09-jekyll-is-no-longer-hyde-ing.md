---
layout: post
title: "Jekyll is no longer Hyde-ing"
date: 2014-01-09 19:40:00
thumb: jekyll.png
tags:
  - Jekyll
  - Programming
  - Development
  - Go Static
  - CMS
  - Update
  - Personal
published: true
---

After convincing myself all year that I will finally Go Static and get rid of my custom CMS for this blog, I decided to finally launch it on the very last day of the year; Talk about leaving things until the last minute! This isn't a complete coincidence though, as I've been working long hours on a new project which is related to Jekyll development. I'll blog about this separately further into the year. This post is going to cover why I chose Jekyll, and why it's going to be so powerful moving into 2014.

### Why Jekyll over custom CMS?

This is the question on almost everyone's mind when I talk to them about Jekyll. A custom CMS can do almost anything you need it do, so why change? There are hundreds of them actively developed by the open source community which brings tons of great software to the market. This is an awesome thing, however the whole work-flow gets on my nerves for many reasons. For my use case, Jekyll has solved almost all of these annoyances and the ones it didn't solve I created custom plug-ins for.

### Almost too easy to set up

For those of you who have set-up a CMS (e.g Wordpress) you know it can be difficult to both initially set up and to maintain for a client. Setting up a secure database, installing a cache, plug-ins, version upgrades, security patches and theme dependencies are just some of the things you have to battle with when maintaining a traditional CMS. What happens when your new theme doesn't work with one of the plug-ins that are running but an alternative plug-in doesn't work with another plug-in that is installed? Imagine if all of that was gone. Since Jekyll is entirely flat file based there is no database or cache needed to get high performance. There is no dynamic scripting language so it's virtually impossible to get hacked via your web server. Setting up Jekyll takes a matter of minutes rather than hours or even days in some cases.

### No backup strategy needed

If you are using version control (if not, why not?) then you already have a backup system in place with easy rollback functionality. You no longer have to worry about paying for storage elsewhere or make sure that crons run to backup the data. You also know that your data will be 100% up-to-date, unlike a system where you backups could be as much as 24 hours behind in a major outage where your main database is corrupted. This is a huge win for both always consistent content and ease of maintainability. Your content and your site scaffolding are also backed up in the same place which is not the case with most other CMSs.

### Cheaper to maintain

Since there are no complex run-times or scripting languages to run, the compiled site can be run out of almost any standard HTTP web server. I am currently using Nginx due to it's great scalability and high performance, but it's just as easy with Apache or other alternative. A site which would maybe hold a couple of hundred concurrent users with PHP could now easily scale to 10s of thousands as long as there is enough bandwidth and RAM on the machine. You can even serve your site directly out of Amazon S3 where you only pay for the storage and bandwidth used instead of keeping a web server running.

### CDN All The Things

Why serve just your assets out of a CDN when your entire site could be served from Edge cache? Imagine every single request for a page on your domain coming from a server in the same country as your visitors. This is something that is simply not possible without the site being 100% static or having stale data that has to be updated. Not only does this speed things up but it also another way to not have to worry about hosting management. The CDN is responsible for serving content to your users from data centers around the globe which means your site availability will greatly increase and your site will feel almost instantaneous.

### Personal Editing Interface

I'm currently using a mixture custom fork of [Prose](http://prose.io) and Sublime Text 3 to write this post, but nothing is stopping you using any editor of your choice. Since all files are plain text markdown (by default, the engine can be changed) then you can use your preferred editor of choice on your own machine. If you need to edit on the go to keep the site updated then go for an online editor such as Prose, Cloud9 or various other alternatives. If you're a little code-savvy you could even code up something nice for yourself and host it somewhere like Heroku to have a fully custom on-line editing experience.

### Drawbacks

Jekyll isn't for everyone. It's mainly aimed at developers due to the fact you are editing within the project code directory and there's no nice control panel like you get with Wordpress. For most developers this will be fine, but for non-techies this can be a huge drawback. Since everything has to be pre-compiled, there's no way to pull in data from a database in real-time like you might be used to. If you change any content you will have to re-deploy to your server, which can turn out to be more hassle than simply editing via a control panel. There are ways around this such as integrating with [Github Pages](https://pages.github.com) or [Go Static](https://gostatic.io).

### Conclusion

Overall Jekyll is a great platform for managing your content but it's still maturing. The project I'm working on will be aimed at bridging the gap between flat file version controlled markdown with a beautiful and easy to use control panel which requires no technical knowledge to set up and use. Use the comments below if you have any questions or thoughts around Jekyll or Static Site Managing in general. I'd love to get your feedback!
