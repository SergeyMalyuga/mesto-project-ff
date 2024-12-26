const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, likeStatus, openPopupImage, removeCard, countLikes = 0) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__like-count').textContent = countLikes;
    newCard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    newCard.querySelector('.card__like-button').addEventListener('click', likeStatus);
    newCard.querySelector('.card__image').addEventListener('click', openPopupImage);
    return newCard;
};

export {createCard};
