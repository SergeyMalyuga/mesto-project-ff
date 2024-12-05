import './pages/index.css';
import {addCard} from "./scripts/card";
import {openPopup, closePopup} from "./scripts/modal";

import {initialCards} from "./scripts/data";

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');
const formNewCard = document.querySelector('[name="new-place"]');
const formEditProfile= document.querySelector('[name="edit-profile"]');

addCard(initialCards);

openPopup(profileEditButton, popupEdit);
closePopup(popupEdit);

openPopup(profileAddButton, popupNewCard);
closePopup(popupNewCard);

closePopup(popupImage);

export {popupImage, formNewCard, formEditProfile, popupNewCard};
