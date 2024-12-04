import './pages/index.css';
import {addCard} from "./scripts/card";
import {openPopup, closePopup} from "./scripts/modal";

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');




addCard();
// const cardImage = document.querySelector('.card__image');
// const popupImage = document.querySelector('.popup_type_image');

openPopup(profileEditButton, popupEdit);
closePopup(popupEdit);

openPopup(profileAddButton, popupNewCard);
closePopup(popupNewCard);

// openPopup(cardImage, popupImage);
// closePopup(popupImage);

// import './scripts/card.js';
// import './blocks/profile/profile.js';
// import './blocks/popup/popup.js';
