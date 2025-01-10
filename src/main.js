import './pages/index.css';
import {createCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {enableValidation, clearValidation} from "./scripts/validation";
import {
    getCards,
    getUserInfo,
    editProfile,
    postCard,
    deleteCard,
    addLike,
    deleteLike,
    patchAvatar
} from "./scripts/api";

const places = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupProfileImageEdit = document.querySelector('.popup__profile_image_edit');
const popupDeleteCard = document.querySelector('.popup_delete_card');

const popupImageClose = popupImage.querySelector('.popup__close');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupCardClose = popupCard.querySelector('.popup__close');
const popupProfileImageEditClose = popupProfileImageEdit.querySelector('.popup__close');
const popupDeleteCardClose = popupDeleteCard.querySelector('.popup__close');

const popupCardButton = popupCard.querySelector('.popup__button')
const popupEditButton = popupEdit.querySelector('.popup__button')
const popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button')

const formNewCard = document.querySelector('[name="new-place"]');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const formEditProfileImage = document.querySelector('[name="profile_image_edit"]');

const inputCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputUrl = formNewCard.querySelector('.popup__input_type_url');
const inputTypeName = formEditProfile.querySelector('.popup__input_type_name');
const inputTypeDescription = formEditProfile.querySelector('.popup__input_type_description')
const inputProfileImageUrl = document.querySelector('.popup__profile_image_edit_url');

const popupImagePicture = document.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector('.popup__caption')

let cardToDelete = null;
let cardIdToDelete = null;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function addCard(card) {
    places.prepend(createCard(card, likeStatus(card), openPopupImage, removeCard(card._id)));
};

Promise.all([getCards(), getUserInfo()]).then(([cards, user]) => {
    cards.forEach((card) => {
        const newCard = createCard(card, likeStatus(card), openPopupImage, removeCard(card._id), card.likes.length);
        if (card.owner._id.localeCompare(user._id) < 0) {
            newCard.querySelector('.card__delete-button').style.display = 'none';
        }
        card.likes.some(like => {
            if (like._id.localeCompare(user._id) === 0) {
                newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            }
        })
        places.append(newCard);

        profileTitle.textContent = user.name;
        profileImage.style.backgroundImage = `url(${user.avatar})`;
        profileDescription.textContent = user.about;
    })
}).catch((error) => {
    console.log(error);
});

profileEditButton.addEventListener('click', () => {
    showPopupInfo();
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEdit);
});
profileAddButton.addEventListener('click', () => {
    openModal(popupCard);
    cleanInputFields()
});

profileImage.addEventListener('click', () => {
    clearValidation(formEditProfileImage, validationConfig);
    inputProfileImageUrl.value = '';
    openModal(popupProfileImageEdit);
})

popupImageClose.addEventListener('click', () => closeModal(popupImage));
popupEditClose.addEventListener('click', () => closeModal(popupEdit));
popupCardClose.addEventListener('click', () => closeModal(popupCard));
popupProfileImageEditClose.addEventListener('click', () => closeModal(popupProfileImageEdit));
popupDeleteCardClose.addEventListener('click', () => closeModal(popupDeleteCard));

popupImage.addEventListener('click', (evt) => onClickOverlay(evt, popupImage));
popupEdit.addEventListener('click', (evt) => onClickOverlay(evt, popupEdit));
popupCard.addEventListener('click', (evt) => onClickOverlay(evt, popupCard));
popupProfileImageEdit.addEventListener('click', (evt) => onClickOverlay(evt, popupProfileImageEdit));
popupDeleteCard.addEventListener('click', (evt) => onClickOverlay(evt, popupDeleteCard));

function onClickOverlay(evt, popup) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(popup);
    }
};

function cleanInputFields() {
    inputCardName.value = '';
    inputUrl.value = '';
    clearValidation(formNewCard, validationConfig);
};

function showPopupInfo() {
    inputTypeName.value = profileTitle.textContent;
    inputTypeDescription.value = profileDescription.textContent;
};

function editProfileInfo(evt) {
    evt.preventDefault();
    popupEditButton.textContent = 'Сохранение...';
    profileTitle.textContent = inputTypeName.value;
    profileDescription.textContent = inputTypeDescription.value;
    editProfile(inputTypeName.value, inputTypeDescription.value).then(() =>
        popupEditButton.textContent = 'Сохранить').catch((error) => {
        console.log(error);
    });
    closeModal(popupEdit);
};

function changeAvatar(evt) {
    evt.preventDefault();
    const imageUrl = inputProfileImageUrl.value;
    profileImage.style.backgroundImage = `url(${imageUrl})`;
    patchAvatar(imageUrl).catch((error) => {
        console.log(error);
    });
    closeModal(popupProfileImageEdit);
}

function createNewCard(evt) {
    evt.preventDefault();
    popupCardButton.textContent = 'Сохранение...';
    postCard(inputCardName.value, inputUrl.value).then((card) => {
            console.log(card);
            console.log(card._id);
            addCard(card);
            popupCardButton.textContent = 'Сохранить'
        }
    ).catch((error) => {
        console.log(error);
    });
    closeModal(popupCard);
};

function openPopupImage(evt) {
    openModal(popupImage);
    popupImagePicture.src = evt.target.src;
    popupImagePicture.alt = evt.target.alt;
    popupImageDescription.textContent = evt.target.alt;
};

function removeCard(cardId) {
    return function (evt) {
        openModal(popupDeleteCard);
        cardToDelete = evt.target.closest('.card');
        cardIdToDelete = cardId;
    }
}

popupDeleteCardButton.addEventListener('click', () => {
    cardToDelete.remove();
    deleteCard(cardIdToDelete).catch((error) => {
        console.log(error);
    });
    closeModal(popupDeleteCard);
});

function likeStatus(card) {
    return function (evt) {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            deleteLike(card._id).then((data) =>
                evt.target.closest('.card__like').querySelector('.card__like-count')
                    .textContent = data.likes.length);
        } else {
            addLike(card._id).then((data) => {
                evt.target.closest('.card__like').querySelector('.card__like-count')
                    .textContent = data.likes.length;
            }).catch((error) => {
                console.log(error);
            });
        }
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

formEditProfile.addEventListener('submit', editProfileInfo);
formNewCard.addEventListener('submit', createNewCard);
formEditProfileImage.addEventListener('submit', changeAvatar);
enableValidation(validationConfig);
