import {close} from "./modal";

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');

function showPopupInfo() {
    formElement.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    formElement.querySelector('.popup__input_type_description').value = profileDescription.textContent;
}

function editProfileInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = formElement.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = formElement.querySelector('.popup__input_type_description').value;
    close(popupEdit);
}

function createFormListener() {
    formElement.addEventListener('submit', editProfileInfo);
}

function removeFormListener() {
    formElement.removeEventListener('submit', editProfileInfo);
}

export {showPopupInfo, createFormListener, removeFormListener};
