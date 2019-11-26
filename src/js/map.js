'use strict';

var example = [
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
        'Small uncomfortable apartment',
        'Huge beautiful palace',
        'Small terrible palace',
        'Beautiful guest house',
        'Ugly ugly little house',
        'Cozy bungalo far from the sea',
        'Uncomfortable bungalo by but in the water ',
      ],
      address: function() {
        return (
          'left:' +
          getRandomIntInclusive(0 + 40, 1200 - 40) +
          'px; top:' +
          getRandomIntInclusive(130, 630) +
          'px;'
        );
      },
      price: function() {
        return getRandomIntInclusive(1000, 1000000) + '\u0024/night';
      },
      type: [
        'Apartment',
        'Palace',
        'House',
        'Bungalo',
        'Apartment',
        'Palace',
        'House',
        'Bungalo',
      ],
      rooms: function() {
        return getRandomIntInclusive(1, 5) + ' room(s) for ';
      },
      guests: function() {
        return getRandomIntInclusive(1, 10) + ' guest(s)';
      },
      checkin:
        'Check-in after ' + getRandomArrItem(['12:00', '13:00', '14:00']),
      checkout:
        'Check-out until ' + getRandomArrItem(['12:00', '13:00', '14:00']),
      features: [
        'feature-wifi',
        'feature-dishwasher',
        'feature-parking',
        'feature-washer',
        'feature-elevator',
        'feature-conditioner',
      ],
      description: '',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
      ],
      location: 'location.x,location.y',
    },
  },
];

// calculate random value including min and max;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrItem(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var MAP_CLASS = document.querySelector('.map');
MAP_CLASS.classList.remove('map--faded');

var MAP_PIN_TEMPLATE = document
  .querySelector('template')
  .content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');

var MAP_CARD_TEMPLATE = document
  .querySelector('template')
  .content.querySelector('.map__card');
var MAP_FILTERS_CONTAINER = MAP_CLASS.querySelector('.map__filters-container');

for (var i = 0; i < 8; i++) {
  var mapPinFragment = MAP_PIN_TEMPLATE.cloneNode(true);

  mapPinFragment.style = example[0].offer.address();
  mapPinFragment.querySelector('img').src = example[0].author.avatar(i);
  mapPinFragment.querySelector('img').alt = example[0].offer.title[i];

  MAP_PINS.appendChild(mapPinFragment);

  var mapCardFragment = MAP_CARD_TEMPLATE.cloneNode(true);

  var photoTitle = mapCardFragment.querySelector('h3');
  photoTitle.classList.add('photo__title');
  photoTitle.innerText = example[0].offer.title[i];
  var popupPrice = mapCardFragment.querySelector('.popup__price');
  popupPrice.classList.add('popup__text--price');
  popupPrice.innerText = example[0].offer.price();
  // Don't know why i need it
  // mapCardFragment.querySelector('small').classList.add('popup__text--adrress');
  // mapCardFragment.querySelector('small').innerText = example[0].offer.address();
  var popupType = mapCardFragment.querySelector('h4');
  popupType.classList.add('poput__type');
  popupType.innerText = example[0].offer.type[i];
  mapCardFragment.querySelector('.popup__text--capacity').innerText =
    example[0].offer.rooms() + example[0].offer.guests();
  mapCardFragment.querySelector('.popup__text--time').innerText =
    example[0].offer.checkin + ',' + example[0].offer.checkout;
  var popupFeatures = mapCardFragment.querySelector('.popup__features');
  var li = popupFeatures.querySelectorAll('li');
  // delete random amount of ellements
  for (var j = 0; j < getRandomIntInclusive(0, 6); j++) {
    popupFeatures.removeChild(li[j]);
  }
  mapCardFragment.querySelector('.popup__description').innerText =
    example[0].offer.description;
  var popupPictures = mapCardFragment.querySelector('.popup__pictures');
  var popupPicturesLi = popupPictures.querySelector('li');
  var popupPicturesImg = popupPicturesLi.querySelector('img');
  popupPicturesImg.width = '210';
  popupPicturesImg.height = '210';
  popupPictures.appendChild(popupPicturesLi.cloneNode(true));
  popupPictures.appendChild(popupPicturesLi.cloneNode(true));
  var popupPicturesLiAll = popupPictures.querySelectorAll('li');
  var popupPicturesImgAll = popupPictures.querySelectorAll('img');
  popupPicturesImgAll[2].style = 'display:none';
  popupPicturesImgAll[1].style = 'display:none';
  for (var j = 0; j < 3; j++) {
    popupPicturesImgAll[j].src = example[0].offer.photos[j];
  }

  MAP_CLASS.insertBefore(mapCardFragment, MAP_FILTERS_CONTAINER);
}
