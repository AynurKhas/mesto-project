const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '5784ac4e-76e4-4775-b04c-58134d3f0004',
    'Content-Type': 'application/json'
  }
}

//ответ от сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
// универсальную функцию запроса с проверкой ответа
function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

// запрос Профиля
export const initProfile = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

// запрос карт
export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

// отправка отредактированного профиля
export const profileEditing = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
}

// запрос на добавление карточки
export const addCardtToServer = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

//добавление лайка
export const addLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}
//удаление лайка
export const deleteLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

//редактирование аватара
export const editAvatarFromServer = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}

//удаление карты
export const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}
