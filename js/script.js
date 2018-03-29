var body = document.querySelector('body');
var modalButtonOpen = body.querySelector('.contacts__button');
var modal = body.querySelector('.modal');
var modalButtonClose = modal.querySelector('.modal__button');
var modalForm = modal.querySelector('.modal-form');
var modalFieldAll = modalForm.querySelectorAll('.modal-form__field');

var storage = localStorage;

modalButtonOpen.addEventListener('click', function (evt) {

  evt.preventDefault();

  var emptyField = null;

  body.classList.add('modal-open');
  modal.classList.add('modal--open');


  for (var i = 0; i < modalFieldAll.length; i++) {

    if (storage) {
      modalFieldAll[i].value = storage.getItem(modalFieldAll[i].getAttribute('name'));
    }

    if (emptyField === null && !modalFieldAll[i].value) {
      emptyField = modalFieldAll[i];
    }

  }

  emptyField.focus();

});

modalButtonClose.addEventListener('click', function (evt) {

  evt.preventDefault();

  body.classList.remove('modal-open');
  modal.classList.remove('modal--open');

  for (var i = 0; i < modalFieldAll.length - 1; i++) {
    modalFieldAll[i].classList.remove('modal-form__field--invalid');
  }

});

modalForm.addEventListener('submit', function (evt) {

  for (var i = 0; i < modalFieldAll.length - 1; i++) {

    if (!modalFieldAll[i].value) {

      evt.preventDefault();

      modalFieldAll[i].classList.remove('modal-form__field--invalid');
      modal.offsetWidth = modal.offsetWidth;
      modalFieldAll[i].classList.add('modal-form__field--invalid');

      modalFieldAll[i].focus();

      return false;

    } else {

      if (storage) {
        localStorage.setItem(modalFieldAll[i].getAttribute('name'), modalFieldAll[i].value);
      }

    }

  }

});

window.addEventListener("keydown", function (evt) {

  if (evt.keyCode === 27) {

    evt.preventDefault();

    if (modal.classList.contains("modal--open")) {

      body.classList.remove("modal-open");
      modal.classList.remove("modal--open");

      for (var i = 0; i < modalFieldAll.length - 1; i++) {
        modalFieldAll[i].classList.remove('modal-form__field--invalid');
      }

    }

  }

});
