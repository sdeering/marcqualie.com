//= require jquery-1.10.2.js
//= require bootstrap.js
//= require_self

// Disqus
var disqus_shortname = 'marcqualie';
$(function() {
  if ($('#disqus_thread').length > 0) {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/' + ($('#disqus_thread').length > 0 ? 'embed' : 'count') + '.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }
});

// Twitter
$(function () {
  if ($('.twitter-timeline').length > 0) {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  }
});

// Links open in new tab
$(function () {
  $('a').each(function (index, element) {
    var atag = $(element);
    var href = atag.attr('href');
    if (! href) {
      return;
    }
    if (
        href.indexOf('http://marcqualie.com') === -1
     && href.indexOf('https://marcqualie.com') === -1
     && href.indexOf('/') !== 0
     && href.indexOf('javascript:') !== 0
     && href.indexOf('#') !== 0
    ) {
      atag.attr('target', '_blank');
    }
  })
});
