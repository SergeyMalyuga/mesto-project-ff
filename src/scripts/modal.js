import {createFormListener, removeFormListener, showPopupInfo} from "./popupEdit";

function handler(evt) {
    if (evt.key === 'Escape') {
        close();
    }
}

function close() {
    document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handler);
    removeFormListener();
};

function openPopup(button, popup) {
    button.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handler);

        if (popup.classList.contains('popup_type_edit')) { //TODO сделать рефакторинг условий.
            showPopupInfo();
            createFormListener();
        } else if (popup.classList.contains('popup_type_image')) {
            popup.querySelector('.popup__image').src = button.src;
            popup.querySelector('.popup__caption').textContent = button.alt;
        }
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

export {openPopup, closePopup, close};
