'use strict';

function makePins() {
  var Map = {
    pinsBlock: document.querySelector('.map__pins'),
    Pin: {
      template: document
        .querySelector('template')
        .content.querySelector('.map__pin'),
    },
  };
  window.renderPins = function(data) {
    for (let i = 0; i < data.length; i++) {
      var pinFragment = Map.Pin.template.cloneNode(true);

      pinFragment.style = `left: ${data[i].location.x}px; top: ${data[i].location.y}px;`;
      pinFragment.dataset.type = data[i].offer.type;
      if (data[i].offer.price < 10000) {
        pinFragment.dataset.price = 'low';
      } else if (data[i].offer.price > 50000) {
        pinFragment.dataset.price = 'high';
      } else pinFragment.dataset.price = 'middle';
      pinFragment.dataset.rooms = data[i].offer.rooms;
      pinFragment.dataset.guests = data[i].offer.guests;
      pinFragment.dataset.features = data[i].offer.features;
      pinFragment.querySelector('img').src = data[i].author.avatar;
      pinFragment.querySelector('img').alt = data[i].offer.title;
      Map.pinsBlock.appendChild(pinFragment);
    }
  };
  window.renderPins(window.advertsData);

  Map.pin = Array.from(document.querySelectorAll('.map__pin'));
  Map.pin.shift();
  Map.pin.main = document.querySelector('.map__pin--main');
  var INPUT_ADDRESS = document.querySelector('#address');
  var FORM = document.querySelector('.notice__form');
  let Avatars = {
    hide() {
      Map.pin.forEach((item) => item.classList.add('hidden'));
    },
    show() {
      Map.pin.forEach((item) => item.classList.remove('hidden'));
    },
  };

  function onMainMapPin() {
    Map.pin.main.addEventListener('mousedown', function(e) {
      e.preventDefault();
      window.card.MAP.classList.remove('map--faded');
      window.form.FIELDSETS.forEach((item) => (item.disabled = false));
      FORM.classList.remove('notice__form--disabled');
      Avatars.show();
      var startCoords = {
        x: e.clientX,
        y: e.clientY,
      };
      function onMouseMove(e) {
        e.preventDefault();
        var shift = {
          x: startCoords.x - e.clientX,
          y: startCoords.y - e.clientY,
        };
        startCoords = {
          x: e.clientX,
          y: e.clientY,
        };
        Map.pin.main.style.top = Map.pin.main.offsetTop - shift.y + 'px';
        Map.pin.main.style.left = Map.pin.main.offsetLeft - shift.x + 'px';
      }
      function onMouseUp(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousemove', onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // ANDREW how to use add getCoordinates() in previous event listener?
    Map.pin.main.addEventListener('mouseup', getCoordinates);
  }
  function onMapPin() {
    for (let i = 0; i < Map.pin.length; i++) {
      Map.pin[i].addEventListener('click', function() {
        window.card.delete();
        window.card.build(i);
      });
      Map.pin[i].addEventListener('click', getCoordinates);
    }
  }
  function getCoordinates() {
    var elem = this.getBoundingClientRect();
    var bigMark = 22;
    var smallMark = 18;
    INPUT_ADDRESS.value =
      this == Map.pin.main
        ? `${this.offsetTop + elem.height + bigMark} , ${this.offsetLeft +
            elem.height / 2}`
        : `${this.offsetTop + elem.height + smallMark} , ${this.offsetLeft +
            elem.height / 2}`;
  }

  Avatars.hide();
  onMainMapPin();
  onMapPin();
}
