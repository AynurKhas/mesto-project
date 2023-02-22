import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(callbackSubmit, elementInDom) {
    super(elementInDom);
    this._callbackSubmit = callbackSubmit;
    this._elementInDom = elementInDom;
    this._inputList = this._elementInDom.querySelectorAll('.form__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _callbackForSetEventListeners = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(evt, this._getInputValues());
    // this.close(); // Надо убрать, так как закрываться должно после ответа сервера
  };

  setEventListeners() {
    super.setEventListeners();
    this._elementInDom.addEventListener('submit', this._callbackForSetEventListeners);
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._elementInDom.removeEventListener('submit', this._callbackForSetEventListeners);
    this._elementInDom.querySelector('.form').reset(); // Очищение формы нужно оформить через метод reset
  }
}
