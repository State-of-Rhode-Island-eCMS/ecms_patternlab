document.addEventListener("DOMContentLoaded", function() {

  //MicroModal.init();

  // checks if cookie is present function
  function getCookie(name) {
    var cookies = '; ' + document.cookie;
    var splitCookie = cookies.split('; ' + name + '=');
    if (splitCookie.length == 2) return splitCookie.pop();
  }

  // Checks for cookie, displays modal if not present
  if (getCookie('modal_accept'))
      // just breeze on by
      ;
  else
      MicroModal.show('modal-1');

      // Set cookie on close of modal
      const modal = document.querySelector('#close');
      modal.addEventListener('click', event => {
        document. cookie = 'modal_accept = yes;'
      });

 });
