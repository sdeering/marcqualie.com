// Full page search
$(function() {

  var getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
 }

  if ($('#search-results-full').length === 0) {
    return;
  }
  var searchForm = $('#search-form-full');
  var searchQuery = $('#search-query-full');
  var searchResultsFullElement = $('#search-results-full .entries');
  var request;

  var doSearch = function () {
    var query = searchQuery.val();
    if (request) {
      request.abort();
    }
    searchForm.addClass('loading');
    request = $.get(GoStaticApiHost + '/v1/projects/1/search?limit=5&q=' + encodeURIComponent(query) + '&access_token=' + GoStaticAccessToken);
    request.success(function (response) {
      searchForm.removeClass('loading');
      searchResultsFullElement.empty();
      response.search.forEach(function (post) {
        var result = $('<div>');
        result.addClass('result').addClass('clearfix');
        var meta = $('<div>');
        meta.addClass('meta');
        var title = $('<h4>');
        var titleLink = $('<a>');
        titleLink.attr('href', post.permalink);
        titleLink.attr('title', post.title);
        titleLink.html(post.title);
        title.append(titleLink);
        meta.append(title);
        var body = $('<p>');
        body.addClass('body');
        body.text(post.excerpt);
        meta.append(body);
        var link = $('<a>');
        link.attr('href', post.permalink);
        link.attr('title', post.title);
        var linkSpan = $('<span>');
        linkSpan.text(post.permalink);
        link.append(linkSpan);
        meta.append(link);
        result.append(meta);
        searchResultsFullElement.append(result);
      });
    });
  };

  // Setup
  searchQuery.val(getParameterByName('q'));
  // searchQuery.on('keyup', doSearch); // TODO: Re-enable this when GoStatic Search API is released as stable + HA
  searchQuery.on('keydown', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      doSearch();
      return false;
    }
  });
  doSearch();
  searchQuery.focus();

});
