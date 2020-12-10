// document.addEventListener('DOMContentLoaded', function() {

//   var slider = tns({
//     container: '.qh__gallery__slider',
//     items: 1,
//     controlsContainer: ".qh__gallery__controls",
//     navContainer: ".qh__gallery__nav",
//     mouseDrag: true,
//     loop: true,
//   });
// });


var checkReadyState = setInterval(() => {
  if (document.readyState === "complete") {
    clearInterval(checkReadyState);

    var slider = tns({
      container: '.qh__gallery__slider',
      items: 1,
      controlsContainer: ".qh__gallery__controls",
      navContainer: ".qh__gallery__nav",
      mouseDrag: true,
      loop: true,
    });
  }
}, 100);
