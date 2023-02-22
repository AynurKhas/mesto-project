import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(callbackSubmit, selector) {
    super(selector);
    this._callbackSubmit = callbackSubmit;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._selector.querySelectorAll('.form__item').forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _callbackForSetEventListeners = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(evt, this._getInputValues());
    this.close(); // Надо убрать, так как закрыаться должно после ответа сервера
  };

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', this._callbackForSetEventListeners);
  }

  open() {
    super.open();
   }

  close() {
    super.close();
    this._selector.removeEventListener('submit', this._callbackForSetEventListeners);
    this._selector.querySelector('.form').reset(); // Очищение формы нужно оформить через метод reset
  }
}
