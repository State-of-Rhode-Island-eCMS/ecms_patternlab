document.addEventListener("DOMContentLoaded", function() {

  // Toggle button for mobile menu
  var qh_toggle_btn = document.getElementById('js-toggle-nav');
  var qh_body_element = document.getElementsByTagName('body')[0];
  qh_body_element.classList.add('qh__nav-main__overlay');
  qh_toggle_btn.addEventListener('click', function(event) {
    // a11yClick function restricts keypress to spacebar or enter
    if (a11yClick(event) === true) {
      var expanded = qh_toggle_btn.getAttribute('aria-expanded');
      if (expanded == 'true') {
        qh_toggle_btn.setAttribute('aria-expanded', 'false');
        qh_body_element.classList.remove('qh__nav-main__overlay--visible');
      } else {
        qh_toggle_btn.setAttribute('aria-expanded', 'true');
        qh_body_element.classList.add('qh__nav-main__overlay--visible');
      }
    }
  });
  // TODO: Add handler that checks for a click outside of Menu and closes the menu
  // Since the body overlay is a ::after element, this needs to be done by processing the
  // x y coordinates of the click and checking to see if it is inside the menu or not


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
