
// ------------------------------------------- Функция открытия
export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEsc);
  item.addEventListener('click', closeOnClick);
}

// ------------------------------------------- Функция закрытия
export function closePopup() {
  const popupOpen = document.querySelector('.popup_opened');
  popupOpen.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEsc);
  popupOpen.removeEventListener('keydown', closeOnClick);
}

// ------------------------------------------- Оверлей и кнопка закрытия попап по клику
function closeOnClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup();
  }
}

// ----------функция закрытия при нажатии esc
function keydownEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}
