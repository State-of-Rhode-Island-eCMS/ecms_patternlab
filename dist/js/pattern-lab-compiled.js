// Global functions

// Check for mouse clicks, enter keypress (13), or spacebar keypress (32)
// https://karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility
function a11yClick(event){
  if(event.type === 'click') {
    return true;
  } else if(event.type === 'keypress') {
    var code = event.charCode || event.keyCode;
    if((code === 32)|| (code === 13)) {
      return true;
    }
  } else {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // If JS is loaded, change the no-js class
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");
});

// There are custom properties that track what breakpoint the site is using
function getQhNavState() {
  // NOTE: Strings from CSS get returned exactly as written
  // To check them in JS for true/false, they need to be written exactly
  //
  // Example:
  //   --nav-state: 'mobile';
  // Can be checked with ' \"mobile\"';
  //   --nav-state:mobile;
  // Can be checked with 'mobile';
  //
  // The strings are VERY literal
  //
  var qh_body = document.getElementsByTagName('body')[0];
  return getComputedStyle(qh_body).getPropertyValue("--nav-state");
}

// Mobile: Move the Search component into the Navigation drawer
// Benefit of insertBefore is that it moves the element, not a copy of the element
function moveSearchIntoNav(direction) {
  var qh_search = document.getElementById('js__site-search');
  var qh_header = document.getElementById('js__search-social');
  var qh_mainnav = document.getElementById('js__primary-menu');

  if (qh_search !== null && qh_search !== undefined) {
    // Which direction is this going?
    if (direction === 'toNav') {
      if (qh_mainnav !== null && qh_mainnav !== undefined) {
        // Create a new <li>
        var qh_new_li = document.createElement('li');
        qh_new_li.classList.add('qh__nav-main__item__search');
        // Add the HTML of the search inside of it
        qh_new_li.appendChild(qh_search);
        // insert before the first child
        qh_mainnav.insertBefore(qh_new_li, qh_mainnav.firstChild);
      }
    } else {
      if (qh_header !== null && qh_mainnav !== undefined) {
        // Append search to the header container
        qh_header.appendChild(qh_search);
        // Grab the previous search LI we created
        var qh_prev_li = document.getElementsByClassName('qh__nav-main__item__search');
        if (qh_prev_li[0] !== null && qh_prev_li[0] !== undefined) {
          qh_prev_li[0].parentNode.removeChild(qh_prev_li[0]);
        }
      }
    }
  }
}

// Mobile: Move the Social List component into the Navigation drawer
function moveSocialIntoNav(direction) {
  var qh_social = document.getElementById('js__social-links');
  var qh_header = document.getElementById('js__search-social');
  var qh_mainnav = document.getElementById('js__primary-menu');

  if (qh_social !== null && qh_social !== undefined) {
    // Which direction is this going?
    if (direction === 'toNav') {
      if (qh_mainnav !== null && qh_mainnav !== undefined) {
        // Create a new <li>
        var qh_new_li = document.createElement('li');
        qh_new_li.classList.add('qh__nav-main__item__social');
        // Add the HTML of the social list inside of it
        qh_new_li.appendChild(qh_social);
        // insert after the last child
        qh_mainnav.insertBefore(qh_new_li, qh_mainnav.lastChild.nextSibling);
      }
    } else {
      if (qh_header !== null && qh_header !== undefined) {
        // Append search to the header container
        qh_header.appendChild(qh_social);
        // Grab the previous search LI we created
        var qh_prev_li = document.getElementsByClassName('qh__nav-main__item__social');
        if (qh_prev_li[0] !== null && qh_prev_li[0] !== undefined) {
          qh_prev_li[0].parentNode.removeChild(qh_prev_li[0]);
        }
      }
    }
  }
}

function moveSearchAndSocial() {
  var test = getQhNavState();
  if (test.trim() === 'js-mobile') {
    moveSearchIntoNav('toNav');
    moveSocialIntoNav('toNav');
  } else {
    moveSocialIntoNav('fromNav');
    moveSearchIntoNav('fromNav');
  }
}


document.addEventListener('DOMContentLoaded', function() {

  // Call on page ready
  moveSearchAndSocial();

  // Call again on resize or orientation change
  // With a debounced window resize handler
  var qh_window_timeout = false;
  window.addEventListener('resize', function() {
    clearTimeout(qh_window_timeout);
    qh_window_timeout = setTimeout(moveSearchAndSocial, 250);
  });
  window.addEventListener('orientationchange', moveSearchAndSocial);


  // Toggle button for mobile menu
  var qh_toggle_btn = document.getElementById('js-toggle-nav');
  var qh_body_element = document.getElementsByTagName('body')[0];
  if (qh_toggle_btn !== null && qh_toggle_btn !== undefined) {
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
  }
  // TODO: Add handler that checks for a click outside of Menu and closes the menu
  // Since the body overlay is a ::after element, this needs to be done by processing the
  // x y coordinates of the click and checking to see if it is inside the menu or not


  // Listen to mouse press, spacebar key press, and enter key press on Drop Down menu parents
  var qh_dd_btns = document.querySelectorAll('.js-qh-dd-toggle');
  if (qh_dd_btns !== null && qh_dd_btns !== undefined) {
    qh_dd_btns.forEach(function(toggle) {
      toggle.addEventListener('click', function(event) {
        // Remove the contents of the href from this parent button
        toggle.setAttribute('href', '#');
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
  }

});

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/
document.addEventListener("DOMContentLoaded", function() {

  'use strict';

  Array.prototype.slice.call(document.querySelectorAll('.js-qh-accordion')).forEach(function (accordion) {

    // Allow for multiple accordion sections to be expanded at the same time

    // This will not work now! Each accordion is a separate container
    var allowMultiple = accordion.hasAttribute('data-allow-multiple');
    // Allow for each toggle to both open and close individually
    var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

    // Create the array of toggle elements for the accordion group
    var triggers = Array.prototype.slice.call(accordion.querySelectorAll('.js-qh-accordion-trigger'));
    var panels = Array.prototype.slice.call(accordion.querySelectorAll('.js-qh-accordion-panel'));

    accordion.addEventListener('click', function (event) {
      var target = event.target;

      if (target.classList.contains('js-qh-accordion-trigger')) {
        //console.log('accordion trigger clicked');

        // Check if the current toggle is expanded.
        var isExpanded = target.getAttribute('aria-expanded') == 'true';
        var active = accordion.querySelector('[aria-expanded="true"]');

        // without allowMultiple, close the open accordion
        if (!allowMultiple && active && active !== target) {
          // Set the expanded state on the triggering element
          active.setAttribute('aria-expanded', 'false');
          // Hide the accordion sections, using aria-controls to specify the desired section
          //document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');

          // When toggling is not allowed, clean up disabled state
          if (!allowToggle) {
            active.removeAttribute('aria-disabled');
          }
        }

        if (!isExpanded) {
          // Set the expanded state on the triggering element
          target.setAttribute('aria-expanded', 'true');
          // Hide the accordion sections, using aria-controls to specify the desired section
          //document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');

          // If toggling is not allowed, set disabled state on trigger
          if (!allowToggle) {
            target.setAttribute('aria-disabled', 'true');
          }
        }
        else if (allowToggle && isExpanded) {
          // Set the expanded state on the triggering element
          target.setAttribute('aria-expanded', 'false');
          // Hide the accordion sections, using aria-controls to specify the desired section
          //document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
        }

        event.preventDefault();
      }
    });

    // Bind keyboard behaviors on the main accordion container

    // This will not work now! Each accordion is a separate container
    accordion.addEventListener('keydown', function (event) {
      var target = event.target;
      var key = event.which.toString();

      var isExpanded = target.getAttribute('aria-expanded') == 'true';
      var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

      // 33 = Page Up, 34 = Page Down
      var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

      // Is this coming from an accordion header?
      if (target.classList.contains('js-qh-accordion-trigger')) {
        // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
        // 38 = Up, 40 = Down
        if (key.match(/38|40/) || ctrlModifier) {
          var index = triggers.indexOf(target);
          var direction = (key.match(/34|40/)) ? 1 : -1;
          var length = triggers.length;
          var newIndex = (index + length + direction) % length;

          triggers[newIndex].focus();

          event.preventDefault();
        }
        else if (key.match(/35|36/)) {
          // 35 = End, 36 = Home keyboard operations
          switch (key) {
            // Go to first accordion
            case '36':
              triggers[0].focus();
              break;
              // Go to last accordion
            case '35':
              triggers[triggers.length - 1].focus();
              break;
          }
          event.preventDefault();
        }
      }
    });

    // These are used to style the accordion when one of the buttons has focus
    accordion.querySelectorAll('.js-qh-accordion-trigger').forEach(function (trigger) {

      trigger.addEventListener('focus', function (event) {
        accordion.classList.add('js-qh-focused');
      });

      trigger.addEventListener('blur', function (event) {
        accordion.classList.remove('js-qh-focused');
      });
    });

    // Minor setup: will set disabled state, via aria-disabled, to an
    // expanded/active accordion which is not allowed to be toggled close
    if (!allowToggle) {
      // Get the first expanded/ active accordion
      var expanded = accordion.querySelector('[aria-expanded="true"]');

      // If an expanded/active accordion is found, disable
      if (expanded) {
        expanded.setAttribute('aria-disabled', 'true');
      }
    }
  });
});
