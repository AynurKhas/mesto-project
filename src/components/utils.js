
import { userId } from "./index.js";

// проверка принадлежности карточки
// export const checkWhoOwns = (cardId) => {
//   return cardId === userId;
// }

//проверка отмеченных лайков
export const checkMyLikes = (object) => {
  return object.some((element) => {
    if (element._id === userId) {
      return true
    }
  })
}
