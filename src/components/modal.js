import { imagePopupCard, captionPopupCard } from "./constants.js";

export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

 /*  setEventListeners = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  } */

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
    // this._selector.addEventListener('mousedown', this.setEventListeners);
  }

  close() {
    const popupOpen = document.querySelector('.popup_opened');
    if (popupOpen) {
      popupOpen.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._selector.removeEventListener('mousedown', this._handleOverlayBtnClose);
      // this._selector.removeEventListener('mousedown', this.setEventListeners);
    }
  }
}

export class PopupWithImage extends Popup {
  constructor(data, selector) {
    super(selector);
    this._link = data.link;
    this._name = data.name;

  }

  open() {
    imagePopupCard.src = this._link;
    imagePopupCard.alt = this._name;
    captionPopupCard.textContent = this._name;
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
    // this._selector.addEventListener('submit', this._callbackForSetEventListeners);
  }

  close() {
    super.close();
    this._selector.removeEventListener('submit', this._callbackForSetEventListeners);
  }
}

// ___________________________________________________________________________

/*
// ------------------------------------------- Функция открытия
export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  item.addEventListener('mousedown', closeOnClick);
}

// ------------------------------------------- Функция закрытия
export function closePopup() {
  const popupOpen = document.querySelector('.popup_opened');
  if (popupOpen) {
    popupOpen.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscape);
    popupOpen.removeEventListener('mousedown', closeOnClick);
  }
}

// ------------------------------------------- Оверлей и кнопка закрытия попап по клику
function closeOnClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup();
  }
}

// ----------функция закрытия при нажатии esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}
 */
