// Hide notifications based on cookie value.
var notificationCookie = getCookie('siteNotifications');
if (notificationCookie !== null && notificationCookie !== undefined) {
  if (notificationCookie === 'hidden') {
    var summaryElement = document.getElementById('summary-notifications');
    var detailsElement = document.getElementById('details-notifications');
    if (summaryElement !== null && summaryElement !== undefined) {
      summaryElement.setAttribute('aria-expanded', 'false');
      detailsElement.classList.remove('js__aria-expanded');
    }
  }
}

// Add logic to set cookie values based on state of button.
var notificationsToggle = document.getElementById('summary-notifications');
if (notificationsToggle !== null && notificationsToggle !== undefined) {
  notificationsToggle.addEventListener('click', function(event) {
    if (a11yClick(event) === true) {
      var expanded = notificationsToggle.getAttribute('aria-expanded');

      if (expanded == 'true') {
        // Optimization for Repeat Views
        sessionStorage.setItem('siteNotificationsHidden', true);
        document.documentElement.classList.add("notifications-hidden");
      } else {
        // Optimization for Repeat Views
        sessionStorage.removeItem('siteNotificationsHidden');
        document.documentElement.classList.remove("notifications-hidden");
      }
    }
  })
}

