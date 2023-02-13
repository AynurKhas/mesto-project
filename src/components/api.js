class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //ответ от сервера
  checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // универсальную функцию запроса с проверкой ответа
  request(url, options) {
    return fetch(url, options).then(this.checkResponse)
  }

  // запрос Профиля
  initProfile = () => {
    return this.request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  // запрос карт
  getInitialCards = () => {
    return this.request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  // отправка отредактированного профиля
  profileEditing = (name, about) => {
    return this.request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
  }

  // запрос на добавление карточки
  addCardtToServer = (name, link) => {
    return this.request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  //добавление лайка
  addLike = (cardId) => {
    return this.request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
  }
  //удаление лайка
  deleteLike = (cardId) => {
    return this.request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  //редактирование аватара
  editAvatarFromServer = (avatar) => {
    return this.request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  //удаление карты
  deleteCard = (cardId) => {
    return this.request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '5784ac4e-76e4-4775-b04c-58134d3f0004',
    'Content-Type': 'application/json'
  }
});


/* const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '5784ac4e-76e4-4775-b04c-58134d3f0004',
    'Content-Type': 'application/json'
  }
} */


