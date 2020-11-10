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
