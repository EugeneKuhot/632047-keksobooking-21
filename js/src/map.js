'use strict';

const PIN_HEIGHT = 87;
const PIN_WIDTH = 32;

const mainPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
const mapFiltersFieldset = mapFilters.querySelector(`fieldset`);
const addressField = document.querySelector(`#address`);

const map = document.querySelector(`.map`);

function removeCardPopups() {
  const allCardPopups = map.querySelectorAll(`.map__card.popup`);

  allCardPopups.forEach((el) => el.remove());
}

function showMap() {
  map.classList.remove(`map--faded`);
}

function removeMap() {
  map.classList.add(`map--faded`);
}

function activateForm() {
  adForm.classList.remove(`ad-form--disabled`);
  fieldsets.forEach((el) => el.removeAttribute(`disabled`, `true`));
}

function deactivateForm() {
  adForm.classList.add(`ad-form--disabled`);
  fieldsets.forEach((el) => el.setAttribute(`disabled`, `true`));
}

function activateFilters() {
  mapFilters.classList.remove(`ad-form--disabled`);
  mapFiltersSelects.forEach((el) => el.removeAttribute(`disabled`));
  mapFiltersFieldset.removeAttribute(`disabled`);
}

function deactivateFilters() {
  mapFilters.classList.add(`ad-form--disabled`);
  mapFiltersSelects.forEach((el) => el.setAttribute(`disabled`, `true`));
  mapFiltersFieldset.setAttribute(`disabled`, `true`);
}

function activatePage() {
  showMap();
  activateForm();
  activateFilters();
}

function deactivatePage() {
  removeMap();
  deactivateForm();
  deactivateFilters();
  window.pin.removePins();
  removeCardPopups();
}

function setAddress(offsetX, offsetY) {
  let address = offsetX + 32 + `, ` + offsetY;
  addressField.value = address;
}

setAddress(mainPin.offsetLeft, mainPin.offsetTop);

function highlightPins() {
  const allPins = window.pin.mapPinsBlock.querySelectorAll(`.map__pin`);

  function addPinActiveClass(el) {
    allPins.forEach((pin) => pin.classList.remove(`map__pin--active`));
    el.classList.add(`map__pin--active`);
  }

  allPins.forEach((el) => el.addEventListener(`click`, function () {
    addPinActiveClass(el);
  }));
}

const filterForm = document.querySelector(`.map__filters`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector(`#housing-price`);
const houseRoomsSelect = document.querySelector(`#housing-rooms`);
const houseGuestsSelect = document.querySelector(`#housing-guests`);

function updatePins(data) {
  removeCardPopups();
  window.pin.removePins();

  let pins = data;

  const sameTypePins = pins.filter(function (pin) {
    if (houseTypeSelect.value === `any`) {
      return pins;
    } else {
      return pin.offer.type === houseTypeSelect.value;
    }
  });
  const samePricePins = sameTypePins.filter(function (pin) {

    let pinsArr;

    if (housePriceSelect.value === `any`) {
      pinsArr = pins;
    } else if (housePriceSelect.value === `middle`) {
      if (pin.offer.price >= 10000 && pin.offer.price <= 50000) {
        pinsArr = pin.offer.price;
      }
    } else if (housePriceSelect.value === `low`) {
      if (pin.offer.price < 10000) {
        pinsArr = pin.offer.price;
      }
    } else if (housePriceSelect.value === `high`) {
      if (pin.offer.price > 50000) {
        pinsArr = pin.offer.price;
      }
    }
    return pinsArr;
  });
  const sameRoomsPins = samePricePins.filter(function (pin) {
    if (houseRoomsSelect.value === `any`) {
      return pins;
    } else {
      return pin.offer.rooms === Number(houseRoomsSelect.value);
    }
  });
  const sameGuestsPins = sameRoomsPins.filter(function (pin) {
    if (houseGuestsSelect.value === `any`) {
      return pins;
    } else {
      return pin.offer.guests === Number(houseGuestsSelect.value);
    }
  });

  const filterData = sameGuestsPins;

  const uniquePins = filterData.filter(function (pin, index) {
    return filterData.indexOf(pin) === index;
  });

  window.pin.createPins(uniquePins.slice(0, 5));
}

function onAdsLoadSuccess(data) {
  window.pin.createPins(data.slice(0, 5));
  activatePage();
  highlightPins();

  filterForm.addEventListener(`change`, function () {
    window.util.debounce(updatePins(data));
  });
}

const onAdsLoadError = function () {
  window.util.renderErrorMessage();
};

function pinsRender() {
  window.ajax.load(onAdsLoadSuccess, onAdsLoadError);
}

mainPin.addEventListener(`mousedown`, function (e) {
  if (e.button === 0) {
    setAddress(mainPin.offsetLeft, mainPin.offsetTop);
    if (adForm.classList.contains(`ad-form--disabled`)) {
      pinsRender();
    }
  }
});
mainPin.addEventListener(`keydown`, function (e) {
  window.util.isEnterEvent(e, function () {
    setAddress(mainPin.offsetTop, mainPin.offsetLeft);

    if (adForm.classList.contains(`ad-form--disabled`)) {
      window.ajax.load(onAdsLoadSuccess, onAdsLoadError);
      activatePage();
    }
  });
});

window.pageMap = {
  pinHeight: PIN_HEIGHT,
  pinWidth: PIN_WIDTH,
  addressField,
  deactivatePage,
  setAddress,
  onAdsLoadError,
  removeCardPopups,
  mainPin
};

