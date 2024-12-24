function showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form_type_error');
    errorElement.classList.add('popup__form_error_active');
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form_type_error');
    errorElement.classList.remove('popup__form_error_active');
    errorElement.textContent = '';
}

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            isValid(formElement, input);
        })
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
}

export {enableValidation};
