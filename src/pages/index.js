import '../pages/index.css';
import { Card } from "../components/card.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { api } from "../components/api.js"
import {
  validationObject,
  popupProfileEdit,
  popupCardAdd,
  btnProfileAdd,
  formUserName,
  formUserProfession,
  btnPlaceAdd,
  avatarEdit,
  popupAvatarEdit,
  elementsContainer,
  popupCard,
  imagePopupCard,
  captionPopupCard
} from "../components/constants";
import { handleSubmit } from "../components/submit.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from '../components/UserInfo';

// export let userId;

let infoObject = {};

const card = (item) => new Card({
  data: item,
  handleCardClick: (data) => {
    const popupCardImage = new PopupWithImage(
      data,
      popupCard,
      {image: imagePopupCard,caption: captionPopupCard});
    popupCardImage.open();
  }
},
  handleLikeClickBody,
  handleDeleteCardBody,
  '#card-template');

const cardList = new Section({
  renderer: (item) => {
    const newCard = card(item);
    const cardElement = newCard.generate(infoObject.id);
    cardList.setItem(cardElement);
  }
}, elementsContainer);

const user = new UserInfo({
  name: '.profile__name',
  prof: '.profile__profession',
  avatar: '.profile__avatar'
});
//--------------------------------------инициализация страницы
function initializePage() {

  // ОбЪединенный запрос с сервера(инфо о профиле и карточки)
  Promise.all([api.initProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
      user.initUserInfo(userData.name, userData.about, userData.avatar, userData._id);
      infoObject = user.getUserInfo();
      user.setUserInfo(infoObject.name, infoObject.profession);
      user.setAvatar(infoObject.avatar);

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
  popupClassProfileEdit.setInputValues(infoObject);
/*   formUserName.value = infoObject.name; Исправил, надо удалить
  formUserProfession.value = infoObject.prof; */
  const popupProfileEditFormValidator = new FormValidator({ data: validationObject }, popupProfileEdit);
  popupProfileEditFormValidator.enableValidation();
});

function handleProfileFormSubmit(evt, data) {
  function makeRequest() {
    return api.profileEditing(data['name'], data['profession']).then((userData) => {
      user.setUserInfo(userData.name, userData.about);
      infoObject = user.getUserInfo();
    });
  }
  handleSubmit(makeRequest, evt);
}

//----------------------Кнопка изменения аватара----------------------------
avatarEdit.addEventListener('click', () => {
  const popupAvatar = new PopupWithForm(
    handleEditAvatarSubmit,
    popupAvatarEdit)
  popupAvatar.open();
  const popupAvatarFormValidator = new FormValidator({ data: validationObject }, popupAvatarEdit);
  popupAvatarFormValidator.enableValidation();
})

function handleEditAvatarSubmit(evt, data) {
  function makeRequest() {
    return api.editAvatarFromServer(data['input-avatarEdit']).then((data) => {
    user.setAvatar(data.avatar);
    infoObject = user.getUserInfo();
  });
}
  handleSubmit(makeRequest, evt)
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
      const newCard = card(result);
      const cardElement = newCard.generate(infoObject.id);
      cardList.setItem(cardElement);
      // добавить close()
    })
    .catch((err) => {
      console.log((err));
    });
  }
  handleSubmit(makeRequest, evt);
}

initializePage();





