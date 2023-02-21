import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(data, selector, selectorInputs) {
    super(selector);
    this._link = data.link;
    this._name = data.name;
    this._inputSelectorImage = selectorInputs.image,
    this._inputSelectorCaption = selectorInputs.caption
  }

  open() {
    this._inputSelectorImage.src = this._link;
    this._inputSelectorImage.alt = this._name;
    this._inputSelectorCaption.textContent = this._name;
    super.open();
  }
}

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

  _callbackForSetEventListeners = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(evt, this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', this._callbackForSetEventListeners);
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._selector.removeEventListener('submit', this._callbackForSetEventListeners);
  }
}
