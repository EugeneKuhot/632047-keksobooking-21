'use strict';

(function () {

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

    ad.querySelector(`.popup__title`).textContent = adData.offer.title;
    ad.querySelector(`.popup__text--address`).textContent = adData.offer.address;
    ad.querySelector(`.popup__text--price`).textContent = adData.offer.price + `₽/ночь`;
    ad.querySelector(`.popup__type`).textContent = getPropertyTypeForAd(adData.offer.type);
    ad.querySelector(`.popup__text--capacity`).textContent = adData.offer.rooms + ` комнаты для ` + adData.offer.guests + ` гостей`;
    ad.querySelector(`.popup__text--time`).textContent = `Заезд после ` + adData.offer.checkin + `, выезд до ` + adData.offer.checkout;
    ad.querySelector(`.popup__features`).innerHTML = ``;
    ad.querySelector(`.popup__features`).appendChild(getFeaturesBlock(adData));
    ad.querySelector(`.popup__description`).textContent = adData.offer.description;
    ad.querySelector(`.popup__avatar`).src = adData.author.avatar;
    ad.querySelector(`.popup__photos`).removeChild(ad.querySelector(`.popup__photo`));
    ad.querySelector(`.popup__photos`).appendChild(createPhotosFragment(adData));

    ad.querySelector(`.popup__close`).addEventListener(`click`, function () {
      window.map.remove();
    });
    ad.querySelector(`.popup__close`).addEventListener(`keydown`, function (e) {
      window.util.isEnterEvent(e, window.map.remove());
    });
    document.addEventListener(`keydown`, function (e) {
      window.util.isEnterEvent(e, window.map.remove());
    });

    mapFiltersContainer.insertAdjacentElement(`beforebegin`, ad);
  }

  window.card = {
    ad: adCard
  };
})();
