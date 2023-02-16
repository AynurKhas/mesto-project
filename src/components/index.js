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
    const cardElement = card.generate(userId);
    cardList.setItem(cardElement);
  }
}, elementsContainer);

//--------------------------------------инициализация страницы
function initializePage() {

  // ОбЪединенный запрос с сервера(инфо о профиле и карточки)
  Promise.all([api.initProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userName.textContent = userData.name;
      userProfession.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      userId = userData._id;

      cardList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
};

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

function handleDeleteCardBody(cardElement) {
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
  const popupAvatar = new PopupWithForm({
    callbackSubmit: () => {

    }
  },
    popupAvatarEdit)
  popupAvatar.open();
  const popupAvatarFormValidator = new FormValidator({ data: validationObject }, popupAvatarEdit);
  popupAvatarFormValidator.enableValidation();

  // сheckInputs(formAvatarEdit, validationObject);
})
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
*/

// ------------------------------------------- Кнопка Редактирование профиля
btnProfileAdd.addEventListener('click', () => {
  const popupClassProfileEdit = new PopupWithForm({
    callbackSubmit: () => {

    }
  }, popupProfileEdit);
  popupClassProfileEdit.open();
  const popupProfileEditFormValidator = new FormValidator({ data: validationObject }, popupProfileEdit);
  popupProfileEditFormValidator.enableValidation();
  // formUserName.value = userName.textContent;
  // formUserProfession.value = userProfession.textContent;
  // сheckInputs(formAddProfile, validationObject);
});

// ------------------------------------------- Кнопка добавления места
btnPlaceAdd.addEventListener('click', () => {
  const popupAddPlace = new PopupWithForm({
    callbackSubmit: () => {

    }
  }, popupCardAdd);
  popupAddPlace.open();
  const popupAddPlaceFormValidator = new FormValidator({ data: validationObject }, popupCardAdd);
  popupAddPlaceFormValidator.enableValidation();
  // сheckInputs(formAddPlace, validationObject);
});
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





