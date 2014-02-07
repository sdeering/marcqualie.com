//= require jquery/jquery.js
//= require bootstrap/dist/js/bootstrap.js
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

// Markdown does not add classes to elements so this is to get bootstrap styles
$(function () {
  $('table:not(.table').addClass('table table-bordered table-striped');
});
