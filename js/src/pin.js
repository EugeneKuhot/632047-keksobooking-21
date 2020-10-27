'use strict';

const mapPinsBlock = document.querySelector(`.map__pins`);

function createPins(adData) {
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);

  for (let i = 0; i < adData.length; i++) {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left:` + adData[i].location.x + `px; top:` + adData[i].location.y + `px;`;
    pin.querySelector(`img`).src = adData[i].author.avatar;
    pin.querySelector(`img`).alt = adData[i].offer.description;
    const onPinItemClick = function () {
      window.card.adCard(adData[i]);
    };
    pin.addEventListener(`click`, function () {
      window.pageMap.removeCardPopups();
      onPinItemClick();
    });
    pin.addEventListener(`keydown`, function (e) {
      window.util.isEnterEvent(e, function () {
        window.pageMap.removeCardPopups();
        onPinItemClick();
      });
    });
    pinsFragment.appendChild(pin);

  }

  mapPinsBlock.appendChild(pinsFragment);
}

function removePins() {
  const allPins = mapPinsBlock.querySelectorAll(`.map__pin`);
  allPins.forEach(function (el) {
    if (!el.classList.contains(`map__pin--main`)) {
      el.remove();
    }
  });
}


window.pin = {
  createPins,
  removePins,
  mapPinsBlock
};

