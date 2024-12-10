const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, likeStatus, openPopupImage, removeCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    newCard.querySelector('.card__like-button').addEventListener('click', likeStatus);
    newCard.querySelector('.card__image').addEventListener('click', openPopupImage);
    return newCard;
};

function removeCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

function likeStatus(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, removeCard, likeStatus};
