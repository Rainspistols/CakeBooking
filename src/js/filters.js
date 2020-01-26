'use strict';

(function() {
  var filtersContainer = document.querySelector('.map__filters-container');
  var housingFeatures = document.querySelector('#housing-features');

  var Filter = {
    form: filtersContainer.querySelector('.map__filters'),
    type: filtersContainer.querySelector('#housing-type'),
    price: filtersContainer.querySelector('#housing-price'),
    rooms: filtersContainer.querySelector('#housing-rooms'),
    guests: filtersContainer.querySelector('#housing-guests'),
    wifi: housingFeatures.querySelector('#filter-wifi'),
    dishwasher: housingFeatures.querySelector('#filter-dishwasher'),
    parking: housingFeatures.querySelector('#filter-parking'),
    washer: housingFeatures.querySelector('#filter-washer'),
    elevator: housingFeatures.querySelector('#filter-elevator'),
    conditioner: housingFeatures.querySelector('#filter-conditioner'),
  };
  window.filter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: 'any',
    dishwasher: 'any',
    parking: 'any',
    washer: 'any',
    elevator: 'any',
    conditioner: 'any',
  };

  let OnFilter = {
    type() {
      Filter.type.addEventListener('change', () => {
        saveFilter('type');
        filterPins();
      });
    },
    price() {
      Filter.price.addEventListener('change', () => {
        saveFilter('price');
        filterPins();
      });
    },
    rooms() {
      Filter.rooms.addEventListener('change', () => {
        saveFilter('rooms');
        filterPins();
      });
    },
    guests() {
      Filter.guests.addEventListener('change', () => {
        saveFilter('guests');
        filterPins();
      });
    },
    wifi() {
      Filter.wifi.addEventListener('change', () => {
        saveFilter('wifi');
        filterPins();
      });
    },
    dishwasher() {
      Filter.dishwasher.addEventListener('change', () => {
        saveFilter('dishwasher');
        filterPins();
      });
    },
    parking() {
      Filter.parking.addEventListener('change', () => {
        saveFilter('parking');
        filterPins();
      });
    },
    washer() {
      Filter.washer.addEventListener('change', () => {
        saveFilter('washer');
        filterPins();
      });
    },
    elevator() {
      Filter.elevator.addEventListener('change', () => {
        saveFilter('elevator');
        filterPins();
      });
    },
    conditioner() {
      Filter.conditioner.addEventListener('change', () => {
        saveFilter('conditioner');
        filterPins();
      });
    },
  };

  function filterPins() {
    var allPins = Array.from(document.querySelectorAll('.map__pin'));
    allPins.shift();

    allPins.forEach((item) => item.classList.remove('hidden'));

    allPins.forEach((item) => {
      (item.dataset.type == window.filter.type ||
        'any' == window.filter.type) &&
      (item.dataset.price == window.filter.price ||
        'any' == window.filter.price) &&
      (item.dataset.rooms == window.filter.rooms ||
        'any' == window.filter.rooms) &&
      (item.dataset.guests == window.filter.guests ||
        'any' == window.filter.guests) &&
      (item.dataset.wifi == window.filter.wifi ||
        'any' == window.filter.wifi) &&
      (item.dataset.dishwasher == window.filter.dishwasher ||
        'any' == window.filter.dishwasher) &&
      (item.dataset.parking == window.filter.parking ||
        'any' == window.filter.parking) &&
      (item.dataset.washer == window.filter.washer ||
        'any' == window.filter.washer) &&
      (item.dataset.elevator == window.filter.elevator ||
        'any' == window.filter.elevator) &&
      (item.dataset.conditioner == window.filter.conditioner ||
        'any' == window.filter.conditioner)
        ? item
        : item.classList.add('hidden');
    });
  }
  function saveFilter(filterName) {
    window.filter[filterName] = findActiveFilterName(filterName);
  }
  function findActiveFilterName(type) {
    var activeFilter;
    var isSelect = () => Filter[type].type == 'select-one';
    var isCheckbox = () => Filter[type].type == 'checkbox';

    // console.log(isSelect());
    if (isSelect()) {
      var activeFilterIndex = Filter[type].selectedIndex;
      activeFilter = Filter[type][activeFilterIndex].value;
    } else if (isCheckbox() && Filter[type].checked == false) {
      activeFilter = 'any';
    }
    return activeFilter;
  }

  OnFilter.type();
  OnFilter.price();
  OnFilter.rooms();
  OnFilter.guests();
  OnFilter.wifi();
  OnFilter.dishwasher();
  OnFilter.parking();
  OnFilter.washer();
  OnFilter.elevator();
  OnFilter.conditioner();
})();
