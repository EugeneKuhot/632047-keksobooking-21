'use strict';

(function () {

  const PINS_LIMIT = 5;

  const PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  const filter = document.querySelector('.map__filters');
  const filterItems = filter.querySelectorAll('select, input');
  const typeSelect = filter.querySelector('#housing-type');
  const priceSelect = filter.querySelector('#housing-price');
  const roomsSelect = filter.querySelector('#housing-rooms');
  const guestsSelect = filter.querySelector('#housing-guests');
  const featuresFieldset = filter.querySelector('#housing-features');
  let data = [];
  let filteredData = [];

  const filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  function filtrationByType(item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  function filtrationByPrice(item) {
    const filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  function filtrationByRooms(item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  };

  function filtrationByGuests(item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  };

  function filtrationByFeatures(item) {
    const checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  const onFilterChange = window.utils.debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.map.removePins();
    window.map.remove();
    window.map.renderPinsMarkup(filteredData.slice(0, PINS_LIMIT));
  });


  window.filter = {

  };

})();
