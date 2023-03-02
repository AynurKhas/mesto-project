export class Popup {
  constructor(elementInDom) {
    this._elementInDom = elementInDom;
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
    this._elementInDom.addEventListener('mousedown', this._handleOverlayBtnClose);
  }

  _setEventListeners() {
    this._elementInDom.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  _removeEventListeners() {
    this._elementInDom.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._elementInDom.removeEventListener('mousedown', this._handleOverlayBtnClose);
  }

  open() {
    this._setEventListeners();
  }

  close() {
    this._removeEventListeners();
  }
}
