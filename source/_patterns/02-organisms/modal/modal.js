document.addEventListener("DOMContentLoaded", function() {

  MicroModal.init();

  // Set cookie on close of modal
  const modal = document.querySelector('#close');
  modal.addEventListener('click', event => {
    document. cookie = 'modal_accept = yes;'
  });

  // checks if cookie is present funtion
  function getCookie(name) {
    var cookies = '; ' + document.cookie;
    var splitCookie = cookies.split('; ' + name + '=');
    if (splitCookie.length == 2) return splitCookie.pop();
  }

  // Checks for cookie, displays modal if not present
  if (getCookie('modal_accept'))
      console.log("true");
  else
      MicroModal.show('modal-1');
      console.log("false");

 });
