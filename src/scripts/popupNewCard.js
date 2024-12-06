import {addCard} from "./card";
import {close} from "./modal";
import {formNewCard, popupNewCard} from "../main";

let isNewCardHandlerAdded = false;

function createNewCard(evt) {

    evt.preventDefault();
    const card = {
        name: formNewCard.querySelector('.popup__input_type_card-name').value,
        link: formNewCard.querySelector('.popup__input_type_url').value
    }
    addCard(card);
    close(popupNewCard);
}

function cleanInputFields() {
    formNewCard.querySelector('.popup__input_type_card-name').value = '';
    formNewCard.querySelector('.popup__input_type_url').value = '';
}

function createNewCardListener() {
    formNewCard.addEventListener('submit', createNewCard);
    isNewCardHandlerAdded = true;
}

function removeNewCardListener() {
    formNewCard.removeEventListener('submit', createNewCard);
    isNewCardHandlerAdded = false;
}

export {createNewCardListener, removeNewCardListener, cleanInputFields, isNewCardHandlerAdded};
