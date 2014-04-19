---
title: April 2014 Redesign
layout: post
tags:
- Design
- Jekyll
- Bootstrap
---
I've had the same dull blog layout for years. Even in my transition from [Blogger](https://marcqualie.com/2012/06/post-200-new-blog) to [Wordpress](https://marcqualie.com/2012/10/no-more-wordpress) and finally [Jekyll](https://marcqualie.com/2014/01/jekyll-is-no-longer-hyde-ing) I've still kept the look similar. While I'm the first to admit that my design skills aren't great, I still thought it would be a fun diea to spent the day making the layout more content focused and less cluttered.

First of all, the black header had to go. Everytime I loaded my page it just hit me in the face; Dark colours and too text-oriented. Not only did I change the colours but it now spans the full browser width, contains a search bar, my avatar and colourful social buttons linking to my profiles which are designed to stand out and draw the eye.

Onto the content I wanted it to be more focused and streamlined. I dropped the sidebar and centered the post list with generous whitespace on either side. When people land on a page they want to be influenced on what to read or click next. By elminitating the sidebar and other distractions they are forced to start reading my posts instantly. The increased font-size and faded out interactions (such as tags) keep the user reading just the content.

As for Typography, I've always stuck to using browser built-in defaults because I'm a software engineer which makes me naturally boring and prefer functionality to asthetics. After recently being amazed by [Thoughtbot](http://www.thoughtbot.com)'s [Refills](http://thoughtbot.github.io/refills/) I took some inspiration for my new look from them and decided to go with the Titillium Web as the font of choice. Their subtle use of colours and border-radius also helped me style the header.

Finally, the whole thing remains built upon Bootstrap 3. I'm sure I'm not the only one sick of seing the same old default Boostrap themes around the Internet so I tried to stray away from the defaults a bit. The best way to do this is to use the Sass version and customize things using the variables and mixins. I learned a lot about Jekyll and various techniques to managing assets which I'm going to share in my next post.

I hope you like the new design and find it easier to enjoy my content. Feedback is always welcome so feel free to comment below. This whole site is also [Open Source](https://github.com/marcqualie/marcqualie.com) if you want to browse around the code and suggest some improvements. On a side note, one of the best things about writing with Jekyll is that as soon as I merge the [design's pull request](https://github.com/marcqualie/marcqualie.com/pull/3) this post and the new design will be live as exactly the same time!
