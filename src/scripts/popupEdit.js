import {close} from "./modal";
import {formEditProfile} from "../main";

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
let isEditHandlerAdded = false;

function showPopupInfo() {
    formEditProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    formEditProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
}

function editProfileInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = formEditProfile.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = formEditProfile.querySelector('.popup__input_type_description').value;
    close(popupEdit);
}

function createFormListener() {
    formEditProfile.addEventListener('submit', editProfileInfo);
    isEditHandlerAdded = true;
}

function removeFormListener() {
    formEditProfile.removeEventListener('submit', editProfileInfo);
    isEditHandlerAdded = false;
}

export {showPopupInfo, createFormListener, removeFormListener, isEditHandlerAdded};
