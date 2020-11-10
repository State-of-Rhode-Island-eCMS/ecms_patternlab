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
  var qh_toggle_btn = document.getElementById('js-toggle-nav');
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
