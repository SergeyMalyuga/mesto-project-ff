import {openPopup} from "./modal";
import {popupImage} from "../main";
import {likeButton} from "./likeButton";

const cardTemplate = document.querySelector('#card-template').content;
const ONE_CARD = 1;

/**
 *
 * @param card Object card
 * @param removeCard callback function to delete card
 * @returns Object card
 * @description create new Card
 */
function createCard(card, likeButton, openPopup) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.alt ? card.alt : 'отсутсвует';
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    openPopup(newCard.querySelector('.card__image'), popupImage);
    likeButton(newCard);
    return newCard;
};

function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

function addCard(cards) {
    const places = document.querySelector('.places__list');
    if (cards.length > ONE_CARD) {
        cards.forEach((card) => places.append(createCard(card, likeButton, openPopup)));
    } else {
        places.prepend(createCard(cards, likeButton, openPopup));
    }
};

export {addCard};
