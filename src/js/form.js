'use strict';

(function() {
  window.form = {
    FIELDSETS: document.querySelectorAll('fieldset'),
  };
  function disableForm() {
    window.form.FIELDSETS.forEach((item) => (item.disabled = true));
  }
  disableForm();

  function onFormSubmit() {
    function onError(error) {
      function createDivError() {
        var newDiv = document.createElement('div');
        newDiv.style.width = '300px';
        newDiv.style.height = '200px';
        newDiv.style.background = 'white';
        newDiv.style.position = 'fixed';
        newDiv.style.left = '50%';
        newDiv.style.top = '50%';
        newDiv.style.border = '30px solid lightblue';
        newDiv.style.display = 'flex';
        newDiv.style.alignItems = 'center';
        newDiv.style.justifyContent = 'center';
        newDiv.style.fontSize = '20px';
        newDiv.style.fontWeight = 'bold';
        newDiv.style.transform = 'translateY(-50%) translateX(-50%)';
        newDiv.style.zIndex = '3';
        newDiv.innerText = error;
        document.body.appendChild(newDiv);

        function deleteNewDiv() {
          setTimeout(function() {
            newDiv.remove();
          }, 2000);
        }
        deleteNewDiv();
      }
      createDivError();
    }
    var form = document.querySelector('.notice__form');
    form.addEventListener('submit', (e) => {
      window.backend.sendData(
        new FormData(form),
        function() {
          form.reset();
        },
        onError
      );
      e.preventDefault();
    });
  }
  onFormSubmit();
})();
