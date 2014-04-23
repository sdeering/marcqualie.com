var addthis_config = {
  pubid: 'marcqualie'
};
$(document).ready(function () {
  var checkForAddThis = function () {
    if (window.addthis) {
      clearTimeout(checkForAddThisInterval);
      addthis.init();
      addthis.layers({
        'theme': 'transparent',
        'share': {
          'position': 'left',
          'numPreferredServices': 5,
          'services': 'twitter,google_plusone_share,facebook,reddit,more'
        },
        'whatsnext': {}
      });
    }
  }
  var checkForAddThisInterval = setInterval(checkForAddThis, 200);
  setTimeout(function() {
    var script = document.createElement('script');
    script.async = 1;
    script.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=marcqualie';
    var first_script = document.getElementsByTagName('script')[0];
    first_script.parentNode.insertBefore(script, first_script);
  }, 100);
});
