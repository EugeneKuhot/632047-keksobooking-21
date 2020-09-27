'use strict';

function getSimilarAd() {

  const similarAdsArray = [];

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getFeatures() {
    const featuresArr = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
    const featuresForAd = [];
    const featuresIteration = getRandomIntInclusive(1, 5);

    for (let j = 1; j <= featuresIteration; j++) {
      featuresForAd.push(featuresArr[getRandomIntInclusive(0, 5)]);
    }

    return featuresForAd;
  }

  function getPhotos() {
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

  function getType() {
    const typeArr = [`palace`, `flat`, `house`, `bungalow`];

    const typeForAd = typeArr[getRandomIntInclusive(0, 3)];
    return typeForAd;
  }

  for (let i = 1; i <= 8; i++) {
    const photosForAd = getPhotos();
    const typeForAd = getType();
    const featuresForAd = getFeatures();
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
        photos: photosForAd,
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

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

function createPins() {

  const similarAdsArray = getSimilarAd();
  const mapPinsBlock = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  const template = document.querySelector(`#pin`).content.querySelector(`button`);

  for (let i = 0; i <= 7; i++) {
    const element = template.cloneNode(true);
    element.style = `left:` + similarAdsArray[i].location.x + `px; top:` + similarAdsArray[i].location.y + `px;`;
    element.querySelector(`img`).src = similarAdsArray[i].author.avatar;
    element.querySelector(`img`).alt = similarAdsArray[i].offer.description;
    fragment.appendChild(element);
  }

  mapPinsBlock.appendChild(fragment);
}

createPins();





const similarAdsArray = getSimilarAd();
const firstAd = similarAdsArray[0];
const adFeatures = firstAd.offer.features;



function adCard() {



  function getPropertyTypeForAd(type) {
    if (type === `flat`) {
      return 'Квартира ';
    }else if (type === `bungalow`) {
      return 'Бунгало';
    }else if (type === `house`) {
      return 'Дом';
    }else if (type === `palace`) {
      return 'Дворец';
    }
  }



  function getFeaturesBlock(element, features) {
    const featureFragment = document.createDocumentFragment();

    for (let i=0; i<features.length; i++) {
      let featureItem = document.createElement('li');

      if (features[i] === `wifi`) {
        featureItem.className = 'popup__feature popup__feature--wifi';
        featureFragment.appendChild(featureItem);
      }else if (features[i] === `dishwasher`) {
        featureItem.className = 'popup__feature popup__feature--dishwasher';
        featureFragment.appendChild(featureItem);
      }else if (features[i] === `washer`) {
        featureItem.className = 'popup__feature popup__feature--washer';
        featureFragment.appendChild(featureItem);
      }else if (features[i] === `parking`) {
        featureItem.className = 'popup__feature popup__feature--parking';
        featureFragment.appendChild(featureItem);
      }else if (features[i] === `elevator`) {
        featureItem.className = 'popup__feature popup__feature--elevator';
        featureFragment.appendChild(featureItem);
      }else if (features[i] === `conditioner`) {
        featureItem.className = 'popup__feature popup__feature--conditioner';
        featureFragment.appendChild(featureItem);
      }
    }

    return featureFragment;
  }

  const mapFiltersContainer = document.querySelector('.map__filters-container');

  const template = document.querySelector(`#card`).content.querySelector(`article`);

  const element = template.cloneNode(true);

  const popupPhoto = element.querySelector('.popup__photo');

  function createPhotosFragment(adData) {
    let photosFragment = document.createDocumentFragment();
    for (let t = 0; t < adData.offer.photos.length; t++) {
      let popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = adData.offer.photos[t];
      photosFragment.appendChild(popupPhotoItem);
    }
    return photosFragment;
  };

  let features = getFeaturesBlock(element, adFeatures);

  element.querySelector(`.popup__title`).textContent = firstAd.offer.title;
  element.querySelector(`.popup__text--address`).textContent = firstAd.offer.address;
  element.querySelector(`.popup__text--price`).textContent = firstAd.offer.price + `₽/ночь`;
  element.querySelector(`.popup__type`).textContent = getPropertyTypeForAd(firstAd.offer.type);
  element.querySelector(`.popup__text--capacity`).textContent = firstAd.offer.rooms + ` комнаты для ` + firstAd.offer.guests + ` гостей`;
  element.querySelector(`.popup__text--time`).textContent = `Заезд после ` + firstAd.offer.checkin + `, выезд до ` + firstAd.offer.checkout;
  element.querySelector('.popup__features').innerHTML = '';
  element.querySelector(`.popup__features`).appendChild(features);
  element.querySelector(`.popup__description`).textContent = firstAd.offer.description;
  element.querySelector(`.popup__avatar`).src = firstAd.author.avatar;
  element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
  element.querySelector(`.popup__photos`).appendChild(createPhotosFragment(firstAd));

  mapFiltersContainer.insertAdjacentElement('beforebegin', element);
}


adCard();
