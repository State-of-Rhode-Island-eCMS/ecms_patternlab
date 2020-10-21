document.addEventListener("DOMContentLoaded", function() {

  // Listen to mouse press, spacebar key press, and enter key press
  var qh-dd-btns = document.querySelectorAll('.js-qh-dd-toggle');
  qh-dd-btns.forEach(function(btn) {
    // a11yClick function restricts keypress to spacebar or enter
    if (a11yClick(e) === true) {
      btn.addEventListener('click keypress', function (e) {
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
