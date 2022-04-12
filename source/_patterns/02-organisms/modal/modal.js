document.addEventListener("DOMContentLoaded", function() {
  // checks if cookie is present function
  function getCookie(name) {
    var cookies = '; ' + document.cookie;
    var splitCookie = cookies.split('; ' + name + '=');
    if (splitCookie.length == 2) return splitCookie.pop();
  }

  // Get Modal wrapper.
  var element = document.querySelector('.qh__modal');

  if(!element) {
    return;
  }

  // Assemble modal name var to be used in if/else.
  var modalName = 'modal_accept' + element.getAttribute('data-nid') ;

  // Checks for cookie, displays modal if not present.
  if (!getCookie(modalName)) {
    MicroModal.show('modal-1');

    // Set cookie on close of modal.
    const modal = document.querySelector('#close');
    modal.addEventListener('click', event => {
      document.cookie = (modalName) + ' = yes;'
    });
  }
});
