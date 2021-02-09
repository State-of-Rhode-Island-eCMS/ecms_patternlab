//rrule/dist/es5/rrule.min.js
document.addEventListener("DOMContentLoaded", function() {
  var rules = document.querySelectorAll('.qh__teaser-event__time-rrule');
  _forEach(rules, function (index, value) {

    let rrule_string = value.dataset.rrule;
    if(window.rrule && rrule_string) {
      const humanText = window.rrule.rrulestr(rrule_string).toText();

      value.innerHTML = humanText;
    }
  });
});
