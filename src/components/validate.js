const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);

  increaseOutputSize(formElement, errorElement, object);
};

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
  increaseOutputSize(formElement, errorElement, object);
};

const checkInputValidity = (formElement, inputElement, object) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, object);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, object);
    });
  });
};

export const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

export const сheckInputs = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  // const buttonElement = formElement.querySelector('.form__button');
  inputList.forEach(inputElement => {
    checkInputValidity(formElement, inputElement, object);
    hideInputError(formElement, inputElement, object);
    // toggleButtonState(inputList, buttonElement);
  })
}

// функция увеличения высоты для ошибки
const increaseOutputSize = (formElement, errorElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  inputList.forEach(inputElement => {
    if (errorElement.offsetHeight > 30) {
      inputElement.style.marginBottom = `${errorElement.offsetHeight}px`;
    } else {
      inputElement.removeAttribute("style");
    }
  })
}
