import { openPopup, PopupWithImage, Popup } from "./modal.js";
import { deleteCard, addLike, deleteLike, api } from "./api.js";
import { checkMyLikes } from "./utils.js";
import {
  popupCard,
  captionPopupCard,
  elementsContainer,
  cardTemplate,
  imagePopupCard
} from "./constants.js";
import { userId, popupCardImage } from "./index.js";
import { data } from "autoprefixer";


//------------------------------------------------------------------------
export class Card {
  constructor({ data, handleCardClick }, handleLikeClick,selector) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);

    return cardElement;
  }
  _checkMyLikes(userId){ //Проверка во время загрузки карточек активен ли лайк
    return this._likes.some((likeId) => {
      if (likeId._id === userId) {
        return true
      }
    })
  }

  _isActiveLike() { //Проверка активен ли лайк
      if (this._btnlike.classList.contains('elements__button_active')) {
      return true;
    } else {
      return false;
    }
  }

  _setEventListeners() {
    this._btnlike.addEventListener('click', () => {
      this._handleLikeClick(this,this._isActiveLike());
    });
    this._element.querySelector('.elements__item-image').addEventListener('click', () => {
      this._handleCardClick(this.data);
    });
  }

  generate(userId) {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.elements__item-image');
    this._cardTitle = this._element.querySelector('.elements__group-title');
    this._btnlike = this._element.querySelector('.elements__button');
    this._cardLikeCounter = this._element.querySelector('.elements__like-counter');
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardTitle.setAttribute('alt', this._name);
    this._cardLikeCounter.textContent = this._likes.length;

    //активируем лайк при загрузке
    if (this._checkMyLikes(userId)) {
      this._btnlike.classList.add('elements__button_active');
    }
    this._setEventListeners();

    return this._element;
  }


 /*  _setEventListeners() {
    this._element.querySelector('.elements__item-image').addEventListener('click', () => {
      this._handleCardClick(this.data);
    });
  } */

  /* _handleOpenPopup () {
    popupImage.src = this._image;
    popupElement.classList.add('popup_is-opened');

  }
 */
  /*
  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_is-opened');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  } */
}
//------------------------------------------------------------------------
/*
// ------------------------------------------- Создание карточки
/* export function addCard(object) {
  const card = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const cardImage = card.querySelector('.elements__item-image');
  const cardTitle = card.querySelector('.elements__group-title');
  const cardLikeCounter = card.querySelector('.elements__like-counter')
  cardTitle.textContent = object.name;
  cardImage.setAttribute('src', object.link);
  cardImage.setAttribute('alt', object.name);
  cardLikeCounter.textContent = object.likes.length;

  // ------------------------------------------- кнопка Нравиться
  const btnlike = card.querySelector('.elements__button');
  //проверка наличия отмеченного мною лайка при открытии страницы
  if (checkMyLikes(object.likes)) {
    btnlike.classList.add('elements__button_active');
  }

  btnlike.addEventListener('click', clickLikeBtn);
  function clickLikeBtn(evt) {
    const LikeButtonStatus = evt.target.classList.contains('elements__button_active');
    LikeButtonStatus === true
      ? removeLike(object._id, cardLikeCounter, evt) //console.log('убрать')
      : likeCard(object._id, cardLikeCounter, evt) //console.log('покрасить')
  }

  // клик по кнопке лайк нравиться
  function likeCard(id, counter, evt) {
    api.addLike(id).then((result) => {
      counter.textContent = result.likes.length;
      evt.target.classList.add('elements__button_active');
    })
      .catch((err) => {
        console.log((err));
      });
  }

  // клик по кнопке лайк убрать нравиться
  function removeLike(id, counter, evt) {
    api.deleteLike(id).then((result) => {
      counter.textContent = result.likes.length;
      evt.target.classList.remove('elements__button_active');
    })
      .catch((err) => {
        console.log((err));
      });
  }

  // ------------------------------------------- кнопка удалить
  const elementsTrash = card.querySelector('.elements__trash');
  if (userId !== object.owner._id) {
    elementsTrash.classList.add('elements__trash_disabled');
    elementsTrash.setAttribute("disabled", true);
  }

  elementsTrash.addEventListener('click', function () {
    deleteCardHtml(card, object._id);
  })


  //--------------------------удаление катрочки из html по кнопке удалить
  function deleteCardHtml(card, id) {
    api.deleteCard(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log((err));
      });
  }
  // ------------------------------------------- попап по нажатию на изображение
  cardImage.addEventListener('click', () => {
    openPopup(popupCard);
    imagePopupCard.src = object.link;
    imagePopupCard.alt = object.name;
    captionPopupCard.textContent = object.name;
  });

  return card;
}

// ------------------------------------------- Функция добавления в html
export function renderCard(index) {
  elementsContainer.prepend(index);
}


// ------------------------------------------- Добавления карточек из файла сервера
export function initialCards(cardList) {
  cardList.reverse().forEach(function (item) {
    renderCard(addCard(item));
  });
} */
