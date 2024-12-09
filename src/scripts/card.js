import {openModal} from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageDescription = popupTypeImage.querySelector('.popup__caption')

function createCard(card, likeStatus, cardClick, removeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    removeCard(newCard);
    cardClick(newCard);
    likeStatus(newCard);
    return newCard;
};

function removeCard(card) {
    card.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        const card = evt.target.closest('.card');
        card.remove();
    });
};

function likeStatus(card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
};

function cardClick(card) {
    card.querySelector('.card__image').addEventListener('click', () => {
        openModal(popupTypeImage);
        popupImage.src = card.querySelector('.card__image').src;
        popupImage.alt = card.querySelector('.card__image').alt;
        popupImageDescription.textContent = card.querySelector('.card__image').alt;
    });
};

export {createCard, removeCard, likeStatus, cardClick};
