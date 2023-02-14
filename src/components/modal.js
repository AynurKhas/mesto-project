export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _handleEscClose() {
      if (evt.key === 'Escape') {
        this.close();
      }
  }

  setEventListeners() {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose(evt)); // !!!
    this._selector.addEventListener('mousedown', setEventListeners(evt));   // !!!
  }

  close() {
    const popupOpen = document.querySelector('.popup_opened');
    if (popupOpen) {
      popupOpen.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose(evt));    // !!!
      popupOpen.removeEventListener('mousedown', setEventListeners(evt)); // !!!
    }
  }
}

export class PopupWithImage extends Popup{
  constructor(selector) {
    super(selector);
  }

  open() {
    imagePopupCard.src = object.link; // импорт
    imagePopupCard.alt = object.name; // импорт
    captionPopupCard.textContent = object.name; // импорт
    super.open();
  }
}



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
