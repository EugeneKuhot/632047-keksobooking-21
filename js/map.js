'use strict';

(function () {

  const PIN_HEIGHT = 22;

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
  function setAddress(offset) {
    let top = Number(mainPin.style.top.slice(0, 3));
    let left = mainPin.style.left.slice(0, 3);
    let adress = top + offset + ` / ` + left;
    addressField.value = adress;
  }

  setAddress(0);

  mainPin.addEventListener(`mousedown`, function (e) {
    if (e.button === 0) {
      activatePage();
      setAddress(PIN_HEIGHT);
      window.pin.create(window.data.adData);
    }
  });
  mainPin.addEventListener(`keydown`, function (e) {
    window.util.isEnterEvent(e, function () {
      activatePage();
      setAddress(PIN_HEIGHT);
      window.pin.create(window.data.adData);
    });
  });


  window.map = {
    remove: removeCardPopups
  };
})();
