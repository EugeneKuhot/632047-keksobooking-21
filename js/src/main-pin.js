'use strict';

window.pageMap.mainPin.addEventListener(`mousedown`, function (e) {
  e.preventDefault();

  let startCoords = {
    x: e.clientX,
    y: e.clientY
  };

  window.pageMap.setAddress(window.pageMap.mainPin.offsetLeft, window.pageMap.mainPin.offsetTop);

  function mouseMoveShift(moveE) {
    moveE.preventDefault();

    const shift = {
      x: startCoords.x - moveE.clientX,
      y: startCoords.y - moveE.clientY
    };

    startCoords = {
      x: moveE.clientX,
      y: moveE.clientY
    };

    let pinOffsetTop = window.pageMap.mainPin.offsetTop - shift.y;
    let pinOffsetLeft = window.pageMap.mainPin.offsetLeft - shift.x;

    window.pageMap.mainPin.style.top = pinOffsetTop + `px`;
    window.pageMap.mainPin.style.left = pinOffsetLeft + `px`;
    window.pageMap.setAddress(pinOffsetLeft, pinOffsetTop);


    if (pinOffsetTop > window.data.mapBottomBorder) {
      window.pageMap.mainPin.style.top = window.data.mapBottomBorder + `px`;
    } else if (pinOffsetTop < window.data.mapTopBorder) {
      window.pageMap.mainPin.style.top = window.data.mapTopBorder + `px`;
    } else if (pinOffsetLeft < window.data.mapLeftBorder) {
      window.pageMap.mainPin.style.left = window.data.mapLeftBorder + `px`;
    } else if (pinOffsetLeft > window.data.mapRightBorder) {
      window.pageMap.mainPin.style.left = window.data.mapRightBorder + `px`;
    }

  }


  function mouseUpShift(upE) {
    upE.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveShift);
    document.removeEventListener(`mouseup`, mouseUpShift);

  }

  document.addEventListener(`mousemove`, mouseMoveShift);
  document.addEventListener(`mouseup`, mouseUpShift);
});
