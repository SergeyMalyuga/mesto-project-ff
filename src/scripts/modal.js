import {createFormListener, isEditHandlerAdded, removeFormListener, showPopupInfo} from "./popupEdit";
import {cleanInputFields, createNewCardListener, isNewCardHandlerAdded, removeNewCardListener} from "./popupNewCard";

function handler(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        close();
    }
};

function onClickButtonClose(evt) {
    if (evt.target.classList.contains('popup__close')) {
        close();
    }
};

function onClickOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        close();
    }
};

function close() {
    removeListeners();
    document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handler);
};

function openPopup(button, popup) {
    button.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handler);
        detectModalWindow(button, popup);
        closePopup(popup);
    })
};

function closePopup(popup) {
    popup.addEventListener('click', onClickButtonClose);
    popup.addEventListener('click', onClickOverlay);
};

function removeListeners() {
    if (isEditHandlerAdded) {
        removeFormListener();
    } else if (isNewCardHandlerAdded) {
        removeNewCardListener();
        cleanInputFields();
    }
    document.querySelector(".popup_is-opened").removeEventListener('click', onClickButtonClose);
    document.querySelector(".popup_is-opened").removeEventListener('click', onClickOverlay);
};

function detectModalWindow(button, popup) {
    if (popup.classList.contains('popup_type_edit')) {
        showPopupInfo();
        createFormListener();
    } else if (popup.classList.contains('popup_type_image')) {
        popup.querySelector('.popup__image').src = button.src;
        popup.querySelector('.popup__caption').textContent = button.alt;
    } else {
        createNewCardListener();
    }
};

export {openPopup, close};
