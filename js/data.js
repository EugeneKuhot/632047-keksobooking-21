'use strict';

(function () {

  const MAP_TOP_BORDER = 130;
  const MAP_BOTTOM_BORDER = 630;
  const MAP_LEFT_BORDER = 0;
  const MAP_RIGHT_BORDER = 1150;

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
      const locationY = getRandomIntInclusive(MAP_TOP_BORDER, MAP_BOTTOM_BORDER);

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

  window.data = {
    adData: adDataMock,
    mapTopBorder: MAP_TOP_BORDER,
    mapBottomBorder: MAP_BOTTOM_BORDER,
    mapLeftBorder: MAP_LEFT_BORDER,
    mapRightBorder: MAP_RIGHT_BORDER,
  };
})();
