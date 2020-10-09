'use strict';

(function () {

  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (e, action) {
      if (e.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (e, action) {
      if (e.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };

})();
