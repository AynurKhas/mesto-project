import '../pages/index.css';
import { initialCards, addCard, renderCard } from "./card.js";
import { openPopup } from "./modal.js";
import { enableValidation, сheckInputs } from "./validate.js";
import { initProfile, getInitialCards, profileEditing, addCardtToServer, editAvatarFromServer,api } from "./api.js"
import {
  validationObject,
  popupProfileEdit,
  popupCardAdd,
  btnProfileAdd,
  formUserName,
  formUserProfession,
  userName,
  userProfession,
  btnPlaceAdd,
  formPlace,
  formLinkPlace,
  formAddProfile,
  formAddPlace,
  profileAvatar,
  avatarEdit,
  popupAvatarEdit,
  formAvatarEdit,
  formAvatarEditInput
} from "./constants";
import { handleSubmit } from "./submit.js";

export let userId;
//--------------------------------------инициализация страницы
function initializePage() {

  // ОбЪединенный запрос с сервера(инфо о профиле и карточки)
  Promise.all([api.initProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userName.textContent = userData.name;
      userProfession.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      userId = userData._id;

      initialCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};
//--------------------------------------------нажатие на аватар
avatarEdit.addEventListener('click', () => {
  openPopup(popupAvatarEdit);
  сheckInputs(formAvatarEdit, validationObject);
})

//--------------------------------------------сохранение нового аватара профиля
formAvatarEdit.addEventListener('submit', (evt) => {
  handleeditAvatarSubmit(evt);
})

function handleeditAvatarSubmit(evt) {
  function makeRequest() {
    return api.editAvatarFromServer(formAvatarEditInput.value).then((result) => {
      profileAvatar.src = result.avatar;
    })
  }
  handleSubmit(makeRequest, evt)
}

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
  handleProfileFormSubmit(evt);
})
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api.profileEditing(formUserName.value, formUserProfession.value).then((userData) => {
      userName.textContent = userData.name;
      userProfession.textContent = userData.about;
    });
  }
  handleSubmit(makeRequest, evt);
}

// ------------------------------------------- Добавление Места по кнопке +
formAddPlace.addEventListener('submit', (evt) => {
  handleAddCardFormSubmit(evt);
})

/* ..рабочий, старая версия
  formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(formAddPlace, true);
  addCardtToServer(formPlace.value, formLinkPlace.value)
    .then((result) => {
      renderCard(addCard(result));
      formAddPlace.reset();
      closePopup();
    })
    .catch((err) => {
      console.log((err));
    })
    .finally(() => {
      renderLoading(formAddPlace, false);
    });
});
*/

function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return api.addCardtToServer(formPlace.value, formLinkPlace.value).then((result) => {
      renderCard(addCard(result));
      formAddPlace.reset();
    })
  }
  handleSubmit(makeRequest, evt);
}

//---------------------
initializePage();
enableValidation(validationObject);






