'use strict';

(function() {
  window.card = {
    MAP: document.querySelector('.map'),
    ESC_KEYCODE: 27,
    filtersContainer: document.querySelector('.map__filters-container'),
    build(i) {
      var Map = {
        Card: {
          template: document
            .querySelector('template')
            .content.querySelector('.map__card'),
        },
      };
      var Render = {
        avatars(i) {
          var cardAvatar = mapCardFragment.querySelector('img');
          cardAvatar.src = window.advertsData[i].author.avatar;
          cardAvatar.alt = window.advertsData[i].offer.title;
        },
        cards(i) {
          var cardTitle = mapCardFragment.querySelector('.map-card__title');
          cardTitle.innerText = window.advertsData[i].offer.title;
        },
        address(i) {
          var cardAddress = mapCardFragment.querySelector('.map-card__address');
          cardAddress.innerText = window.advertsData[i].offer.address;
        },
        price(i) {
          var cardPrice = mapCardFragment.querySelector('.popup__price');
          cardPrice.innerText =
            window.advertsData[i].offer.price + '\u20BD/night';
        },
        appartmentType(i) {
          var cardType = mapCardFragment.querySelector('.popup__type');
          cardType.innerText = window.advertsData[i].offer.type;
        },
        guestsRooms(i) {
          mapCardFragment.querySelector(
            '.popup__text--capacity'
          ).innerText = `${window.advertsData[i].offer.rooms} room(s) for ${window.advertsData[i].offer.guests} guest(s)`;
        },
        checkinCheckout(i) {
          mapCardFragment.querySelector(
            '.popup__text--time'
          ).innerText = `Checkin after ${window.advertsData[i].offer.checkin}, checkout before ${window.advertsData[i].offer.checkout}`;
        },
        features(i) {
          var cardFeatures = mapCardFragment.querySelector('.popup__features');
          for (let feature of window.advertsData[i].offer.features) {
            let li = document.createElement('li');
            li.className = `feature feature--${feature}`;
            cardFeatures.appendChild(li);
          }
        },
        appartmentPhotos(i) {
          var cardPhotosUl = mapCardFragment.querySelector('.popup__pictures'),
            cardPhotoLi = cardPhotosUl.querySelector('li'),
            cardPhotoImg = cardPhotoLi.querySelector('img');
          // ^^clone right quantity of empty elements, and give them src
          cardPhotoImg.src = window.advertsData[i].offer.photos[0];
          for (let photo of window.advertsData[i].offer.photos) {
            cardPhotosUl.appendChild(cardPhotoLi.cloneNode(true));
            cardPhotoImg.src = photo;
          }
        },
        desctiption(i) {
          var cardDescription = mapCardFragment.querySelector(
            '.popup__description'
          );
          cardDescription.innerText = window.advertsData[i].offer.description;
        },
      };
      var mapCardFragment = Map.Card.template.cloneNode(true);
      Render.avatars(i);
      Render.cards(i);
      Render.address(i);
      Render.price(i);
      Render.appartmentType(i);
      Render.guestsRooms(i);
      Render.checkinCheckout(i);
      Render.features(i);
      Render.appartmentPhotos(i);
      Render.desctiption(i);
      window.card.MAP.insertBefore(
        mapCardFragment,
        window.card.filtersContainer
      );
      onMapCardClose();
    },
    delete() {
      var wizardCard = window.card.MAP.querySelector('.map__card');
      if (wizardCard) {
        wizardCard.remove();
      }
    },
  };

  function onMapCardClose() {
    var POPUP_CLOSE = document.querySelector('.popup__close');
    POPUP_CLOSE.addEventListener('click', function() {
      window.card.delete();
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === window.card.ESC_KEYCODE) {
        window.card.delete();
      }
    });
  }
})();
