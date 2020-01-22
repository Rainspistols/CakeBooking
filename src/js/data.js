'use strict';
(function() {
  // random value including min and max;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // random item in Array
  function getRandomArrItem(arr) {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  }
  // random arr length
  function getRandomArrLength(arr) {
    arr.splice(getRandomIntInclusive(1, arr.length));
    return arr;
  }
  // shuffle arr
  function shuffle(arr) {
    var j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
})();
