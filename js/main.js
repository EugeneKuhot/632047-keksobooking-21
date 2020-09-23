'use strict';

function getSimilarAd () {

  let similarAdsArray = [];

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  };
  function getFeatures() {
    let featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    let featuresForAd = [];
    let featuresIteration = getRandomIntInclusive(1, 5);

    for (let j = 1; j <= featuresIteration; j++) {
      featuresForAd.push(featuresArr[getRandomIntInclusive(0, 5)]);
    };

    return featuresForAd;
  };
  function getPhotos() {
    let photosArr = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]

    let photoesForAd = [];
    let photoesIteration = getRandomIntInclusive(1, 5);

    for (let j = 1; j <= photoesIteration; j++) {
      photoesForAd.push(photosArr[getRandomIntInclusive(0, 2)]);
    }

    return photoesForAd;
  };
  function getType() {
    let typeArr = ["palace", "flat", "house", "bungalow"]

    let typeForAd = typeArr[getRandomIntInclusive(0, 3)];
    return typeForAd;
  };



  for (let i = 1; i <= 8; i++) {
    let photosForAd = getPhotos();
    let typeForAd = getType();
    let featuresForAd = getFeatures();
    let locationX = getRandomIntInclusive(0, 1200);
    let locationY = getRandomIntInclusive(130, 630);

    let adTemplate = {
      author: {
        avatar: "img/avatars/user0" + i + ".png"
      },
      offer: {
        title: "AD TITLE",
        address: locationX, locationY,
        price: 1000,
        type: typeForAd,
        rooms: 3,
        guests: 6,
        checkin: "13:00",
        checkout: "13:00",
        features: featuresForAd,
        description: "DESCRIPTION",
        photos: photosForAd,
      },
      location: {
        x: locationX,
        y: locationY - 70
      }
    }


    similarAdsArray.push(adTemplate);
  }

  return similarAdsArray;
}

let map = document.querySelector('.map');
map.classList.remove('map--faded');

function createPins() {

  let similarAdsArray = getSimilarAd();
  let mapPinsBlock = document.querySelector('.map__pins');

  let fragment = document.createDocumentFragment();

  let template = document.querySelector('#pin').content.querySelector('button');

  for (let i = 0; i <= 7; i++) {
    let element = template.cloneNode(true);
    element.style = "left:" + similarAdsArray[i].location.x + "px; top:" + similarAdsArray[i].location.y + "px;";
    element.querySelector('img').src = similarAdsArray[i].author.avatar;
    element.querySelector('img').alt = similarAdsArray[i].offer.description;
    fragment.appendChild(element);
  }

  mapPinsBlock.appendChild(fragment);
}

createPins();
