const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, user, likeStatus, openPopupImage, removeCard, countLikes = 0) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__like-count').textContent = countLikes;
    newCard.querySelector('.card__delete-button').addEventListener('click', () =>
        removeCard(card._id, newCard));
    newCard.querySelector('.card__like-button').addEventListener('click', likeStatus);
    newCard.querySelector('.card__image').addEventListener('click', openPopupImage);
    isUserOwner(card, user, newCard);
    return newCard;
};

function isUserOwner(card, user, newCard) {
    if (card.owner._id.localeCompare(user._id) < 0) {
        newCard.querySelector('.card__delete-button').style.display = 'none';
    }
    card.likes.some(like => {
        if (like._id.localeCompare(user._id) === 0) {
            newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
        }
    })
}

export {createCard};
