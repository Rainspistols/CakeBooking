'use strict';

var MAP = document.querySelector('.map'),
  FIELDSETS = document.querySelectorAll('fieldset'),
  MAP_PINS_BLOCK = document.querySelector('.map__pins'),
  MAP_FILTERS_CONTAINER = MAP.querySelector('.map__filters-container');
var pinSize = 40;
var mapSize = 1200;
var adverts = [];
var database = [
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
        return getRandomArrItem(['Apartment', 'Palace', 'House', 'Bungalo']);
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

function disableForm() {
  FIELDSETS.forEach((item) => (item.disabled = true));
}
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
  for (var i = arr.length - 1; i > 0; i--) {
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
    adverts.push(new User('user' + (i + 1), i));
  }
}

function renderTemplates() {
  var MAP_PIN_TEMPLATE = document
      .querySelector('template')
      .content.querySelector('.map__pin');
  var  MAP_CARD_TEMPLATE = document
      .querySelector('template')
      .content.querySelector('.map__card'),
    MAP_CARD_TEMPLATE_AVATAR = MAP_CARD_TEMPLATE.querySelector('img');
  function renderCards(i) {
    var mapCardTitle = mapCardFragment.querySelector('.map-card__title');
    mapCardTitle.innerText = adverts[i].title;
  }
  function renderAvatars(i) {
    var mapPinFragment = MAP_PIN_TEMPLATE.cloneNode(true);

    mapPinFragment.style = `left: ${adverts[i].location.x}px; top: ${adverts[i].location.y}px;`;
    mapPinFragment.querySelector('img').src = MAP_CARD_TEMPLATE_AVATAR.src =
      adverts[i].avatarPath;
    mapPinFragment.querySelector('img').alt = MAP_CARD_TEMPLATE_AVATAR.alt =
      adverts[i].title;
    MAP_PINS_BLOCK.appendChild(mapPinFragment);
  }
  function setPrice(i) {
    var mapCardPrice = mapCardFragment.querySelector('.popup__price');
    mapCardPrice.innerText = adverts[i].price + '\u0024/night';
  }
  function setAppartmentType(i) {
    var mapCardType = mapCardFragment.querySelector('.popup__type');
    mapCardType.innerText = adverts[i].type;
  }
  function setGuestsRooms(i) {
    mapCardFragment.querySelector(
      '.popup__text--capacity'
    ).innerText = `${adverts[i].rooms} room(s) for ${adverts[i].guests} guest(s)`;
  }
  function setCheckinCheckout(i) {
    mapCardFragment.querySelector(
      '.popup__text--time'
    ).innerText = `Checkin after ${adverts[i].checkin}, checkout before ${adverts[i].checkout}`;
  }
  function setFeatures() {
    var mapCardFeatures = mapCardFragment.querySelector('.popup__features'),
      li = mapCardFeatures.querySelectorAll('li');
    // ^^delete random amount of ellements
    for (var j = 0; j < li.length; j++) {
      var randomBooleen = Math.random() >= 0.5;
      if (randomBooleen) {
        mapCardFeatures.removeChild(li[j]);
      }
    }
  }
  function renderCardPictures(i) {
    var mapCardPicturesUl = mapCardFragment.querySelector('.popup__pictures'),
      mapCardPicturesLi = mapCardPicturesUl.querySelector('li'),
      mapCardPicturesImg = mapCardPicturesLi.querySelector('img');
    // ^^clone right quantity of empty elements, and give them src
    mapCardPicturesImg.src = adverts[i].photos[0];
    for (let k = 1; k < adverts[i].photos.length; k++) {
      mapCardPicturesUl.appendChild(mapCardPicturesLi.cloneNode(true));
      mapCardPicturesImg.src = adverts[i].photos[k];
    }
  }

  for (var i = 0; i < adverts.length; i++) {
    renderAvatars(i);
    var mapCardFragment = MAP_CARD_TEMPLATE.cloneNode(true);
    renderCards(i);
    setPrice(i);
    setAppartmentType(i);
    setGuestsRooms(i);
    setCheckinCheckout(i);
    setFeatures();
    renderCardPictures(i);
    MAP.insertBefore(mapCardFragment, MAP_FILTERS_CONTAINER);
  }
}

makeUsers();
renderTemplates();

var MAP_CARD = document.querySelectorAll('.map__card');
var MAP_PIN = Array.from(document.querySelectorAll('.map__pin'));
MAP_PIN.shift();
var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
var FORM = document.querySelector('.notice__form');
var INPUT_ADDRESS = document.querySelector('#address');
var POPUP_CLOSE = document.querySelectorAll('.popup__close');

function hideMapCards() {
  MAP_CARD.forEach((item) => item.classList.add('hidden'));
}

function hideAvatars() {
  MAP_PIN.forEach((item) => item.classList.add('hidden'));
}

function showAvatars() {
  MAP_PIN.forEach((item) => item.classList.remove('hidden'));
}

function onMainMapPin() {
  MAP_PIN_MAIN.addEventListener('click', function() {
    MAP.classList.remove('map--faded');
    FIELDSETS.forEach((item) => (item.disabled = false));
    FORM.classList.remove('notice__form--disabled');
    showAvatars();
  });
  // ANDREW how to use add getCoordinates() in previous event listener?
  MAP_PIN_MAIN.addEventListener('mouseup', getCoordinates);
}

function getCoordinates() {
  var elem = this.getBoundingClientRect();
  var bigMark = 22;
  var smallMark = 18;
  INPUT_ADDRESS.value =
    this == MAP_PIN_MAIN
      ? `${elem.x + elem.width / 2} , ${elem.y +
          pageYOffset +
          elem.height +
          bigMark}`
      : `${elem.x + elem.width / 2} , ${elem.y +
          pageYOffset +
          elem.height +
          smallMark}`;
}

function onMapPin() {
  let lastItem = false;
  for (let i = 0; i < MAP_PIN.length; i++) {
    MAP_PIN[i].addEventListener('click', function() {
      if (lastItem) {
        lastItem.classList.add('hidden');
      }
      lastItem = MAP_CARD[i];
      MAP_CARD[i].classList.remove('hidden');


    });
    MAP_PIN[i].addEventListener('click', getCoordinates);
  }
}

function onMapCardClose() {
  var currentItem;
  for (let i = 0; i < MAP_CARD.length; i++) {
    POPUP_CLOSE[i].addEventListener('click', function() {
      currentItem = MAP_CARD[i];
      MAP_CARD[i].classList.add('hidden');
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      MAP_CARD.forEach((item) => item.classList.add('hidden'));
    }
  });
}

onMainMapPin();
onMapPin();
onMapCardClose();
hideMapCards();
disableForm();
hideAvatars();
