import '../pages/index.css';
import { initialCards, addCard, renderCard, Card } from "./card.js";
import { openPopup, PopupWithImage, PopupWithForm } from "./modal.js";
import { enableValidation, сheckInputs } from "./validate.js";
import { initProfile, getInitialCards, profileEditing, addCardtToServer, editAvatarFromServer, api } from "./api.js"
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
  formAvatarEditInput,
  elementsContainer,
  popupCard
} from "./constants";
import { handleSubmit } from "./submit.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from './UserInfo';

export let userId;
// let cardData;

const cardList = new Section({
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (data) => {
        const popupCardImage = new PopupWithImage(data, popupCard);
        popupCardImage.open();
      }
    },
      handleLikeClickBody,
      handleDeleteCardBody,
      '#card-template');
    const cardElement = card.generate(user.getUserInfo().id);
    cardList.setItem(cardElement);
  }
}, elementsContainer);

const user = new UserInfo({
  name: '.profile__name',
  prof: '.profile__profession',
  avatar: '.profile__avatar'
},
  setUserInfoBody,
  setAvatarBody
);
//--------------------------------------инициализация страницы
function initializePage() {

  // ОбЪединенный запрос с сервера(инфо о профиле и карточки)
  Promise.all([api.initProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.initUserInfo(userData.name, userData.about, userData.avatar, userData._id);
      user.putUserInfo(userData.name, userData.about);
      user.putAvatar(userData.avatar);

      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};

//-------------CallBack клика лайка, взаимодействие с api
function handleLikeClickBody(cardElement, status) {
  if (status) {
    api.deleteLike(cardElement._id).then((res) => {
      cardElement.removeLike(res.likes.length);
    })
      .catch((err) => {
        console.log((err));
      });
  } else {
    api.addLike(cardElement._id).then((res) => {
      cardElement.addLike(res.likes.length);
    })
      .catch((err) => {
        console.log((err));
      });
  }
}
//-------------CallBack клика удаления карточки, взаимодействие с api
function handleDeleteCardBody(cardElement) {
  api.deleteCard(cardElement._id)
    .then(() => {
      cardElement.deleteCard();
    })
    .catch((err) => {
      console.log((err));
    });
}

// ------------------------------------------- Кнопка Редактирование профиля
btnProfileAdd.addEventListener('click', () => {
  const popupClassProfileEdit = new PopupWithForm(
    handleProfileFormSubmit,
    popupProfileEdit);

  popupClassProfileEdit.open();
  formUserName.value = user.getUserInfo().name;
  formUserProfession.value = user.getUserInfo().prof;
  const popupProfileEditFormValidator = new FormValidator({ data: validationObject }, popupProfileEdit);
  popupProfileEditFormValidator.enableValidation();
  // formUserName.value = userName.textContent;
  // formUserProfession.value = userProfession.textContent;
  // сheckInputs(formAddProfile, validationObject);
});

function handleProfileFormSubmit(evt, data) {
  function makeRequest() {
    return user.setUserInfo(data['name'], data['profession']);
  }
  handleSubmit(makeRequest, evt);
}

function setUserInfoBody(name, prof) {
  return api.profileEditing(name, prof).then((userData) => {
    user.putUserInfo(userData.name, userData.about);
  });
}
//----------------------Кнопка изменения аватара----------------------------
avatarEdit.addEventListener('click', () => {
  const popupAvatar = new PopupWithForm(
    handleEditAvatarSubmit,
    popupAvatarEdit)
  popupAvatar.open();
  const popupAvatarFormValidator = new FormValidator({ data: validationObject }, popupAvatarEdit);
  popupAvatarFormValidator.enableValidation();

  // //сheckInputs(formAvatarEdit, validationObject);
})

function handleEditAvatarSubmit(evt, data) {
  function makeRequest() {
    return user.setAvatar(data['input-avatarEdit']);
  }
  handleSubmit(makeRequest, evt)
}

function setAvatarBody(avatar) {
  return api.editAvatarFromServer(avatar).then((data) => {
    user.putAvatar(data.avatar);
  });
}

// ------------------------------------------- Кнопка добавления места
btnPlaceAdd.addEventListener('click', () => {
  const popupAddPlace = new PopupWithForm(
    handlebtnPlaceAddSubmit,
    popupCardAdd);
  popupAddPlace.open();
  const popupAddPlaceFormValidator = new FormValidator({ data: validationObject }, popupCardAdd);
  popupAddPlaceFormValidator.enableValidation();

});
function handlebtnPlaceAddSubmit(evt, data) {
  function makeRequest() {
    return api.addCardtToServer(data['place'], data['link-place']).then((result) => {
      const card = new Card({
        data: result,
        handleCardClick: (data) => {
          const popupCardImage = new PopupWithImage(data, popupCard);
          popupCardImage.open();
        }
      },
        handleLikeClickBody,
        handleDeleteCardBody,
        '#card-template');
      const cardElement = card.generate(user.getUserInfo().id);
      cardList.setItem(cardElement);
    })
    .catch((err) => {
      console.log((err));
    });
  }
  handleSubmit(makeRequest, evt);
}
/*
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
/*
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
*/
initializePage();





