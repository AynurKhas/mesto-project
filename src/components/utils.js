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
