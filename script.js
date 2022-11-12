const popup = document.querySelectorAll('.popup');
const popupClose = document.querySelectorAll('.popup__close');

const popupProfileAdd = document.querySelector('.popup_profileAdd');
const popupCardAdd = document.querySelector('.popup_cardAdd');

const profileEdit = document.querySelector('.profile__edit-link');
const formName = document.querySelector('.form__name');
const formProfession = document.querySelector('.form__profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// const popupProfile = document.querySelector('.popup_profile');

const profileAdLink = document.querySelector('.profile__add-link');
// const popupAddPlace = document.querySelector('.popup_add-place');

const cardTemplate = document.querySelector('#card-template').content;
const elementsList = document.querySelector('.elements__list');

const elementsItemImage = cardTemplate.querySelector('.elements__item-image');
const elementsGroupTitle = cardTemplate.querySelector('.elements__group-title');

const formPlace = document.querySelector('.form__place');
const formLinkPlace = document.querySelector('.form__link-place');

const formAddProfile = document.querySelector('.form_add-profile');


// import {initialCards} from "./card"
const initialCards = [
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



// open

function open(item) {
  item.classList.add('popup_opened');
}

profileEdit.addEventListener('click', () => {
  open(popupProfileAdd);
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
});

profileAdLink.addEventListener('click', () => {
  open(popupCardAdd);
});


// close

function close() {
  popup.forEach((item) => {
    item.classList.remove('popup_opened');
  });
}

popupClose.forEach((item) => {
  item.addEventListener('click', close);
});


formAddProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  close();
});


function addCard(formPlaceValue, formLinkPlaceValue) {
  elementsGroupTitle.textContent = formPlaceValue;
  elementsItemImage.setAttribute('src', formLinkPlaceValue);
  const elementsListItem = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
  const elementsButton = elementsListItem.querySelector('.elements__button');

  elementsButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button_active');
  });
  const elementsTrash = elementsListItem.querySelector('.elements__trash');
  elementsTrash.addEventListener('click', function () {
    elementsListItem.remove();
  });
  elementsList.prepend(elementsListItem);
  const popupCard = document.querySelector('.popup_card');
  elementsListItem.querySelector('.elements__item-image').addEventListener('click', () => {
    open(popupCard);
    document.querySelector('.popup__card-image').src = elementsListItem.querySelector('.elements__item-image').getAttribute('src');
    document.querySelector('.popup__card-caption').textContent = elementsListItem.querySelector('.elements__group-title').textContent;
    document.querySelector('.popup_card').style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  });
}

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});

const formAddPlace = document.querySelector('.form_add-place');
formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(formPlace.value, formLinkPlace.value);
  formPlace.value = '';
  formLinkPlace.value = '';
  close();
});


