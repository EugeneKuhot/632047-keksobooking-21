'use strict';

(function () {
  const SERVER_URL = `https://21.javascript.pages.academy/keksobooking`;
  const MAX_TIME = 10000;

  const STATUS_OK = 200;

  function setup(onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ошибки: ` + xhr.status + `` `` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = MAX_TIME;
    return xhr;
  }

  function load(onSuccess, onError) {
    const xhr = setup(onSuccess, onError);
    xhr.open(`GET`, SERVER_URL + `/data`);
    xhr.send();
    return xhr;
  }

  function upload(data, onSuccess, onError) {
    const xhr = setup(onSuccess, onError);
    xhr.open(`POST`, SERVER_URL);
    xhr.send(data);
  }


  window.ajax = {
    load: load,
    upload: upload
  };

})();
