'use strict';

(function() {
  function onLoadGet(data, cbpins, cbcards) {
    window.advertsData = data;
    console.log('Success 200', window.advertsData);
    cbpins();
    cbcards();
  };
  function onError(message) {
    console.error(message);
  };
  var statusListMap = {
    '400': 'Invalid request 400',
    '401': 'User not authorized 401',
    '404': 'Nothing found 404',
  };
  function createAndCheckRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      var error;
      if (xhr.status === 200) {
        onLoad(xhr.response, window.makePins, window.makeCards);
      } else {
        error =
          statusListMap[xhr.status] ||
          'Response Status: ' + xhr.status + ' ' + xhr.statusText;
        onError(error);
      }
    };
    return xhr;
  }
  window.backend = {

    getData(onLoad, onError) {
      var xhr = createAndCheckRequest(onLoad, onError)
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    },
    sendData(data, onLoad, onError) {
      var xhr = createAndCheckRequest(onLoad, onError);
      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    },
  };

  window.backend.getData(onLoadGet, onError);
})();
