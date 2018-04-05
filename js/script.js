var body = document.querySelector('body');
var modalButtonOpen = body.querySelector('.contacts__button');
var modal = body.querySelector('.modal');
var modalButtonClose = modal.querySelector('.modal__button');
var modalForm = modal.querySelector('.modal-form');
var modalFieldAll = modalForm.querySelectorAll('.modal-form__field');
var noJs = body.querySelector('.no-js');
var map = body.querySelector('.contacts__map-link');
var sliderButton = body.querySelector('.slider__buttons');

var storage = localStorage;

noJs.classList.remove('no-js');
map.classList.add('contacts__map-link--hide');

if (sliderButton) {

  sliderButton.addEventListener('click', function (evt) {

    var target = evt.target;

    if (target.classList.contains('slider__button-control--current') || !target.classList.contains('slider__button-control')) {
      return false;
    }

    var buttonCurrent = body.querySelector('.slider__button-control--current');
    var sliderItem = body.querySelector('.slider__item--show');

    var dataValue = target.getAttribute('data-value');
    var currentItem = body.querySelector('.slider__item--bg-' + dataValue);

    target.classList.add('slider__button-control--current');
    buttonCurrent.classList.remove('slider__button-control--current');

    sliderItem.classList.remove('slider__item--show');
    currentItem.classList.add('slider__item--show');

  });

}

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

window.addEventListener('keydown', function (evt) {

  if (evt.keyCode === 27) {

    evt.preventDefault();

    if (modal.classList.contains('modal--open')) {

      body.classList.remove('modal-open');
      modal.classList.remove('modal--open');

      for (var i = 0; i < modalFieldAll.length - 1; i++) {
        modalFieldAll[i].classList.remove('modal-form__field--invalid');
      }

    }

  }

});
