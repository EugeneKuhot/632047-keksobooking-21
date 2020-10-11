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


  function activateForm() {
    adForm.classList.remove(`ad-form--disabled`);
    fieldsets.forEach((el) => el.removeAttribute(`disabled`, `true`));
  }
  function activateFilters() {
    mapFilters.classList.remove(`ad-form--disabled`);
    mapFiltersSelects.forEach((el) => el.removeAttribute(`disabled`));
    mapFiltersFieldset.removeAttribute(`disabled`);
  }
  function activatePage() {
    showMap();
    activateForm();
    activateFilters();
  }
  function setAddress(offsetX, offsetY) {
    let top = Number(mainPin.style.top.slice(0, -2));
    let left = mainPin.style.left.slice(0, -2);
    let address = top + offsetY + ` / ` + left + offsetX;
    addressField.value = address;
  }

  function onAdsLoadSuccess (data) {
    window.pin.create(data);
  }

  const onError = function () {
    console.error(`error`);
  };


  mainPin.addEventListener(`mousedown`, function (e) {
    if (e.button === 0) {
      setAddress(PIN_WIDTH, PIN_HEIGHT);

      if (adForm.classList.contains(`ad-form--disabled`)) {
        window.ajax.load(onAdsLoadSuccess, onError);

        activatePage();
      }
    }
  });
  mainPin.addEventListener(`keydown`, function (e) {
    window.util.isEnterEvent(e, function () {
      setAddress(PIN_WIDTH, PIN_HEIGHT);

      if (adForm.classList.contains(`ad-form--disabled`)) {
        window.ajax.load(onAdsLoadSuccess, onError);
        activatePage();
      }
    });
  });


  window.map = {
    remove: removeCardPopups,
    mainPin: mainPin,
    pinHeight: PIN_HEIGHT,
    pinWidth: PIN_WIDTH,
    addressField: addressField
  };
})();
