
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
