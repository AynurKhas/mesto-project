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
