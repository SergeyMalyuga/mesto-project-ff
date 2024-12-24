import './pages/index.css';
import {createCard, removeCard, likeStatus} from "./scripts/card";
import {closeModal, openModal} from "./scripts/modal";
import {enableValidation} from "./scripts/validation";
import {cards} from "./scripts/cards";

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


function addCards(cards, likeStatus, openPopupImage, removeCard) {
    cards.forEach((card) => places.append(createCard(card, likeStatus, openPopupImage, removeCard)));
};

function addCard(card, likeStatus, openPopupImage, removeCard) {
    places.prepend(createCard(card, likeStatus, openPopupImage, removeCard));
};

addCards(cards, likeStatus, openPopupImage, removeCard);

profileEditButton.addEventListener('click', () => {
    openModal(popupEdit);
    showPopupInfo();
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
};

function showPopupInfo() {
    inputTypeName.value = profileTitle.textContent;
    inputTypeDescription.value = profileDescription.textContent;
};

function editProfileInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTypeName.value;
    profileDescription.textContent = inputTypeDescription.value;
    closeModal(popupEdit);
};

function createNewCard(evt) {
    evt.preventDefault();
    const card = {
        name: inputCardName.value,
        link: inputUrl.value
    }
    addCard(card, likeStatus, openPopupImage, removeCard);
    closeModal(popupCard);
};

function openPopupImage(evt) {
    openModal(popupImage);
    popupImagePicture.src = evt.target.src;
    popupImagePicture.alt = evt.target.alt;
    popupImageDescription.textContent = evt.target.alt;
};

formEditProfile.addEventListener('submit', editProfileInfo);
formNewCard.addEventListener('submit', createNewCard);
enableValidation();



