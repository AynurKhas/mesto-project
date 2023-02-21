//------------------------------------------------------------------------
export class Card {
  constructor({ data, handleCardClick }, handleLikeClick, handleDeleteClick,selector) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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

  addLike(qty){
    this._cardLikeCounter.textContent = qty;
    this._btnlike.classList.add('elements__button_active');
  }

  removeLike(qty){
    this._cardLikeCounter.textContent = qty;
    this._btnlike.classList.remove('elements__button_active');
  }

  deleteCard(){
    this._element.remove();
  }

  _setEventListeners() {
    this._btnlike.addEventListener('click', () => {
      this._handleLikeClick(this,this._isActiveLike());
    });
    this._element.querySelector('.elements__item-image').addEventListener('click', () => {
      this._handleCardClick(this.data);
    });
    this._cardTrashButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  generate(userId) {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.elements__item-image');
    this._cardTitle = this._element.querySelector('.elements__group-title');
    this._btnlike = this._element.querySelector('.elements__button');
    this._cardLikeCounter = this._element.querySelector('.elements__like-counter');
    this._cardTrashButton = this._element.querySelector('.elements__trash');
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardTitle.setAttribute('alt', this._name);
    this._cardLikeCounter.textContent = this._likes.length;

    //активируем лайк при загрузке
    if (this._checkMyLikes(userId)) {
      this._btnlike.classList.add('elements__button_active');
    }
        //активируем кнопку удалений карточки
    if (userId !== this._ownerId) {
      this._cardTrashButton.classList.add('elements__trash_disabled');
      this._cardTrashButton.setAttribute("disabled", true);
    }
    this._setEventListeners();

    return this._element;
  }
}
