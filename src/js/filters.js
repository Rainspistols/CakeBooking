'use strict';

var filtersContainer = document.querySelector('.map__filters-container');
var housingFeatures = document.querySelector('#housing-features');

var Filter = {
  form: filtersContainer.querySelector('.map__filters'),
  type: filtersContainer.querySelector('#housing-type'),
  price: filtersContainer.querySelector('#housing-price'),
  rooms: filtersContainer.querySelector('#housing-rooms'),
  guests: filtersContainer.querySelector('#housing-guests'),
  Feature: {
    wifi: housingFeatures.querySelector('#filter-wifi'),
    dishwasher: housingFeatures.querySelector('#filter-dishwasher'),
    parking: housingFeatures.querySelector('#filter-parking'),
    washer: housingFeatures.querySelector('#filter-washer'),
    elevator: housingFeatures.querySelector('#filter-elevator'),
    conditioner: housingFeatures.querySelector('#filter-conditioner'),
  },
};

function onTypeFilter() {
  Filter.type.addEventListener('change', () => {
    saveFilter('type');
    filterPins();
  });
}
function onPriceFilter() {
  Filter.price.addEventListener('change', () => {
    saveFilter('price');
    filterPins();
  });
}
function onRoomsFilter() {
  Filter.rooms.addEventListener('change', () => {
    saveFilter('rooms');
    filterPins();
  });
}
function onGuestsFilter() {
  Filter.guests.addEventListener('change', () => {
    saveFilter('guests');
    filterPins();
  });
}

function filterPins() {
  var allPins = Array.from(document.querySelectorAll('.map__pin'));
  allPins.shift();

  allPins.forEach((item) => item.classList.remove('hidden'));

  allPins.forEach((item) => {
    (item.dataset.type == window.filter.type || 'any' == window.filter.type) &&
    (item.dataset.price == window.filter.price ||
      'any' == window.filter.price) &&
    (item.dataset.rooms == window.filter.rooms ||
      'any' == window.filter.rooms) &&
    (item.dataset.guests == window.filter.guests ||
      'any' == window.filter.guests)
      ? item
      : item.classList.add('hidden');
  });
  // allPins.forEach((item) => {
  //   (item.dataset.type == window.filter.type || 'any' == window.filter.type) &&
  //   (item.dataset.price == window.filter.price || 'any' == window.filter.price)
  //     ? console.log('true',item.dataset.type,window.filter.type,item.dataset.price,window.filter.price)
  //     : console.log('false',item.dataset.type,window.filter.type,item.dataset.price,window.filter.price);
  // });
  // allPins.forEach((item) => {
  //   console.log(
  //     'item.type ' + item.dataset.type,
  //     'filter.type ' + window.filter.type,
  //     'item.price ' + item.dataset.price,
  //     'filter.price ' + window.filter.price
  //   );
  // });
}

window.filter = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};
function saveFilter(filterName) {
  window.filter[filterName] = findActiveFilterName(filterName);
}
function findActiveFilterName(type) {
  var activeFilterIndex = Filter[type].selectedIndex;
  var activeFilter = Filter[type][activeFilterIndex].value;
  return activeFilter;
}

// function hideFilteredPins(type) {
//   var activeFilter = findActiveFilterName(type);
//   findAllVisiblePins();

//   if (activeFilter == 'any') {
//     window.filterType.forEach((item) => item.classList.remove('hidden'));
//   }

//   window.filterType.forEach((item) =>
//     item.dataset.type == activeFilter ? item.classList.remove('hidden') : item
//   );

//   if (activeFilter !== 'any') {
//     window.filterType.forEach((item) =>
//       item.dataset[type] == activeFilter ? item : item.classList.add('hidden')
//     );
//   }
// }
// function findAllVisiblePins() {
//   var allPins = [...document.querySelectorAll('.map__pin')];
//   allPins.shift();
//   if (!window.filterType) {
//     window.filterType = [];
//     allPins.forEach((item) =>
//       item.classList.contains('hidden') ? item : window.filterType.push(item)
//     );
//   }
// }

onTypeFilter();
onPriceFilter();
onRoomsFilter();
onGuestsFilter();
