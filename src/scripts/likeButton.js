function likeButton(card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    })
};

export {likeButton};
