import { enableValidation } from "./validate.js";

// const popups = document.querySelectorAll('.popup');
// ------------------------------------------- Функция открытия
export function openPopup(item) {
  enableValidation();
  item.classList.add('popup_opened');
  document.addEventListener('keydown', function (evt) {
    keydownEsc(evt, item);
  })
  item.addEventListener('click', function (evt) {
    closeOnClick(evt, item);
  })
}

// ------------------------------------------- Функция закрытия
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', function (evt) {
    keydownEsc(evt, item);
  })
  popup.removeEventListener('click', function (evt) {
    closeOnClick(evt, popup);
  })
}

// ------------------------------------------- Кнопка закрытия попап по клику

function closeOnClick(evt, item) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(item);
  }
}

// ----------функция закрытия при нажатии esc

function keydownEsc (evt, item) {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  }
