document.addEventListener("DOMContentLoaded", function() {

  // Toggle button for mobile menu
  var qh_toggle_btn = document.getElementById('js-toggle-nav');
  qh_toggle_btn.addEventListener('click', function(event) {
    // a11yClick function restricts keypress to spacebar or enter
    if (a11yClick(event) === true) {
      var expanded = qh_toggle_btn.getAttribute('aria-expanded');
      if (expanded == 'true') {
        qh_toggle_btn.setAttribute('aria-expanded', 'false');
      } else {
        qh_toggle_btn.setAttribute('aria-expanded', 'true');
      }
    }
  });

  // Listen to mouse press, spacebar key press, and enter key press
  var qh_dd_btns = document.querySelectorAll('.js-qh-dd-toggle');
  qh_dd_btns.forEach(function(toggle) {
    toggle.addEventListener('click', function(event) {
      // a11yClick function restricts keypress to spacebar or enter
      if (a11yClick(event) === true) {
        var expanded = toggle.getAttribute('aria-expanded');
        // Close all
        qh_dd_btns.forEach(function(btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
        // Open the one that was pressed
        if (expanded == 'false') {
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // TODO: Add JS that duplicates the top-level anchor and inserts its destination
  // URL into an "Overview" link
});
