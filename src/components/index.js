import '../pages/index.css';
import { initialCards, addCard, renderCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";

// const closeButtons = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_profileAdd');
const popupCardAdd = document.querySelector('.popup_cardAdd');
const btnProfileAdd = document.querySelector('.profile__edit-link');
const formUserName = document.querySelector('.form__name');
const formUserProfession = document.querySelector('.form__profession');
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const btnPlaceAdd = document.querySelector('.profile__add-link');
const formPlace = document.querySelector('.form__place');
const formLinkPlace = document.querySelector('.form__link-place');
const formAddProfile = document.querySelector('.form_add-profile');
const formAddPlace = document.querySelector('.form_add-place');


// ------------------------------------------- Кнопка Редактирование профиля
btnProfileAdd.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  formUserName.value = userName.textContent;
  formUserProfession.value = userProfession.textContent;
  enableValidation();
});
// ------------------------------------------- Кнопка добавления места
btnPlaceAdd.addEventListener('click', () => {
  openPopup(popupCardAdd);
  enableValidation();
});

// ------------------------------------------- Кнопка сохранить редактирования профиля
formAddProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = formUserName.value;
  userProfession.textContent = formUserProfession.value;
  // closePopup(popupProfileEdit);
});

// ------------------------------------------- Добавление Места по кнопке +
formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(addCard(formPlace.value, formLinkPlace.value));
  formAddPlace.reset();
  closePopup(popupCardAdd);
});

initialCards();

// closeButtons.forEach(btn => {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', () => closePopup(popup));
// });
