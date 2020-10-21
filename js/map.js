'use strict';

(function () {

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
  }

  function setAddress(offsetX, offsetY) {
    let address = offsetX + 32 + ` / ` + offsetY;
    addressField.value = address;
  }

  function highlightPins() {
    const allPins = window.pin.mapPinsBlock.querySelectorAll(`.map__pin`);

    allPins.forEach((el) => el.addEventListener(`click`, function () {
      allPins.forEach((pin) => pin.classList.remove(`map__pin--active`))
      el.classList.add(`map__pin--active`);
    }));
  }


  const filterForm = document.querySelector(`.map__filters`);
  const houseTypeSelect = document.querySelector('#housing-type');
  const housePriceSelect = document.querySelector('#housing-price');
  const houseRoomsSelect = document.querySelector('#housing-rooms');
  const houseGuestsSelect = document.querySelector('#housing-guests');


  function updatePins(data) {
    window.pin.removePins();

    let pins = data;

    const sameTypePins = pins.filter(function(pin) {
      if (houseTypeSelect.value === `any`) {
        return pins;
      } else {
        return pin.offer.type === houseTypeSelect.value;
      }
    });

    const samePricePins = pins.filter(function(pin) {
      if (housePriceSelect.value === `any`) {
        return pins;
      } else if (housePriceSelect.value === `middle`) {
        if (pin.offer.price >= 10000 && pin.offer.price <= 50000) {
          return pin.offer.price === housePriceSelect.value;
        }

      }
    });



    console.log(samePricePins);
    window.pin.create(sameTypePins.concat(samePricePins));
  }






  function onAdsLoadSuccess(data) {
    window.pin.create(data);
    activatePage();
    highlightPins();

    filterForm.addEventListener(`change`, function() {
      updatePins(data);

    });
  }

  const onAdsLoadError = function () {
    window.util.renderErrorMessage()
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



  window.map = {
    remove: removeCardPopups,
    mainPin: mainPin,
    pinHeight: PIN_HEIGHT,
    pinWidth: PIN_WIDTH,
    addressField: addressField,
    deactivatePage: deactivatePage,
    removeCardPopups: removeCardPopups,
    setAddress: setAddress,


    onAdsLoadSuccess: onAdsLoadSuccess,
    onAdsLoadError: onAdsLoadError
  };
})();
