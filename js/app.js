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
