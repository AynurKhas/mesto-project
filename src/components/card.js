import { openPopup } from "./modal.js";
import { checkWhoOwns, checkMyLikes, deleteCardHtml, noteLike, removeLike } from "./utils";

const popupCard = document.querySelector('.popup_card');
const captionPopupCard = document.querySelector('.popup__card-caption');
const elementsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;
const imagePopupCard = document.querySelector('.popup__card-image');
// const popupDelete = document.querySelector('.popup_delete');
// const formDelete = document.querySelector('.form_delete');
// const cards = document.querySelectorAll('.elements__list-item');

// ------------------------------------------- Создание карточки
export function addCard(object) {
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

  btnlike.addEventListener('click', function (evt) {
    const likeButton = evt.target.classList.toggle('elements__button_active');
    likeButton === true
      ? noteLike(object._id, cardLikeCounter)
      :removeLike(object._id, cardLikeCounter)
  });
  // ------------------------------------------- кнопка удалить
  const elementsTrash = card.querySelector('.elements__trash');
  if (!checkWhoOwns(object.owner._id)) {
    elementsTrash.classList.add('elements__trash_disabled');
    elementsTrash.setAttribute("disabled", true);
  }

  elementsTrash.addEventListener('click', function () {
    deleteCardHtml(card, object._id);
  })
  // ------------------------------------------- попап по нажатию на изображение
  card.querySelector('.elements__item-image').addEventListener('click', () => {
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
export function initialCards(object) {
  object.reverse().forEach(function (item) {
    renderCard(addCard(item));
  });
}
