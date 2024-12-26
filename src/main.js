import './pages/index.css';
import {createCard} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {enableValidation, clearValidation} from "./scripts/validation";
import {getCards, getUserInfo, editProfile, postCard, deleteCard, addLike, deleteLike} from "./scripts/api";
import {data} from "autoprefixer";

const places = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupImageClose = popupImage.querySelector('.popup__close');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupCardClose = popupCard.querySelector('.popup__close');

const formNewCard = document.querySelector('[name="new-place"]');
const formEditProfile = document.querySelector('[name="edit-profile"]');

const inputCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputUrl = formNewCard.querySelector('.popup__input_type_url');
const inputTypeName = formEditProfile.querySelector('.popup__input_type_name');
const inputTypeDescription = formEditProfile.querySelector('.popup__input_type_description')

const popupImagePicture = document.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector('.popup__caption')

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function addCard(card, likeStatus, openPopupImage, removeCard) {
    places.prepend(createCard(card, likeStatus, openPopupImage, removeCard));
};

Promise.all([getCards(), getUserInfo()]).then(([cards, user]) => {
    cards.forEach((card) => {
        const newCard = createCard(card, likeStatus(card), openPopupImage, removeCard(card._id), card.likes.length);
        if (card.owner._id.localeCompare(user._id) < 0) {
            newCard.querySelector('.card__delete-button').style.display = 'none';
        }
        card.likes.some(like => {
            if(like._id.localeCompare(user._id) === 0) {
                newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            }
        })
        places.append(newCard);
    })
})

profileEditButton.addEventListener('click', () => {
    showPopupInfo();
    clearValidation(formEditProfile, validationConfig);
    openModal(popupEdit);
});
profileAddButton.addEventListener('click', () => {
    openModal(popupCard);
    cleanInputFields()
});

popupImageClose.addEventListener('click', () => closeModal(popupImage));
popupEditClose.addEventListener('click', () => closeModal(popupEdit));
popupCardClose.addEventListener('click', () => closeModal(popupCard));

popupImage.addEventListener('click', (evt) => onClickOverlay(evt, popupImage));
popupEdit.addEventListener('click', (evt) => onClickOverlay(evt, popupEdit));
popupCard.addEventListener('click', (evt) => onClickOverlay(evt, popupCard));

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
    profileTitle.textContent = inputTypeName.value;
    profileDescription.textContent = inputTypeDescription.value;
    editProfile(inputTypeName.value, inputTypeDescription.value); //TODO
    closeModal(popupEdit);
};

function createNewCard(evt) {
    evt.preventDefault();
    const card = {
        name: inputCardName.value,
        link: inputUrl.value
    }
    addCard(card, likeStatus, openPopupImage, removeCard);
    postCard(card.name, card.link); //TODO
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
        const card = evt.target.closest('.card');
        card.remove();
        deleteCard(cardId);
    };
}

function likeStatus(card) { //TODO refactorng
    return function (evt) {
        console.log(evt.target);
        if (evt.target.classList.contains('card__like-button_is-active')) {
            deleteLike(card._id).then((data) =>
                evt.target.closest('.card__like').querySelector('.card__like-count')
                    .textContent = data.likes.length);
        } else {
            addLike(card._id).then((data) => {
                evt.target.closest('.card__like').querySelector('.card__like-count')
                    .textContent = data.likes.length; console.log(data.likes);});
        }
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

formEditProfile.addEventListener('submit', editProfileInfo);
formNewCard.addEventListener('submit', createNewCard);
enableValidation(validationConfig);



