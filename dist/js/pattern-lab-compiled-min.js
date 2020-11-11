function a11yClick(e){if("click"===e.type)return!0;if("keypress"!==e.type)return!1;var t=e.charCode||e.keyCode;return 32===t||13===t||void 0}function allMenuCloser(){var e=document.getElementById("js-toggle-nav");null!==e&&e.setAttribute("aria-expanded","false");var t=document.getElementById("js__minor-menu");null!==t&&t.classList.remove("qh__nav-minor--expanded");var n=document.getElementById("settings_trigger");null!==n&&n.parentElement.classList.remove("open")}function addPageOverlay(){const e=document.createElement("div");let t=document.createTextNode(" ");e.appendChild(t),e.id="page_overlay",e.classList.add("page-overlay"),document.getElementsByTagName("body")[0].appendChild(e),e&&(document.getElementsByTagName("html")[0].classList.add("touch-nav"),e.addEventListener("click",function(e){e.preventDefault(),allMenuCloser(),deactivatePageOverlay()}))}function deactivatePageOverlay(){document.getElementById("page_overlay").classList.remove("active")}function activatePageOverlay(){document.getElementById("page_overlay").classList.add("active")}function getCookie(e){var t=("; "+document.cookie).split("; "+e+"=");if(2==t.length)return t.pop().split(";").shift()}document.addEventListener("DOMContentLoaded",function(){document.documentElement.classList.remove("no-js"),document.documentElement.classList.add("js"),addPageOverlay()}),document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".js__expand-collapse").forEach(e=>{e.addEventListener("click",function(t){if(!0===a11yClick(t)){var n=e.getAttribute("aria-expanded"),i=e.getAttribute("aria-controls"),a=document.getElementById(i);"true"==n?(e.setAttribute("aria-expanded","false"),a.classList.remove("js__aria-expanded")):(e.setAttribute("aria-expanded","true"),a.classList.add("js__aria-expanded"))}})})}),window.onload=function(){fontSizeSliderSet(),lineHeightSliderSet(),wordSpaceSliderSet()};const settingsMenuToggle=document.getElementById("settings_trigger"),settingsMenuTriggers=[].slice.call(document.querySelectorAll(".settings-menu-trigger"));null!=settingsMenuTriggers&&settingsMenuTriggers.forEach(e=>e.addEventListener("click",function(t){t.preventDefault(),e.parentElement.classList.contains("open")?(e.parentElement.classList.remove("open"),deactivatePageOverlay()):(allMenuCloser(),e.parentElement.classList.add("open"),activatePageOverlay())}));const lightModeToggle=document.getElementById("light_mode_switch"),lightModeReset=document.getElementById("light_mode_reset");var osLightMode=getComputedStyle(document.documentElement).getPropertyValue("--osLightMode").trim();null!=lightModeToggle&&lightModeToggle.addEventListener("click",function(e){e.preventDefault(),"dark"==osLightMode?(console.log("check: "+osLightMode),document.cookie="lightMode=light; max-age=31536000; path=/; samesite=strict",document.getElementsByTagName("html")[0].classList.remove("dark"),document.getElementsByTagName("html")[0].classList.add("light")):document.getElementsByTagName("html")[0].classList.contains("dark")?(document.cookie="lightMode=light; max-age=31536000; path=/; samesite=strict",document.getElementsByTagName("html")[0].classList.remove("dark"),document.getElementsByTagName("html")[0].classList.add("light")):(document.cookie="lightMode=dark; max-age=31536000; path=/; samesite=strict",document.getElementsByTagName("html")[0].classList.remove("light"),document.getElementsByTagName("html")[0].classList.add("dark")),e.blur()}),null!=lightModeReset&&lightModeReset.addEventListener("click",function(e){e.preventDefault(),document.cookie="lightMode=auto; max-age=31536000; path=/; samesite=strict",document.getElementsByTagName("html")[0].classList.remove("dark"),document.getElementsByTagName("html")[0].classList.remove("light"),e.blur()});const fontSizeSlider=document.getElementById("font_size_modifier");var currentFontSizeModifier=getComputedStyle(document.documentElement).getPropertyValue("--fontSizeModifier");function handleFontSizeSliderUpdate(e){document.documentElement.style.setProperty("--fontSizeModifier",this.value),document.cookie="fontSizeModifier="+this.value+"; max-age=31536000; path=/; samesite=strict"}function fontSizeSliderSet(){let e=getComputedStyle(document.documentElement).getPropertyValue("--fontSizeModifier");document.getElementById("font_size_modifier").setAttribute("value",e.trim())}null!=fontSizeSlider&&fontSizeSlider.addEventListener("change",handleFontSizeSliderUpdate);const lineHeightSlider=document.getElementById("line_height_modifier");var currentlineHeightModifier=getComputedStyle(document.documentElement).getPropertyValue("--lineHeightModifier");function handleLineHeightSliderUpdate(e){document.documentElement.style.setProperty("--lineHeightModifier",this.value),document.cookie="lineHeightModifier="+this.value+"; max-age=31536000; path=/; samesite=strict"}function lineHeightSliderSet(){let e=getComputedStyle(document.documentElement).getPropertyValue("--lineHeightModifier");document.getElementById("line_height_modifier").setAttribute("value",e.trim())}null!=lineHeightSlider&&lineHeightSlider.addEventListener("change",handleLineHeightSliderUpdate);const wordSpaceSlider=document.getElementById("word_space_modifier");var currentWordSpaceModifier=getComputedStyle(document.documentElement).getPropertyValue("--wordSpaceModifier");function handleWordSpaceSliderUpdate(e){document.documentElement.style.setProperty("--wordSpaceModifier",this.value),document.cookie="wordSpaceModifier="+this.value+"; max-age=31536000; path=/; samesite=strict"}function wordSpaceSliderSet(){let e=getComputedStyle(document.documentElement).getPropertyValue("--wordSpaceModifier");document.getElementById("word_space_modifier").setAttribute("value",e.trim())}function getQhNavState(){var e=document.getElementsByTagName("body")[0];return getComputedStyle(e).getPropertyValue("--nav-state")}function moveSearchIntoNav(e){var t=document.getElementById("js__site-search"),n=document.getElementById("js__search-social"),i=document.getElementById("js__primary-menu");if(null!=t)if("toNav"===e){if(null!=i){var a=document.createElement("li");a.classList.add("qh__nav-main__item__search"),a.appendChild(t),i.insertBefore(a,i.firstChild)}}else if(null!==n&&void 0!==i){n.appendChild(t);var o=document.getElementsByClassName("qh__nav-main__item__search");null!==o[0]&&void 0!==o[0]&&o[0].parentNode.removeChild(o[0])}}function moveSocialIntoNav(e){var t=document.getElementById("js__social-links"),n=document.getElementById("js__search-social"),i=document.getElementById("js__primary-menu");if(null!=t)if("toNav"===e){if(null!=i){var a=document.createElement("li");a.classList.add("qh__nav-main__item__social"),a.appendChild(t),i.insertBefore(a,i.lastChild.nextSibling)}}else if(null!=n){n.appendChild(t);var o=document.getElementsByClassName("qh__nav-main__item__social");null!==o[0]&&void 0!==o[0]&&o[0].parentNode.removeChild(o[0])}}function moveSearchAndSocial(){var e=getQhNavState();e.trim()!==qh_viewport.trim()&&("js-mobile"===e.trim()?(moveSearchIntoNav("toNav"),moveSocialIntoNav("toNav")):(moveSocialIntoNav("fromNav"),moveSearchIntoNav("fromNav")),window.qh_viewport=e)}null!=wordSpaceSlider&&wordSpaceSlider.addEventListener("change",handleWordSpaceSliderUpdate),document.addEventListener("DOMContentLoaded",function(){window.qh_viewport="",moveSearchAndSocial();var e=!1;window.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(moveSearchAndSocial,250)}),window.addEventListener("orientationchange",moveSearchAndSocial);var t=document.getElementById("js__toggle-nav");null!=t&&t.addEventListener("click",function(e){!0===a11yClick(e)&&("true"==t.getAttribute("aria-expanded")?(t.setAttribute("aria-expanded","false"),deactivatePageOverlay()):(t.setAttribute("aria-expanded","true"),allMenuCloser(),activatePageOverlay()))});var n=document.querySelectorAll(".js__qh-dd-toggle");null!=n&&(console.log("qh_dd_btns is not null or undefined"),n.forEach(function(e){e.setAttribute("href","#"),e.addEventListener("click",function(t){if(!0===a11yClick(t)){var i=e.getAttribute("aria-expanded");n.forEach(function(e){e.setAttribute("aria-expanded","false")}),"false"==i&&e.setAttribute("aria-expanded","true")}})}))}),document.addEventListener("DOMContentLoaded",function(){"hidden"===getCookie("siteNotifications")&&(console.log("hidden"),document.getElementById("summary-notifications").setAttribute("aria-expanded","false"),document.getElementById("details-notifications").classList.remove("js__aria-expanded"));const e=document.getElementById("summary-notifications");e.addEventListener("click",function(t){if(!0===a11yClick(t)){var n=e.getAttribute("aria-expanded");console.log("clicked"),document.cookie="true"==n?"siteNotifications=display; max-age=31536000; path=/; samesite=strict":"siteNotifications=hidden; max-age=31536000; path=/; samesite=strict"}})}),document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("js__minor-toggle"),t=document.getElementById("js__minor-menu");null!=e&&e.addEventListener("click",function(e){!0===a11yClick(e)&&(t.classList.contains("qh__nav-minor--expanded")?(t.classList.remove("qh__nav-minor--expanded"),deactivatePageOverlay()):(allMenuCloser(),activatePageOverlay(),t.classList.add("qh__nav-minor--expanded")))})});