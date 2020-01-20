'use strict';

(function() {
  function onLoadGet(data, cbpins, cbcards) {
    window.advertsData = data;
    console.log(window.advertsData);
    cbpins();
    cbcards();
  }
  window.backend = {
    onError(message) {
      console.error(message);
    },
    getData(onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = () => {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response, window.pin, window.makeCards);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;
          default:
            error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      };
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },
    sendData(data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = () => {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Invalid request ' + xhr.status;
            break;
          case 401:
            error = 'User not authorized ' + xhr.status;
            break;
          case 404:
            error = 'Nothing found ' + xhr.status;
            break;
          default:
            error = 'Response Status: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      };
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    },
  };

  window.backend.getData(onLoadGet, window.backend.onError);
})();
