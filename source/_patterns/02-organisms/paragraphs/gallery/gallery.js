document.addEventListener('DOMContentLoaded', function() {
  var sliders = document.querySelectorAll('.qh__gallery__slider');
  _forEach(sliders, function (index, value) {

    let pid = value.dataset.pid;
    let slider = tns({
      container: value,
      items: 1,
      controlsContainer: "#qh__gallery__controls-" + pid,
      navContainer: "#qh__gallery__nav-" + pid,
      mouseDrag: true,
      loop: true,
    });
  });
});
