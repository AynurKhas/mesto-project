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
    const cardElement = card.generate(user.id);
    cardList.setItem(cardElement);
  }
}, elementsContainer);

const user = new UserInfo( {
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
      user.getUserInfo(userData.name,userData.about,userData.avatar,userData._id);

      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleLikeClickBody(cardElement,status) {
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

function handleDeleteCardBody(cardElement){
  api.deleteCard(cardElement._id)
  .then(() => {
    cardElement.deleteCard();
  })
  .catch((err) => {
    console.log((err));
  });
}

//--------------------------------------------нажатие на аватар
avatarEdit.addEventListener('click', () => {
  const popupAvatar = new PopupWithForm(popupAvatarEdit)
  // openPopup(popupAvatarEdit);
  popupAvatar.open();
  //сheckInputs(formAvatarEdit, validationObject);
})

btnProfileAdd.addEventListener('click', () => {
  openPopup(popupProfileEdit);   
  formUserName.value = user.name;
  formUserProfession.value = user.prof;
  //сheckInputs(formAddProfile, validationObject);
});

function setUserInfoBody(name,prof){
  return api.profileEditing(name, prof).then((userData) => {
    user.putUserInfo(userData.name,userData.about);
  });
}

function setAvatarBody(avatar){
  return api.editAvatarFromServer(avatar).then((data) => {
    user.putAvatar(data.avatar);
  });
}

formAddProfile.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
})
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return user.setUserInfo(formUserName.value, formUserProfession.value);
  }
  handleSubmit(makeRequest, evt);
}

formAvatarEdit.addEventListener('submit', (evt) => {
  handleeditAvatarSubmit(evt);
})

function handleeditAvatarSubmit(evt) {
  function makeRequest() {
    return user.setAvatar(formAvatarEditInput.value);
  }
  handleSubmit(makeRequest, evt)
}
/*
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

enableValidation(validationObject); */
initializePage();





