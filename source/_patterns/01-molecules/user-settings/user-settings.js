window.onload = function(){
	fontSizeSliderSet();
	lineHeightSliderSet();
	wordSpaceSliderSet();
}

function handleFontSizeSliderUpdate(e) {
  document.documentElement.style.setProperty(`--fontSizeModifier`, this.value);
  document.cookie = "fontSizeModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function fontSizeSliderSet() {
  let fontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');
  var fontSizeElement = document.getElementById('font_size_modifier')
  if (fontSizeElement !== null && fontSizeElement !== undefined) {
    fontSizeElement.setAttribute('value',fontSizeModifier.trim());
  }
}

function handleLineHeightSliderUpdate(e) {
  document.documentElement.style.setProperty(`--lineHeightModifier`, this.value);
  document.cookie = "lineHeightModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function lineHeightSliderSet() {
  let lineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');
  var lineSpaceElement = document.getElementById('line_height_modifier');
  if (lineSpaceElement !== null && lineSpaceElement !== undefined) {
    lineSpaceElement.setAttribute('value',lineHeightModifier.trim());
  }
}

function handleWordSpaceSliderUpdate(e) {
  document.documentElement.style.setProperty(`--wordSpaceModifier`, this.value);
  document.cookie = "wordSpaceModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function wordSpaceSliderSet() {
  let wordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');
  var wordSpaceElement = document.getElementById('word_space_modifier');
  if (wordSpaceElement !== null && wordSpaceElement !== undefined) {
    wordSpaceElement.setAttribute('value',wordSpaceModifier.trim());
  }
}

document.addEventListener("DOMContentLoaded", function() {

  var qh_usersettings_btn = document.getElementById('js__user-settings__toggle');
  //console.log('qh_usersettings_btn: ' + qh_usersettings_btn);
  if (qh_usersettings_btn !== null && qh_usersettings_btn !== undefined) {
    //console.log('qh_usersettings_btn is not null or undefined');
    qh_usersettings_btn.addEventListener('click', function(event) {
      // a11yClick function restricts keypress to spacebar or enter
      if (a11yClick(event) === true) {
        var expanded = qh_usersettings_btn.getAttribute('aria-expanded');
        if (expanded == 'true') {
          qh_usersettings_btn.setAttribute('aria-expanded', 'false');
          deactivatePageOverlay();
        } else {
          allMenuCloser();
          qh_usersettings_btn.setAttribute('aria-expanded', 'true');
          activatePageOverlay();
        }
      }
    });
  }


  // Light mode settings
  const lightModeToggle = document.getElementById('light_mode_switch');
  const lightModeReset = document.getElementById('light_mode_reset');
  const osLightMode = getComputedStyle(document.documentElement).getPropertyValue('--osLightMode').trim();
  const lightModeCookie = getCookie('lightMode');

  // If using automatic cookie, set body class so toggle works
  if(lightModeCookie == 'auto') {
    document.getElementsByTagName("html")[0].classList.add(osLightMode)
  }

  if (lightModeToggle !== null && lightModeToggle !== undefined) {
    lightModeToggle.addEventListener('click', function(e) {
      e.preventDefault();

      if (document.getElementsByTagName("html")[0].classList.contains('dark')) {
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

      // Remove any current body classes.
      document.getElementsByTagName("html")[0].classList.remove('dark');
      document.getElementsByTagName("html")[0].classList.remove('light');

      // Add in OS Default class.
      document.getElementsByTagName("html")[0].classList.add(osLightMode)

      e.blur();
    });
  }


  // Font size settings
  const fontSizeSlider = document.getElementById('font_size_modifier');
  var currentFontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');

  if (fontSizeSlider !== null && fontSizeSlider !== undefined) {
    fontSizeSlider.addEventListener('change', handleFontSizeSliderUpdate);
  }

  // Line-height settings
  const lineHeightSlider = document.getElementById('line_height_modifier');
  var currentlineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');

  if (lineHeightSlider !== null && lineHeightSlider !== undefined) {
    lineHeightSlider.addEventListener('change', handleLineHeightSliderUpdate);
  }

  // Word space settings
  const wordSpaceSlider = document.getElementById('word_space_modifier');
  var currentWordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');

  if (wordSpaceSlider !== null && wordSpaceSlider !== undefined) {
    wordSpaceSlider.addEventListener('change', handleWordSpaceSliderUpdate);
  }

});
