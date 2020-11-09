
const settingsMenuToggle = document.getElementById('settings_trigger');

const settingsMenuTriggers = [].slice.call(document.querySelectorAll('.settings-menu-trigger'));
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