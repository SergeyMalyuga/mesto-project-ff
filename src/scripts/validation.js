function showInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
        setErrorMessage(inputElement);
        showInputError(formElement, inputElement, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            isValid(formElement, input, validationConfig);
        })
    });
}

function setErrorMessage(inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.patternMessage);
    } else {
        inputElement.setCustomValidity('');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid
    )
};

function toggleButtonState(form, validationConfig) {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

function clearValidation(form, validationConfig) {
    const inputList = form.querySelectorAll(validationConfig.inputSelector);
    inputList.forEach((input) => {
        hideInputError(form, input, validationConfig);
    });
    toggleButtonState(form, validationConfig);
}

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationConfig);
    });
}

export {enableValidation, clearValidation};
