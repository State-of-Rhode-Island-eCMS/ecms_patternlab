document.addEventListener("DOMContentLoaded", function() {

  //MicroModal.init();

  // checks if cookie is present function
  function getCookie(name) {
    var cookies = '; ' + document.cookie;
    var splitCookie = cookies.split('; ' + name + '=');
    if (splitCookie.length == 2) return splitCookie.pop();
  }

  // Get Modal wrapper data attribute
  var element = document.querySelector('.qh__modal');
  var dataAttribute = element.getAttribute('data-nid');
  //console.log(dataAttribute);

  // Assemble modal name var to be used in if/esle
  var modalName = 'modal_accept' + element.getAttribute('data-nid') ;


  // Checks for cookie, displays modal if not present
  if (getCookie(modalName))
      // just breeze on by
      ;
  else
      MicroModal.show('modal-1');

      // Set cookie on close of modal
      const modal = document.querySelector('#close');
      modal.addEventListener('click', event => {
        document.cookie = (modalName) + ' = yes;'

      });

 });
