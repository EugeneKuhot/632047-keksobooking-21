'use strict';

(function () {

  const mapPinsBlock = document.querySelector(`.map__pins`);

  function createPins(adData) {
    const pinsFragment = document.createDocumentFragment();
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);

    for (let i = 0; i < 8; i++) {
      const pin = pinTemplate.cloneNode(true);
      pin.style = `left:` + adData[i].location.x + `px; top:` + adData[i].location.y + `px;`;
      pin.querySelector(`img`).src = adData[i].author.avatar;
      pin.querySelector(`img`).alt = adData[i].offer.description;

      const onPinItemClick = function () {
        window.card.ad(adData[i]);
      };

      pin.addEventListener(`click`, function () {
        window.map.remove();
        onPinItemClick();
      });
      pin.addEventListener(`keydown`, function (e) {
        window.util.isEnterEvent(e, function () {
          window.map.remove();
          onPinItemClick();
        });
      });


      pinsFragment.appendChild(pin);
    }

    mapPinsBlock.appendChild(pinsFragment);
  }

  window.pin = {
    create: createPins
  };

})();
