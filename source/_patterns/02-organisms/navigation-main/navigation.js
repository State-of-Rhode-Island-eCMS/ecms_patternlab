document.addEventListener("DOMContentLoaded", function() {

  // Listen to mouse press, spacebar key press, and enter key press
  var qh_dd_btns = document.querySelectorAll('.js-qh-dd-toggle');
  qh_dd_btns.forEach(function(btn) {
    // a11yClick function restricts keypress to spacebar or enter
    if (a11yClick(e) === true) {
      btn.addEventListener('click', function (e) {
        var expanded = btn.getAttribute('aria-expanded');
        // Close all
        btns.forEach(function(btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
        // Open the one that was pressed
        if (expanded == 'false') {
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
