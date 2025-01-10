import './pages/index.css';
import {createCard, changeLikeStatus} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {enableValidation, clearValidation} from "./scripts/validation";
import {
    getCards,
    getUserInfo,
    editProfile,
    postCard,
    deleteCard,
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

function addCard(card, user) {
    places.prepend(createCard(card, user, changeLikeStatus, openPopupImage(card), removeCard));
};

Promise.all([getCards(), getUserInfo()]).then(([cards, user]) => {
    cards.forEach((card) => {
        const newCard = createCard(card, user, changeLikeStatus, openPopupImage(card), removeCard, card.likes.length);
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
    inputProfileImageUrl.value = '';
    clearValidation(formEditProfileImage, validationConfig);
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
    editProfile(inputTypeName.value, inputTypeDescription.value)
        .then(() => {
                profileTitle.textContent = inputTypeName.value;
                profileDescription.textContent = inputTypeDescription.value;
                closeModal(popupEdit);
            }
        )
        .catch((error) => {
            console.log(error);
        }).finally(() => popupEditButton.textContent = 'Сохранить');
};

function changeAvatar(evt) {
    evt.preventDefault();
    const imageUrl = inputProfileImageUrl.value;
    patchAvatar(imageUrl).then(() => {
            profileImage.style.backgroundImage = `url(${imageUrl})`;
            closeModal(popupProfileImageEdit);
        }
    )
        .catch((error) => {
            console.log(error);
        });
}

function createNewCard(evt) {
    evt.preventDefault();
    popupCardButton.textContent = 'Сохранение...';
    Promise.all([postCard(inputCardName.value, inputUrl.value), getUserInfo()])
        .then(([card, user]) => {
            addCard(card, user);
            closeModal(popupCard);
        }).catch((error) => {
        console.log(error);
    }).finally(() => popupCardButton.textContent = 'Сохранить');
};

function openPopupImage(card) {
    return function () {
        openModal(popupImage);
        popupImagePicture.src = card.link;
        popupImagePicture.alt = card.name;
        popupImageDescription.textContent = card.name;
    }
};

function removeCard(cardId, card) {
    openModal(popupDeleteCard);
    cardToDelete = card;
    cardIdToDelete = cardId;
}

popupDeleteCardButton.addEventListener('click', () => {
    deleteCard(cardIdToDelete).then(() => {
        cardToDelete.remove();
        closeModal(popupDeleteCard);
    }).catch((error) => {
        console.log(error);
    });
});

formEditProfile.addEventListener('submit', editProfileInfo);
formNewCard.addEventListener('submit', createNewCard);
formEditProfileImage.addEventListener('submit', changeAvatar);
enableValidation(validationConfig);
