'use strict';

(function() {
  window.form = {
    FIELDSETS: document.querySelectorAll('fieldset'),
  };
  function disableForm() {
    window.form.FIELDSETS.forEach((item) => (item.disabled = true));
  }
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
        newDiv.style.textAlign = 'center';
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
    function onLoad() {
      form.reset();
    }
    var form = document.querySelector('.notice__form');
    form.addEventListener('submit', (e) => {
      window.backend.sendData(new FormData(form), onLoad, onError);
      e.preventDefault();
    });
  }
  function onUploadAvatar() {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector('#avatar');
    var preview = document.querySelector('.notice__preview img');

    fileChooser.addEventListener('change', () => {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some((type) => fileName.endsWith(type));
      if (matches) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => (preview.src = reader.result);
      }
    });
  }
  function onUploadPhotosAppartments() {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector('#images');
    var photoContainer = document.querySelector('.form__photo-container');

    fileChooser.addEventListener('change', () => {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some((type) => fileName.endsWith(type));
      if (matches) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          var newImg = document.createElement('img');
          newImg.src = reader.result;
          newImg.style.width = '100px';
          newImg.style.height = 'auto';
          newImg.style.marginRight = '20px';
          newImg.style.marginBottom = '30px';
          photoContainer.appendChild(newImg);
        };
      }
    });
  }
  onUploadAvatar();
  onUploadPhotosAppartments();
  disableForm();
  onFormSubmit();
})();
