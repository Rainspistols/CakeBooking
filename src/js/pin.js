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
  function renderPins() {
    for (let i = 0; i < window.advertsData.length; i++) {
      var pinFragment = Map.Pin.template.cloneNode(true);

      pinFragment.style = `left: ${window.advertsData[i].location.x}px; top: ${window.advertsData[i].location.y}px;`;
      pinFragment.querySelector('img').src =
        window.advertsData[i].author.avatar;
      pinFragment.querySelector('img').alt = window.advertsData[i].offer.title;
      Map.pinsBlock.appendChild(pinFragment);
    }
  }
  renderPins();

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
    let lastItem = false;
    for (let i = 0; i < Map.pin.length; i++) {
      Map.pin[i].addEventListener('click', function() {
        if (lastItem) {
          lastItem.classList.add('hidden');
        }
        lastItem = window.card.MAP_CARD[i];
        window.card.MAP_CARD[i].classList.remove('hidden');
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
