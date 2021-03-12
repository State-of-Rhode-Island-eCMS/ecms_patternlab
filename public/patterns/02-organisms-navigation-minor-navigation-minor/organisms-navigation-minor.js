document.addEventListener('DOMContentLoaded', function() {

  // Toggle button for mobile menu
  // Different than the global in that we toggle a class on the parent
  // Also needs to hook into global Page Overlay actions
  var qh_toggle_btn = document.getElementById('js__minor-toggle');
  var qh_nav_minor = document.getElementById('js__minor-menu');
  if (qh_toggle_btn !== null && qh_toggle_btn !== undefined) {
    qh_toggle_btn.addEventListener('click', function(event) {
      // a11yClick function restricts keypress to spacebar or enter
      if (a11yClick(event) === true) {
        event.preventDefault();
        if (qh_nav_minor.classList.contains('qh__nav-minor--expanded')) {
          qh_nav_minor.classList.remove('qh__nav-minor--expanded');
          deactivatePageOverlay();
        } else {
          allMenuCloser();
          activatePageOverlay();
          qh_nav_minor.classList.add('qh__nav-minor--expanded');
        }
      }
    });
  }
});
