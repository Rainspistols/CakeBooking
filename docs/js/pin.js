'use strict';

function pin() {
  var MAP_PIN_TEMPLATE = document
    .querySelector('template')
    .content.querySelector('.map__pin');
  var MAP_PINS_BLOCK = document.querySelector('.map__pins');

  function renderPins() {
    for (let i = 0; i < window.advertsData.length; i++) {
      var mapPinFragment = MAP_PIN_TEMPLATE.cloneNode(true);

      mapPinFragment.style = `left: ${window.advertsData[i].location.x}px; top: ${window.advertsData[i].location.y}px;`;
      mapPinFragment.querySelector('img').src =
        window.advertsData[i].author.avatar;
      mapPinFragment.querySelector('img').alt = window.advertsData[i].offer.title;
      MAP_PINS_BLOCK.appendChild(mapPinFragment);
    }
  }
  renderPins();

  var MAP_PIN = Array.from(document.querySelectorAll('.map__pin'));
  MAP_PIN.shift();
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var INPUT_ADDRESS = document.querySelector('#address');
  var FORM = document.querySelector('.notice__form');

  function hideAvatars() {
    MAP_PIN.forEach((item) => item.classList.add('hidden'));
  }
  function showAvatars() {
    MAP_PIN.forEach((item) => item.classList.remove('hidden'));
  }
  function onMainMapPin() {
    MAP_PIN_MAIN.addEventListener('mousedown', function(e) {
      e.preventDefault();
      window.card.MAP.classList.remove('map--faded');
      window.form.FIELDSETS.forEach((item) => (item.disabled = false));
      FORM.classList.remove('notice__form--disabled');
      showAvatars();
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
        MAP_PIN_MAIN.style.top = MAP_PIN_MAIN.offsetTop - shift.y + 'px';
        MAP_PIN_MAIN.style.left = MAP_PIN_MAIN.offsetLeft - shift.x + 'px';
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
    MAP_PIN_MAIN.addEventListener('mouseup', getCoordinates);
  }
  function onMapPin() {
    let lastItem = false;
    for (let i = 0; i < MAP_PIN.length; i++) {
      MAP_PIN[i].addEventListener('click', function() {
        if (lastItem) {
          lastItem.classList.add('hidden');
        }
        lastItem = window.card.MAP_CARD[i];
        window.card.MAP_CARD[i].classList.remove('hidden');
      });
      MAP_PIN[i].addEventListener('click', getCoordinates);
    }
  }
  function getCoordinates() {
    var elem = this.getBoundingClientRect();
    var bigMark = 22;
    var smallMark = 18;
    INPUT_ADDRESS.value =
      this == MAP_PIN_MAIN
        ? `${this.offsetTop + elem.height + bigMark} , ${this.offsetLeft +
            elem.height / 2}`
        : `${this.offsetTop + elem.height + smallMark} , ${this.offsetLeft +
            elem.height / 2}`;
  }

  hideAvatars();
  onMainMapPin();
  onMapPin();
}
