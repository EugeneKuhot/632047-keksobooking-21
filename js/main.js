'use strict';

const PIN_HEIGHT = 22;

//  Functions for mock

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getFeaturesForMock() {
  const featuresArr = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const featuresForAd = [];
  const featuresIteration = getRandomIntInclusive(1, 5);

  for (let j = 1; j <= featuresIteration; j++) {
    featuresForAd.push(featuresArr[getRandomIntInclusive(0, 5)]);
  }

  return featuresForAd;
}
function getPhotosForMock() {
  const photosArr = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const photoesForAd = [];
  const photoesIteration = getRandomIntInclusive(1, 5);

  for (let j = 1; j <= photoesIteration; j++) {
    photoesForAd.push(photosArr[getRandomIntInclusive(0, 2)]);
  }

  return photoesForAd;
}
function getTypeForMock() {
  const typeArr = [`palace`, `flat`, `house`, `bungalow`];

  const typeForAd = typeArr[getRandomIntInclusive(0, 3)];
  return typeForAd;
}
function getSimilarAd() {
  const similarAdsArray = [];

  for (let i = 1; i <= 8; i++) {
    const photosForAd = getPhotosForMock();
    const typeForAd = getTypeForMock();
    const featuresForAd = getFeaturesForMock();
    const locationX = getRandomIntInclusive(0, 1200);
    const locationY = getRandomIntInclusive(130, 630);

    const adTemplate = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`
      },
      offer: {
        title: `AD TITLE`,
        address: locationX + `,` + locationY,
        price: 1000,
        type: typeForAd,
        rooms: 3,
        guests: 6,
        checkin: `13:00`,
        checkout: `13:00`,
        features: featuresForAd,
        description: `DESCRIPTION`,
        photos: photosForAd
      },
      location: {
        x: locationX,
        y: locationY - 70
      }
    };


    similarAdsArray.push(adTemplate);
  }

  return similarAdsArray;
}

const adDataMock = getSimilarAd(); // Mock array with property ads


//  Show map with pins

const map = document.querySelector(`.map`);
function showMap() {
  map.classList.remove(`map--faded`);
}

//  Pins

const mapPinsBlock = document.querySelector(`.map__pins`);
function createPins(adData) {
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);

  for (let i = 0; i < 8; i++) {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left:` + adData[i].location.x + `px; top:` + adData[i].location.y + `px;`;
    pin.querySelector(`img`).src = adData[i].author.avatar;
    pin.querySelector(`img`).alt = adData[i].offer.description;
    pinsFragment.appendChild(pin);
  }

  mapPinsBlock.appendChild(pinsFragment);
}
createPins(adDataMock);


// AdCardPopup

const adCardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const popupPhoto = adCardPopupTemplate.querySelector(`.popup__photo`);

function getPropertyTypeForAd(type) {
  let propertyTypeForAd;
  if (type === `flat`) {
    propertyTypeForAd = `Квартира`;
  } else if (type === `bungalow`) {
    propertyTypeForAd = `Бунгало`;
  } else if (type === `house`) {
    propertyTypeForAd = `Дом`;
  } else if (type === `palace`) {
    propertyTypeForAd = `Дворец`;
  }

  return propertyTypeForAd;
}
function getFeaturesBlock(adData) {
  const featureFragment = document.createDocumentFragment();

  for (let k = 0; k < adData.offer.features.length; k++) {
    const featureItem = document.createElement(`li`);
    featureItem.className = `popup__feature popup__feature--` + adData.offer.features[k];
    featureFragment.appendChild(featureItem);
  }

  return featureFragment;
}
function createPhotosFragment(adData) {
  const photosFragment = document.createDocumentFragment();
  for (let t = 0; t < adData.offer.photos.length; t++) {
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = adData.offer.photos[t];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
}
function adCard(adData) {
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const ad = adCardPopupTemplate.cloneNode(true);

  ad.querySelector(`.popup__title`).textContent = adData[0].offer.title;
  ad.querySelector(`.popup__text--address`).textContent = adData[0].offer.address;
  ad.querySelector(`.popup__text--price`).textContent = adData[0].offer.price + `₽/ночь`;
  ad.querySelector(`.popup__type`).textContent = getPropertyTypeForAd(adData[0].offer.type);
  ad.querySelector(`.popup__text--capacity`).textContent = adData[0].offer.rooms + ` комнаты для ` + adData[0].offer.guests + ` гостей`;
  ad.querySelector(`.popup__text--time`).textContent = `Заезд после ` + adData[0].offer.checkin + `, выезд до ` + adData[0].offer.checkout;
  ad.querySelector(`.popup__features`).innerHTML = ``;
  ad.querySelector(`.popup__features`).appendChild(getFeaturesBlock(adData[0]));
  ad.querySelector(`.popup__description`).textContent = adData[0].offer.description;
  ad.querySelector(`.popup__avatar`).src = adData[0].author.avatar;
  ad.querySelector(`.popup__photos`).removeChild(ad.querySelector(`.popup__photo`));
  ad.querySelector(`.popup__photos`).appendChild(createPhotosFragment(adData[0]));

  mapFiltersContainer.insertAdjacentElement(`beforebegin`, ad);
}

adCard(adDataMock);

const mainPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
const mapFiltersFieldset = mapFilters.querySelector(`fieldset`);
const addressField = document.querySelector(`#address`);


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
  }
});
mainPin.addEventListener(`keydown`, function (e) {
  if (e.keyCode === 13) {
    activatePage();
    setAddress(PIN_HEIGHT);
  }
});


// Validity
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


const RoomGuestRation = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const submitBtn = document.querySelector(`.ad-form__submit`);

const checkPlaceValidity = function () {
  const roomGuests = RoomGuestRation[roomNumberSelect.value];
  const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Количество гостей не влезут в выбранную комнату` : ``;
  capacitySelect.setCustomValidity(message);
};

const onSubmitBtnClick = function () {
  checkPlaceValidity();
};

const disableСapacityOptions = function (inputValue) {
  const capacityOptions = capacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach(function (it) {
    it.disabled = true;
  });
  RoomGuestRation[inputValue].forEach(function (it) {
    capacitySelect.querySelector(`option` + '[value="' + it + '"]').disabled = false;
    capacitySelect.value = it;
  });
};

const onRoomNumberSelectChange = function (evt) {
  evt.target.setCustomValidity(``);
  disableСapacityOptions(roomNumberSelect.value);
};

roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);

submitBtn.addEventListener(`click`, onSubmitBtnClick);
