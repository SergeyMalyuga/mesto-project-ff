const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list');

/**
 *
 * @param card Object card
 * @param removeCard callback function to delete card
 * @returns Object card
 * @description create new Card
 */
function createCard(card, likeButton, cardClick) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    cardClick(newCard);
    likeButton(newCard);
    return newCard;
};

function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

function addCard(card, likeButton, cardClick) {
    places.prepend(createCard(card, likeButton, cardClick));
};

export {addCard, createCard};
