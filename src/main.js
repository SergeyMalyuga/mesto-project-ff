import './pages/index.css';
import {addCard, createCard} from "./scripts/card";
import {close, closeModal, openModal} from "./scripts/modal";
import {cards} from "./scripts/data";

const places = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupImageClose = popupImage.querySelector('.popup__close');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupCardClose = popupCard.querySelector('.popup__close');

const formNewCard = document.querySelector('[name="new-place"]');
const formEditProfile = document.querySelector('[name="edit-profile"]');

function addCards(cards, likeButton, cardClick) {
    cards.forEach((card) => places.append(createCard(card, likeButton, cardClick)));
}

addCards(cards, like, cardClick);

profileEditButton.addEventListener('click', () => openModal(popupEdit));
profileAddButton.addEventListener('click', () => openModal(popupCard));
popupImageClose.addEventListener('click', () => close());
popupEditClose.addEventListener('click', () => close());
popupCardClose.addEventListener('click', () => close());

closeModal(popupEdit);
closeModal(popupCard);
closeModal(popupImage);

function showPopupInfo() {
    formEditProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    formEditProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
}

function editProfileInfo(evt) {
    evt.preventDefault();
    profileTitle.textContent = formEditProfile.querySelector('.popup__input_type_name').value;
    profileDescription.textContent = formEditProfile.querySelector('.popup__input_type_description').value;
    close(popupEdit);
}

function createFormListener() {
    formEditProfile.addEventListener('submit', editProfileInfo);
}

function createNewCard(evt) {
    evt.preventDefault();
    const card = {
        name: formNewCard.querySelector('.popup__input_type_card-name').value,
        link: formNewCard.querySelector('.popup__input_type_url').value
    }
    addCard(card, like, cardClick);
    close(popupCard);
};

function createNewCardListener() {
    formNewCard.addEventListener('submit', createNewCard);
};

function cardClick(card) {
    card.querySelector('.card__image').addEventListener('click', () => {
        openModal(popupImage);
        popupImage.querySelector('.popup__image').src = card.querySelector('.card__image').src;
        popupImage.querySelector('.popup__caption').textContent = card.querySelector('.card__image').alt;
    });
}

function like(card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
}

function detectModalWindow() {
    showPopupInfo();
    createFormListener();
    createNewCardListener();
};

detectModalWindow()

