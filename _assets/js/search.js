//= require lunr.js
//= require mustache.js
//= require date.format.js
//= require uri.js
//= require jquery.lunr.search.js
//= require_self

// Inline Search
// $(function() {
//   var searchVisible = false;
//   var searchButton = $('#search-button');
//   var searchForm = $('#search-form');
//   var searchQuery = $('#search-query');
//   searchButton.on('click', function () {
//     searchVisible = !searchVisible;
//     if (searchVisible) {
//       searchButton.parent().addClass('active');
//       searchForm.removeClass('hidden');
//       searchQuery.focus();
//     } else {
//       searchButton.parent().removeClass('active');
//       searchForm.addClass('hidden');
//     }
//   });
//   searchQuery.lunrSearch({
//     indexUrl: '/search.json',
//     results:  '#search-results',
//     entries:  '.entries',
//     template: '#search-results-template'
//   });
// });

// Full page search
$(function() {
  if ($('#search-results-full-template').length === 0) {
    return;
  }
  var searchQuery = $('#search-query-full');
  searchQuery.focus();
  searchQuery.lunrSearch({
    indexUrl: '/search.json',
    results:  '#search-results-full',
    entries:  '.entries',
    template: '#search-results-full-template'
  });
});
