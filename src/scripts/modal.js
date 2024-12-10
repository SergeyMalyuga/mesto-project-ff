function onKeyDownEsc(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onKeyDownEsc);
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onKeyDownEsc);
};

export {openModal, closeModal};
