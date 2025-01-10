import {addLike, deleteLike} from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, user, likeStatus, openPopupImage, removeCard, countLikes = 0) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const likeCount = newCard.querySelector('.card__like-count');
    const likeButton = newCard.querySelector('.card__like-button');
    const deleteButton = newCard.querySelector('.card__delete-button');
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    likeCount.textContent = countLikes;
    deleteButton.addEventListener('click', () =>
        removeCard(card._id, newCard));
    likeButton.addEventListener('click', () => likeStatus(card, likeButton, deleteButton, likeCount));
    newCard.querySelector('.card__image').addEventListener('click', openPopupImage);
    isUserOwner(card, user, deleteButton, likeButton);
    return newCard;
};

function isUserOwner(card, user, deleteButton, likeButton) {
    if (card.owner._id.localeCompare(user._id) !== 0) {
        deleteButton.style.display = 'none';
    }
    card.likes.some(like => {
        if (like._id.localeCompare(user._id) === 0) {
            likeButton.classList.add('card__like-button_is-active');
        }
    })
}

function chooseLikeStatus(likeStatus, card, likeButton, deleteButton, likeCount) {
    likeStatus(card._id).then((data) => {
        likeCount.textContent = data.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
    })
        .catch((error) => {
            console.log(error);
        })
}

function changeLikeStatus(card, likeButton, deleteButton, likeCount) {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            chooseLikeStatus(deleteLike, card, likeButton, deleteButton, likeCount);
        } else {
            chooseLikeStatus(addLike, card, likeButton, deleteButton, likeCount)
        }
}

export {createCard, changeLikeStatus};
