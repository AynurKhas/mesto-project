import '../pages/index.css';
import { initialCards, addCard, renderCardToEnd } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, сheckInputs } from "./validate.js";
import { initProfile, getInitialCards, profileEditing, addCardtToServer, editAvatarFromServer } from "./api.js"
import { renderLoading } from "./utils";

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
const profileAvatar = document.querySelector('.profile__avatar');
const avatarEdit = document.querySelector('.profile__link-avatar');
const popupAvatarEdit = document.querySelector('.popup_avatarEdit');
const formAvatarEdit = document.querySelector('.form_avatarEdit');
const formAvatarEditInput = document.querySelector('.form__avatarEdit-input');


const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

//--------------------------------------------нажатие на аватар
avatarEdit.addEventListener('click', () => {
  openPopup(popupAvatarEdit);
  сheckInputs(formAvatarEdit, validationObject);
})

//--------------------------------------------сохранение нового аватара профиля
formAvatarEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(formAvatarEdit, true);
  editAvatarFromServer(formAvatarEditInput.value)
    .then((result) => {
      console.log(result);
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
      renderLoading(formAvatarEdit, false);
  })
  closePopup();
})

// ------------------------------------------- Кнопка Редактирование профиля
btnProfileAdd.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  formUserName.value = userName.textContent;
  formUserProfession.value = userProfession.textContent;
  сheckInputs(formAddProfile, validationObject);
});

// ------------------------------------------- Кнопка добавления места
btnPlaceAdd.addEventListener('click', () => {
  openPopup(popupCardAdd);
  сheckInputs(formAddPlace, validationObject);
});

// ------------------------------------------- Кнопка сохранить редактирования профиля
formAddProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(formAddProfile, true);
  profileEditing(formUserName.value, formUserProfession.value)
    .then((result) => {
      userName.textContent = result.name;
      userProfession.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(formAddProfile, false);
    });
  closePopup();
});

// ------------------------------------------- Добавление Места по кнопке +
formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(formAddPlace, true);
  addCardtToServer(formPlace.value, formLinkPlace.value)
    .then((result) => {
      renderCardToEnd(addCard(result));
    })
    .catch((err) => {
      console.log((err));
    })
    .finally(() => {
      renderLoading(formAddPlace, false);
    });
  formAddPlace.reset();
  closePopup();
});


enableValidation(validationObject);

// closeButtons.forEach(btn => {
//   const popup = btn.closest('.popup');
//   btn.addEventListener('click', () => closePopup(popup));
// });

// загрузка данных профиля с сервера
initProfile()
  .then((result) => {
    userName.textContent = result.name;
    userProfession.textContent = result.about;
    profileAvatar.src = result.avatar
  })
  .catch((err) => {
    console.log(err);
  });

//добавление карточек с сервера
getInitialCards()
  .then((result) => {
    initialCards(result);
  })
  .catch((err) => {
    console.log(err);
  });


