import { enableValidation } from "./validate.js";


const popups = document.querySelectorAll('.popup');
// ------------------------------------------- Функция открытия
export function openPopup(item) {
  item.classList.add('popup_opened');
  enableValidation();
}

// ------------------------------------------- Функция закрытия
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// ------------------------------------------- Кнопка закрытия попап
popups.forEach(element => {
  element.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      // element.querySelector('.form').reset();
      closePopup(element);
    }
  })
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(element);
    }
  })
})
