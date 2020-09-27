'use strict';

(function () {
  var TypesMap = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var template = document.querySelector('template');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = template.content.querySelector('.map__pin');
  var adTemplate = template.content.querySelector('.map__card');
  var popupPhoto = template.content.querySelector('.popup__photo');
  var mapFiltersContainer = document.querySelector('.map__filters-container');


  var createPinMarkup = function (pinData) {
    var pinItem = mapPinTemplate.cloneNode(true);
    pinItem.querySelector('img').src = pinData.author.avatar;
    pinItem.style.left = pinData.location.x + 'px';
    pinItem.style.top = pinData.location.y + 'px';
    pinItem.querySelector('img').alt = pinData.offer.title;
    var onPinItemClick = function () {
      var mapCardRemovable = map.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      createAd(pinData);
      document.addEventListener('keydown', window.utils.onEscDown);
    };
    pinItem.addEventListener('click', onPinItemClick);
    return pinItem;
  };

  var renderPinsMarkup = function (pinsData) {
    var mapPinsFragment = document.createDocumentFragment();
    for (var j = 0; j < pinsData.length; j++) {
      mapPinsFragment.appendChild(createPinMarkup(pinsData[j]));
    }
    mapPins.appendChild(mapPinsFragment);
  };

  var createFeatureFragment = function (adData) {
    var featureFragment = document.createDocumentFragment();
    for (var j = 0; j < adData.offer.features.length; j++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + adData.offer.features[j];
      featureFragment.appendChild(featureItem);
    }
    return featureFragment;
  };

  var createPhotosFragment = function (adData) {
    var photosFragment = document.createDocumentFragment();
    for (var t = 0; t < adData.offer.photos.length; t++) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = adData.offer.photos[t];
      photosFragment.appendChild(popupPhotoItem);
    }
    return photosFragment;
  };

  var createAd = function (adData) {
    var ad = adTemplate.cloneNode(true);
    ad.querySelector('.map__card img').src = adData.author.avatar;
    ad.querySelector('.popup__title').textContent = adData.offer.title;
    ad.querySelector('.popup__text--price').textContent = adData.offer.price + ' ₽/ночь';
    ad.querySelector('.popup__type').textContent = TypesMap[adData.offer.type.toLowerCase()];
    ad.querySelector('.popup__text--capacity').textContent = adData.offer.rooms + ' комнаты для ' + adData.offer.guests + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adData.offer.checkin + ', выезд до ' + adData.offer.checkout;
    ad.querySelector('.popup__features').innerHTML = '';
    ad.querySelector('.popup__features').appendChild(createFeatureFragment(adData));
    ad.querySelector('.popup__description').textContent = adData.offer.description;
    ad.querySelector('.popup__photos').removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__photos').appendChild(createPhotosFragment(adData));
    mapFiltersContainer.insertAdjacentElement('beforebegin', ad);
    var closeAd = ad.querySelector('.popup__close');
    var onCloseAdClick = function () {
      ad.remove();
      document.removeEventListener('click', window.utils.onEscDown);
    };
    closeAd.addEventListener('click', onCloseAdClick);
    return ad;
  };

  createAd();
})();
