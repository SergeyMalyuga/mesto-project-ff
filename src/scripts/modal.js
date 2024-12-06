import {createFormListener, removeFormListener, showPopupInfo, isEditHandlerAdded} from "./popupEdit";
import {createNewCardListener, removeNewCardListener, cleanInputFields, isNewCardHandlerAdded} from "./popupNewCard";

function handler(evt) {
    if (evt.key === 'Escape') {
        close();
    }
}

function close() {
    document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handler);
    removeListeners();
};

function openPopup(button, popup) {
    button.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handler);
        detectModalWindow(button, popup);
    })
};

function closePopup(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            close();
        }
    });
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            close();
        }
    });
};

function removeListeners() {
    if (isEditHandlerAdded) {
        removeFormListener();
    } else if (isNewCardHandlerAdded) {
        removeNewCardListener();
        cleanInputFields();
    }
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
}

export {openPopup, closePopup, close};
