import { deleteCard, addLike, deleteLike } from "./api";
const MyId = "c387fde247b12ed0fadd5cde";

// проверка принадлежности карточки
export const checkWhoOwns = (card) => {
  return card === MyId;
}

//проверка отмеченных лайков
export const checkMyLikes = (object) => {
  return object.some((element) => {
    if (element._id === MyId) {
      return true
    }
  })
}

//показать сообщение пока ждем ответ от сервера
export const renderLoading = (form, status) => {
  if (status) {
    form.elements.button.textContent = "Сохранение..."
  }
  else {
    form.elements.button.textContent = "Сохранить"
  }
}

//удаление катрочки из html по кнопке удалить
export function deleteCardHtml(card, id) {
  deleteCard(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log((err));
      });
}

// клик по кнопке лайк нравиться
export function noteLike(id, counter) {
  addLike(id)
    .then((result) => {
      counter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log((err));
    });
}
// клик по кнопке лайк убрать нравиться
export function removeLike(id, counter) {
  deleteLike(id)
  .then((result) => {
    counter.textContent = result.likes.length
  })
  .catch((err) => {
    console.log((err));
  });
}
