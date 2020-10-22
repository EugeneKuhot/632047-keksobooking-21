'use strict';

(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const RoomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const propertyType = document.querySelector(`#type`);
  const propertyPrice = document.querySelector(`#price`);

  function changePrice() {
    if (propertyType.value === `bungalow`) {
      propertyPrice.setAttribute(`min`, `0`);
      propertyPrice.setAttribute(`placeholder`, `0`);
    } else if (propertyType.value === `flat`) {
      propertyPrice.setAttribute(`min`, `1000`);
      propertyPrice.setAttribute(`placeholder`, `1000`);
    } else if (propertyType.value === `house`) {
      propertyPrice.setAttribute(`min`, `5000`);
      propertyPrice.setAttribute(`placeholder`, `5000`);
    } else if (propertyType.value === `palace`) {
      propertyPrice.setAttribute(`min`, `10000`);
      propertyPrice.setAttribute(`placeholder`, `10000`);
    }
  }

  propertyType.addEventListener(`change`, changePrice);

  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const submitBtn = document.querySelector(`.ad-form__submit`);
  const form = document.querySelector(`.ad-form`);
  const main = document.querySelector(`main`);

  const checkPlaceValidity = function () {
    const roomGuests = RoomGuestRation[roomNumberSelect.value];
    const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Количество гостей не влезут в выбранную комнату` : ``;
    capacitySelect.setCustomValidity(message);
  };

  function onSuccess() {
    const successMessage = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
    const fragment = document.createDocumentFragment();

    fragment.appendChild(successMessage);
    main.appendChild(fragment);

    document.addEventListener(`keydown`, function (e) {
      window.util.isEscEvent(e, function () {
        removeSuccessPopup();
      });

      document.removeEventListener(`keydown`, removeSuccessPopup);
    });
    document.addEventListener(`click`, function () {
      removeSuccessPopup();
      document.removeEventListener(`click`, removeSuccessPopup);
    });

  }

  function removeSuccessPopup() {
    const successMessagePopup = main.querySelector(`.success`);
    if (successMessagePopup) {
      main.removeChild(successMessagePopup);
    }
  }

  function onError() {
    const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
    const errorFragment = document.createDocumentFragment();

    errorFragment.appendChild(errorMessage);
    main.appendChild(errorFragment);

    document.addEventListener(`keydown`, function (e) {
      window.util.isEscEvent(e, function () {
        removeErrorPopup();
      });

      document.removeEventListener(`keydown`, removeSuccessPopup);
    });
    document.addEventListener(`click`, function () {
      removeErrorPopup();
      document.removeEventListener(`click`, removeSuccessPopup);
    });
  }

  function removeErrorPopup() {
    const errorMessagePopup = main.querySelector(`.error`);
    if (errorMessagePopup) {
      main.removeChild(errorMessagePopup);
    }
  }

  function onSubmitBtnClick(e) {
    checkPlaceValidity();
    if (form.checkValidity()) {
      e.preventDefault();
      window.ajax.upload(new FormData(form), onSuccess, onError);
      window.map.deactivatePage();
      window.map.removeCardPopups();
      form.reset();
      window.pin.removePins();
    }
  }

  function disableCapacityOptions(inputValue) {
    const capacityOptions = capacitySelect.querySelectorAll(`option`);
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomGuestRation[inputValue].forEach(function (it) {
      capacitySelect.querySelector(`option` + '[value="' + it + '"]').disabled = false;
      capacitySelect.value = it;
    });
  }

  function onRoomNumberSelectChange(evt) {
    evt.target.setCustomValidity(``);
    disableСapacityOptions(roomNumberSelect.value);
  }

  roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);

  submitBtn.addEventListener(`click`, function (e) {
    onSubmitBtnClick(e);
  });


  const timeInInput = document.querySelector(`#timein`);
  const timeOutInput = document.querySelector(`#timeout`);

  function onTimeInInputChange(evt) {
    timeOutInput.value = evt.target.value;
  }

  function onTimeOutInputChange(evt) {
    timeInInput.value = evt.target.value;
  }

  timeInInput.addEventListener(`change`, onTimeInInputChange);
  timeOutInput.addEventListener(`change`, onTimeOutInputChange);

  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const imagesPreview = document.querySelector(`.ad-form__photo`);
  const avatarChooser = document.querySelector(`#avatar`);
  const imagesChooser = document.querySelector(`#images`);

  avatarChooser.addEventListener(`change`, function () {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      avatarChooser.value = ``;
    }
  });

  imagesChooser.addEventListener(`change`, function () {
    const file = imagesChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        const photo = document.createElement(`img`);
        photo.style.height = `60px`;
        photo.style.margin = `5px`;
        photo.src = reader.result;
        imagesPreview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    } else {
      imagesChooser.value = ``;
    }
  });

  const resetBtn = document.querySelector(`.ad-form__reset`);
  resetBtn.addEventListener(`click`, window.map.deactivatePage);

})();
