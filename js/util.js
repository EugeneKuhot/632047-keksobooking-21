'use strict';

(function () {

  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  function renderErrorMessage() {
    const message = document.createElement(`div`);
    message.classList.add(`error-message`);
    message.textContent = `Произошла неизвестная ошибка. Пожалуйста, обновите страницу.`;
    document.body.insertAdjacentElement(`afterbegin`, message);
  }

  function isEscEvent(e, action) {
    if (e.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  function isEnterEvent(e, action) {
    if (e.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    renderErrorMessage: renderErrorMessage
  };

})();
