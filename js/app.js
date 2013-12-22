// Search
$(function() {
  var searchVisible = false;
  var searchButton = $('#search-button');
  var searchForm = $('#search-form');
  var searchQuery = $('#search-query');
  searchButton.on('click', function () {
    searchVisible = !searchVisible;
    if (searchVisible) {
      searchButton.parent().addClass('active');
      searchForm.removeClass('hidden');
      searchQuery.focus();
    } else {
      searchButton.parent().removeClass('active');
      searchForm.addClass('hidden');
    }
  });
  searchQuery.lunrSearch({
    indexUrl: '/search.json',
    results:  '#search-results',
    entries:  '.entries',
    template: '#search-results-template'
  });
});

// Disqus
var disqus_shortname = 'marcqualie';
$(function() {
  var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/' + ($('#disqus_thread').length > 0 ? 'embed' : 'count') + '.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
});

// Twitter
$(function () {
  if ($('.twitter-timeline').length > 0) {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  }
});
