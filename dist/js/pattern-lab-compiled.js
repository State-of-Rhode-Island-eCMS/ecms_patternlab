// Global functions


// Check for mouse clicks, enter keypress (13), or spacebar keypress (32)
// https://karlgroves.com/2014/11/24/ridiculously-easy-trick-for-keyboard-accessibility
function a11yClick(event){
  if(event.type === 'click') {
    return true;
  } else if(event.type === 'keypress') {
    var code = event.charCode || event.keyCode;
    if((code === 32) || (code === 13)) {
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
  addPageOverlay();
});


// Menu closer function
function allMenuCloser() {

  // Close main nav
  var qh_toggle_btn = document.getElementById('js__toggle-nav');
  if (qh_toggle_btn !== null) {
    qh_toggle_btn.setAttribute('aria-expanded', 'false');
  }

  // Close sidebar nav
  var qh_nav_minor = document.getElementById('js__minor-menu');
  if (qh_nav_minor !== null) {
    qh_nav_minor.classList.remove('qh__nav-minor--expanded');
  }

  // Close settings nav
  var settingsMenuTrigger = document.getElementById('settings_trigger');
  if (settingsMenuTrigger !== null) {
    settingsMenuTrigger.parentElement.classList.remove('open');
  }
}

// Add screen overlay
function addPageOverlay() {
  const pageOverlay = document.createElement("div");
  let divContent = document.createTextNode(" ");
  pageOverlay.appendChild(divContent);
  pageOverlay.id = 'page_overlay';
  pageOverlay.classList.add('page-overlay');
  document.getElementsByTagName("body")[0].appendChild(pageOverlay);

  if (pageOverlay) {
    document.getElementsByTagName("html")[0].classList.add('touch-nav');

    pageOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      allMenuCloser();
      deactivatePageOverlay();
    });
  }
}

function deactivatePageOverlay() {
  var pageOverlay = document.getElementById('page_overlay');
  pageOverlay.classList.remove('active');
}

function activatePageOverlay() {
  var pageOverlay = document.getElementById('page_overlay');
  pageOverlay.classList.add('active');
}

function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};


// Expand / Collapse utility
//
//Minimum expected markup:
//<div>
//  <div>
//    <button id="summaryId" class="js__expand-collapse" aria-expanded="false" aria-controls="targetId">See More</button>
//  </div>
//  <div id="targetId" aria-labelledby="summaryId" class="">Content to reveal here</div>
//</div>
//
// This function ONLY toggles a show/hide class on the target and toggles aria-expanded
// Any other functionality (like swapping the text content if true/false) needs to be in the component JS
document.addEventListener("DOMContentLoaded", function() {

  document.querySelectorAll(".js__expand-collapse").forEach(toggle_element => {
    toggle_element.addEventListener('click', function(event) {
      if (a11yClick(event) === true) {
        var expanded = toggle_element.getAttribute('aria-expanded');
        var target_id = toggle_element.getAttribute('aria-controls');
        var target_element = document.getElementById(target_id);

        if (expanded == 'true') {
          toggle_element.setAttribute('aria-expanded', 'false');
          target_element.classList.remove('js__aria-expanded')
        } else {
          toggle_element.setAttribute('aria-expanded', 'true');
          target_element.classList.add('js__aria-expanded')
        }
      }
    })
  })
});

window.onload = function(){
	fontSizeSliderSet();
	lineHeightSliderSet();
	wordSpaceSliderSet();
}

const settingsMenuToggle = document.getElementById('settings_trigger');

const settingsMenuTriggers = [].slice.call(document.querySelectorAll('.settings-menu-trigger'));

if (settingsMenuTriggers !== null && settingsMenuTriggers !== undefined) {
  settingsMenuTriggers.forEach(settingsMenuTrigger => settingsMenuTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    if (settingsMenuTrigger.parentElement.classList.contains('open')) {
      settingsMenuTrigger.parentElement.classList.remove('open');
      deactivatePageOverlay();
    } else {
      // reset open menus
      allMenuCloser();
      settingsMenuTrigger.parentElement.classList.add('open');
      activatePageOverlay();
    }
  }));
}

// Light mode settings
const lightModeToggle = document.getElementById('light_mode_switch');
const lightModeReset = document.getElementById('light_mode_reset');
var osLightMode = getComputedStyle(document.documentElement).getPropertyValue('--osLightMode').trim();

if (lightModeToggle !== null && lightModeToggle !== undefined) {
  lightModeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (osLightMode == 'dark') {
      // set a cookie to expire the setting
      console.log('check: '+osLightMode);
      document.cookie = "lightMode=light; max-age=31536000; path=/; samesite=strict";
      document.getElementsByTagName("html")[0].classList.remove('dark');
      document.getElementsByTagName("html")[0].classList.add('light');
    } else if (document.getElementsByTagName("html")[0].classList.contains('dark')) {
      // set a cookie to save the setting
      document.cookie = "lightMode=light; max-age=31536000; path=/; samesite=strict";
      document.getElementsByTagName("html")[0].classList.remove('dark');
      document.getElementsByTagName("html")[0].classList.add('light');
    } else {
      // set a cookie to save the setting
      document.cookie = "lightMode=dark; max-age=31536000; path=/; samesite=strict";
      document.getElementsByTagName("html")[0].classList.remove('light');
      document.getElementsByTagName("html")[0].classList.add('dark');
    }
    e.blur();
  });
}

if (lightModeReset !== null && lightModeReset !== undefined) {
  lightModeReset.addEventListener('click', function(e) {
    e.preventDefault();
    document.cookie = "lightMode=auto; max-age=31536000; path=/; samesite=strict";
    document.getElementsByTagName("html")[0].classList.remove('dark');
    document.getElementsByTagName("html")[0].classList.remove('light');
    e.blur();
  });
}
// Font size settings 
const fontSizeSlider = document.getElementById('font_size_modifier');
var currentFontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');

if (fontSizeSlider !== null && fontSizeSlider !== undefined) {
  fontSizeSlider.addEventListener('change', handleFontSizeSliderUpdate);
}

function handleFontSizeSliderUpdate(e) {
	document.documentElement.style.setProperty(`--fontSizeModifier`, this.value);
	document.cookie = "fontSizeModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function fontSizeSliderSet() {
	let fontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');
	document.getElementById('font_size_modifier').setAttribute('value',fontSizeModifier.trim());

}

// Line-height settings 
const lineHeightSlider = document.getElementById('line_height_modifier');
var currentlineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');

if (lineHeightSlider !== null && lineHeightSlider !== undefined) {
  lineHeightSlider.addEventListener('change', handleLineHeightSliderUpdate);
}

function handleLineHeightSliderUpdate(e) {
	document.documentElement.style.setProperty(`--lineHeightModifier`, this.value);
	document.cookie = "lineHeightModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function lineHeightSliderSet() {
	let lineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');
	document.getElementById('line_height_modifier').setAttribute('value',lineHeightModifier.trim());

}

// Word space settings 
const wordSpaceSlider = document.getElementById('word_space_modifier');
var currentWordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');

if (wordSpaceSlider !== null && wordSpaceSlider !== undefined) {
  wordSpaceSlider.addEventListener('change', handleWordSpaceSliderUpdate);
}

function handleWordSpaceSliderUpdate(e) {
	document.documentElement.style.setProperty(`--wordSpaceModifier`, this.value);
	document.cookie = "wordSpaceModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function wordSpaceSliderSet() {
	let wordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');
	document.getElementById('word_space_modifier').setAttribute('value',wordSpaceModifier.trim());

}

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

  //console.log('moveSearchIntoNav fired');

  if (qh_search !== null && qh_search !== undefined) {
    // Which direction is this going?
    if (direction === 'toNav') {
      // Move from header to nav drawer
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
      // Move from nav drawer to header
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

  //console.log('moveSocialIntoNav fired');

  if (qh_social !== null && qh_social !== undefined) {
    // Which direction is this going?
    if (direction === 'toNav') {
      // Move from header to nav drawer
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
      // Move from nav drawer to header
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
  var qh_viewport_again = getQhNavState();
  if (qh_viewport_again.trim() !== qh_viewport.trim()) {
    if (qh_viewport_again.trim() === 'js-mobile') {
      //console.log('toNav – qh_viewport= ' + qh_viewport);
      //console.log('qh_viewport_again= ' + qh_viewport_again);
      moveSearchIntoNav('toNav');
      moveSocialIntoNav('toNav');
    } else {
      //console.log('fromNav – qh_viewport= ' + qh_viewport);
      //console.log('qh_viewport_again= ' + qh_viewport_again);
      moveSocialIntoNav('fromNav');
      moveSearchIntoNav('fromNav');
    }
    // The two are different, reset the global variable
    window.qh_viewport = qh_viewport_again;
  }
}


document.addEventListener('DOMContentLoaded', function() {

  // Declare the viewport state globally
  window.qh_viewport = '';

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
  // Activates/deactivates page overlay
  // Also open/close off canvas menu
  // NOT globalized because of page overlay actions
  var qh_toggle_btn = document.getElementById('js__toggle-nav');
  if (qh_toggle_btn !== null && qh_toggle_btn !== undefined) {
    qh_toggle_btn.addEventListener('click', function(event) {
      // a11yClick function restricts keypress to spacebar or enter
      if (a11yClick(event) === true) {
        var expanded = qh_toggle_btn.getAttribute('aria-expanded');
        if (expanded == 'true') {
          qh_toggle_btn.setAttribute('aria-expanded', 'false');
          deactivatePageOverlay();
        } else {
          allMenuCloser();
          qh_toggle_btn.setAttribute('aria-expanded', 'true');
          activatePageOverlay();
        }
      }
    });
  }


  // Listen to mouse press, spacebar key press, and enter key press on Drop Down menu parents
  // Toggle the value of aria-expanded but also remove the content of href on parent
  var qh_dd_btns = document.querySelectorAll('.js__qh-dd-toggle');
  if (qh_dd_btns !== null && qh_dd_btns !== undefined) {
    console.log('qh_dd_btns is not null or undefined');
    qh_dd_btns.forEach(function(toggle_element) {
      // Remove the contents of the href from this parent button
      toggle_element.setAttribute('href', '#');
      toggle_element.addEventListener('click', function(event) {
        // a11yClick function restricts keypress to spacebar or enter
        if (a11yClick(event) === true) {
          var expanded = toggle_element.getAttribute('aria-expanded');
          // Close all
          qh_dd_btns.forEach(function(btn) {
            btn.setAttribute('aria-expanded', 'false');
          });
          // Open the one that was pressed
          if (expanded == 'false') {
            toggle_element.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  }

});

document.addEventListener("DOMContentLoaded", function() {
  // Hide notifications based on cookie value.
  var notificationCookie = getCookie('siteNotifications');
  if (notificationCookie === 'hidden') {
    console.log('hidden');
    document.getElementById('summary-notifications').setAttribute('aria-expanded', 'false');
    document.getElementById('details-notifications').classList.remove('js__aria-expanded');
  }

  // Add logic to set cookie values based on state of button.
  const notificationsToggle = document.getElementById('summary-notifications');
  notificationsToggle.addEventListener('click', function(event) {
    if (a11yClick(event) === true) {
      var expanded = notificationsToggle.getAttribute('aria-expanded');

      console.log('clicked')
      if (expanded == 'true') {
        document.cookie = "siteNotifications=display; max-age=31536000; path=/; samesite=strict";
      } else {
        document.cookie = "siteNotifications=hidden; max-age=31536000; path=/; samesite=strict";
      }
    }
  })
});


document.addEventListener('DOMContentLoaded', function() {

  // Toggle button for mobile menu
  // Different than the global in that we toggle a class on the parent
  // Also needs to hook into global Page Overlay actions
  var qh_toggle_btn = document.getElementById('js__minor-toggle');
  var qh_nav_minor = document.getElementById('js__minor-menu');
  if (qh_toggle_btn !== null && qh_toggle_btn !== undefined) {
    qh_toggle_btn.addEventListener('click', function(event) {
      // This may look the same as other accordion type buttons but it is not
      // The target is a parent element, not an adjacent sibling
      // console.log('qh_toggle_btn clicked');
      // a11yClick function restricts keypress to spacebar or enter
      if (a11yClick(event) === true) {
        // console.log('qh_toggle_btn a11y clicked');
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
