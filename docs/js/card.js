'use strict';

(function() {
  window.card = {
    MAP: document.querySelector('.map'),
    FIELDSETS: document.querySelectorAll('fieldset'),
  };
  function buildCards() {
    var MAP_FILTERS_CONTAINER = document.querySelector(
      '.map__filters-container'
    );
    var MAP_CARD_TEMPLATE = document
      .querySelector('template')
      .content.querySelector('.map__card');

    function renderAvatars(i) {
      var MAP_CARD_TEMPLATE_AVATAR = mapCardFragment.querySelector('img');
      MAP_CARD_TEMPLATE_AVATAR.src = window.data.adverts[i].avatarPath;
      MAP_CARD_TEMPLATE_AVATAR.alt = window.data.adverts[i].title;
    }
    function renderCards(i) {
      var mapCardTitle = mapCardFragment.querySelector('.map-card__title');
      mapCardTitle.innerText = window.data.adverts[i].title;
    }
    function setPrice(i) {
      var mapCardPrice = mapCardFragment.querySelector('.popup__price');
      mapCardPrice.innerText = window.data.adverts[i].price + '\u0024/night';
    }
    function setAppartmentType(i) {
      var mapCardType = mapCardFragment.querySelector('.popup__type');
      mapCardType.innerText = window.data.adverts[i].type;
    }
    function setGuestsRooms(i) {
      mapCardFragment.querySelector(
        '.popup__text--capacity'
      ).innerText = `${window.data.adverts[i].rooms} room(s) for ${window.data.adverts[i].guests} guest(s)`;
    }
    function setCheckinCheckout(i) {
      mapCardFragment.querySelector(
        '.popup__text--time'
      ).innerText = `Checkin after ${window.data.adverts[i].checkin}, checkout before ${window.data.adverts[i].checkout}`;
    }
    function setFeatures(i) {
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
      mapCardPicturesImg.src = window.data.adverts[i].photos[0];
      for (let k = 1; k < window.data.adverts[i].photos.length; k++) {
        mapCardPicturesUl.appendChild(mapCardPicturesLi.cloneNode(true));
        mapCardPicturesImg.src = window.data.adverts[i].photos[k];
      }
    }
    for (let i = 0; i < window.data.adverts.length; i++) {
      var mapCardFragment = MAP_CARD_TEMPLATE.cloneNode(true);
      renderAvatars(i);
      renderCards(i);
      setPrice(i);
      setAppartmentType(i);
      setGuestsRooms(i);
      setCheckinCheckout(i);
      setFeatures(i);
      renderCardPictures(i);
      window.card.MAP.insertBefore(mapCardFragment, MAP_FILTERS_CONTAINER);
    }
  }

  buildCards();

  window.card.MAP_CARD = document.querySelectorAll('.map__card');

  function hideMapCards() {
    window.card.MAP_CARD.forEach((item) => item.classList.add('hidden'));
  }
  var POPUP_CLOSE = document.querySelectorAll('.popup__close');
  function onMapCardClose() {
    var currentItem;
    for (let i = 0; i < window.card.MAP_CARD.length; i++) {
      POPUP_CLOSE[i].addEventListener('click', function() {
        currentItem = window.card.MAP_CARD[i];
        window.card.MAP_CARD[i].classList.add('hidden');
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        window.card.MAP_CARD.forEach((item) => item.classList.add('hidden'));
      }
    });
  }

  hideMapCards();
  onMapCardClose();
})();
