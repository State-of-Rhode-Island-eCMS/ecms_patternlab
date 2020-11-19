document.addEventListener("DOMContentLoaded", function() {

  // Hide notifications based on cookie value.
  var notificationCookie = getCookie('siteNotifications');
  if (notificationCookie !== null && notificationCookie !== undefined) {
    if (notificationCookie === 'hidden') {
      document.getElementById('summary-notifications').setAttribute('aria-expanded', 'false');
      document.getElementById('details-notifications').classList.remove('js__aria-expanded');
    }
  }

  // Add logic to set cookie values based on state of button.
  const notificationsToggle = document.getElementById('summary-notifications');
  if (notificationsToggle !== null && notificationsToggle !== undefined) {
    notificationsToggle.addEventListener('click', function(event) {
      if (a11yClick(event) === true) {
        var expanded = notificationsToggle.getAttribute('aria-expanded');

        if (expanded == 'true') {
          document.cookie = "siteNotifications=display; max-age=31536000; path=/; samesite=strict";
        } else {
          document.cookie = "siteNotifications=hidden; max-age=31536000; path=/; samesite=strict";
        }
      }
    })
  }
});

