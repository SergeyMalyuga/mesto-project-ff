import {initialCards} from "./data.js";
import {openPopup,closePopup} from "./modal";
import {popupImage} from "../main";

const cardTemplate = document.querySelector('#card-template').content;

/**
 *
 * @param card Object card
 * @param removeCard callback function to delete card
 * @returns Object card
 * @description create new Card
 */
function createCard(card, removeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.alt;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    openPopup(newCard.querySelector('.card__image'), popupImage);
    return newCard;
}

function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

function addCard() {
    const places = document.querySelector('.places__list');
    initialCards.forEach((card) => places.append(createCard(card, removeCard)));
}

export {addCard};
