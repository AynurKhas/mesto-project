export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayBtnClose = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', this._handleOverlayBtnClose);
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    const popupOpen = document.querySelector('.popup_opened');
    if (popupOpen) {
      popupOpen.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._selector.removeEventListener('mousedown', this._handleOverlayBtnClose);
    }
  }
}

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

// ___________________________________________________________________________

