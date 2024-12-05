import {openPopup} from "./modal";
import {popupImage} from "../main";

const cardTemplate = document.querySelector('#card-template').content;

/**
 *
 * @param card Object card
 * @param removeCard callback function to delete card
 * @returns Object card
 * @description create new Card
 */
function createCard(card) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);

    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.alt ? card.alt : 'отсутсвует';
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    openPopup(newCard.querySelector('.card__image'), popupImage);
    return newCard;
}

function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

function addCard(cards) {
    const places = document.querySelector('.places__list');
    if (cards.length > 1) {
        cards.forEach((card) => places.append(createCard(card)));
    } else {
        places.prepend(createCard(cards));
    }
}

export {addCard};
