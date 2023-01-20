import { openPopup } from "./modal.js";
const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupCard = document.querySelector('.popup_card');
const captionPopupCard = document.querySelector('.popup__card-caption');
const elementsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;
const imagePopupCard = document.querySelector('.popup__card-image');

// ------------------------------------------- Готовая катрочка
export function addCard(formPlaceValue, formLinkPlaceValue) {
  const card = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const cardImage = card.querySelector('.elements__item-image');
  const cardTitle = card.querySelector('.elements__group-title');
  cardTitle.textContent = formPlaceValue;
  cardImage.setAttribute('src', formLinkPlaceValue);
  cardImage.setAttribute('alt', formPlaceValue);
  // ------------------------------------------- кнопка Нравиться
  const btnlike = card.querySelector('.elements__button');
  btnlike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button_active');
  });
  // ------------------------------------------- кнопка удалить
  const elementsTrash = card.querySelector('.elements__trash');
  elementsTrash.addEventListener('click', function () {
    card.remove();
  });
  // ------------------------------------------- попап по нажатию на изображение
  card.querySelector('.elements__item-image').addEventListener('click', () => {
    openPopup(popupCard);
    imagePopupCard.src = formLinkPlaceValue;
    imagePopupCard.alt = formPlaceValue;
    captionPopupCard.textContent = formPlaceValue;
  });

  return card;
}

// ------------------------------------------- Функция добавления в html
export function renderCard(index) {
  elementsContainer.prepend(index);
}
// ------------------------------------------- Добавления карточек из файла card.js
export function initialCards() {
  cards.forEach(function (item) {
    renderCard(addCard(item.name, item.link));
  });
}
