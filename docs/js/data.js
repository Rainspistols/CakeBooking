'use strict';
(function() {
  window.data = {
    adverts: [],
  };
  var pinSize = 40,
    mapSize = 1200,
    database = [
      {
        author: {
          // we need i+1 to prevent user00.png
          avatar: function(i) {
            return './img/avatars/user0' + (i + 1) + '.png';
          },
        },
        offer: {
          title: [
            'Large comfortable apartment',
            'Small apartment',
            'Huge beautiful palace',
            'Small palace',
            'Beautiful guest house',
            'Little house',
            'Bungalo far from the sea',
            'Bungalo near the sea',
          ],
          price: function() {
            return getRandomIntInclusive(10, 1000);
          },
          type: function() {
            return getRandomArrItem([
              'Apartment',
              'Palace',
              'House',
              'Bungalo',
            ]);
          },
          rooms: function() {
            return getRandomIntInclusive(1, 5);
          },
          guests: function() {
            return getRandomIntInclusive(1, 10);
          },
          checkin: function() {
            return getRandomArrItem(['12:00', '13:00', '14:00']);
          },
          checkout: function() {
            return getRandomArrItem(['12:00', '13:00', '14:00']);
          },
          features: function() {
            return getRandomArrLength([
              'wifi',
              'dishwasher',
              'parking',
              'washer',
              'elevator',
              'conditioner',
            ]);
          },
          description: '',
          photos: function() {
            return shuffle([
              'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
              'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
              'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
            ]);
          },
          location: {
            x: function() {
              return getRandomIntInclusive(pinSize, mapSize - pinSize);
            },
            y: function() {
              return getRandomIntInclusive(130, 630);
            },
          },
        },
      },
    ];
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
  function User(name, i) {
    this.name = name;
    this.avatarPath = database[0].author.avatar(i);
    this.title = database[0].offer.title[i];
    this.price = database[0].offer.price();
    this.type = database[0].offer.type();
    this.rooms = database[0].offer.rooms();
    this.guests = database[0].offer.guests();
    this.checkin = database[0].offer.checkin();
    this.checkout = database[0].offer.checkout();
    this.features = database[0].offer.features();
    this.description = database[0].offer.description;
    this.photos = database[0].offer.photos();
    this.location = {};
    this.location.x = database[0].offer.location.x();
    this.location.y = database[0].offer.location.y();
    this.address = this.location.x + ' , ' + this.location.y;
  }
  function makeUsers() {
    for (let i = 0; i < 8; i++) {
      window.data.adverts.push(new User('user' + (i + 1), i));
    }
  }
  makeUsers();
})();
