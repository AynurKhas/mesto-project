const closeButtons = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_profileAdd');
const popupCardAdd = document.querySelector('.popup_cardAdd');
const btnProfileAdd = document.querySelector('.profile__edit-link');
const formUserName = document.querySelector('.form__name');
const formUserProfession = document.querySelector('.form__profession');
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const btnPlaceAdd = document.querySelector('.profile__add-link');
const cardTemplate = document.querySelector('#card-template').content;
const elementsContainer = document.querySelector('.elements__list');
const formPlace = document.querySelector('.form__place');
const formLinkPlace = document.querySelector('.form__link-place');
const btnSubmitAddProfile = document.querySelector('.form_add-profile');
const popupCard = document.querySelector('.popup_card');
const btnSubmitAddPlace = document.querySelector('.form_add-place');

// ------------------------------------------- Функция открытия
function openPopup(item) {
  item.classList.add('popup_opened');
}
// ------------------------------------------- Кнопка Редактирование профиля
btnProfileAdd.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  formUserName.value = userName.textContent;
  formUserProfession.value = userProfession.textContent;
});
// ------------------------------------------- Кнопка добавления места
btnPlaceAdd.addEventListener('click', () => {
  openPopup(popupCardAdd);
});
// ------------------------------------------- Функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// ------------------------------------------- Кнопка закрытия попап
closeButtons.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

// ------------------------------------------- Кнопка сохранить редактирования профиля
btnSubmitAddProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = formUserName.value;
  userProfession.textContent = formUserProfession.value;
  closePopup(popupProfileEdit);
});

// ------------------------------------------- Готова катрочка
function addCard(formPlaceValue, formLinkPlaceValue) {
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
    document.querySelector('.popup__card-image').src = formLinkPlaceValue;
    document.querySelector('.popup__card-image').alt = formPlaceValue;
    document.querySelector('.popup__card-caption').textContent = formPlaceValue;
  });

  return card;
}

// ------------------------------------------- Функция добавления в html
function renderCard(index) {
  elementsContainer.prepend(index);
}

// ------------------------------------------- Добавления карточек из файла card.js
initialCards.forEach(function (item) {
  renderCard(addCard(item.name, item.link));
});

// ------------------------------------------- Добавление Места по кнопке +
btnSubmitAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(addCard(formPlace.value, formLinkPlace.value));
  btnSubmitAddPlace.reset();
  closePopup(popupCardAdd);
});
