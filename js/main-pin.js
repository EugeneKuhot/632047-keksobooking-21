'use strict';

(function () {

  window.map.mainPin.addEventListener(`mousedown`, function (e) {
    e.preventDefault();

    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    window.map.setAddress(window.map.mainPin.offsetLeft, window.map.mainPin.offsetTop);

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

      let pinOffsetTop = window.map.mainPin.offsetTop - shift.y;
      let pinOffsetLeft = window.map.mainPin.offsetLeft - shift.x;

      window.map.mainPin.style.top = pinOffsetTop + `px`;
      window.map.mainPin.style.left = pinOffsetLeft + `px`;
     /* window.map.addressField.value = pinOffsetTop + ` / ` + pinOffsetLeft;*/
      window.map.setAddress(pinOffsetLeft, pinOffsetTop);


      if (pinOffsetTop > window.data.mapBottomBorder) {
        window.map.mainPin.style.top = window.data.mapBottomBorder + `px`;
      } else if (pinOffsetTop < window.data.mapTopBorder) {
        window.map.mainPin.style.top = window.data.mapTopBorder + `px`;
      } else if (pinOffsetLeft < window.data.mapLeftBorder) {
        window.map.mainPin.style.left = window.data.mapLeftBorder + `px`;
      } else if (pinOffsetLeft > window.data.mapRightBorder) {
        window.map.mainPin.style.left = window.data.mapRightBorder + `px`;
      }

    }


    function mouseUpShift(upE) {
      upE.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveShift);
      document.removeEventListener(`mouseup`, mouseUpShift);


      let top = Number(window.map.mainPin.style.top.slice(0, -2));
      let left = Number(window.map.mainPin.style.left.slice(0, -2));

    }

    document.addEventListener(`mousemove`, mouseMoveShift);
    document.addEventListener(`mouseup`, mouseUpShift);
  });
})();
