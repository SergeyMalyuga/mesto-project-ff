let onKeyDownEsc;

function createHandler(popup) {
    return function handler(evt) {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            closeModal(popup);
        }
    };
}

function openModal(popup) {
    onKeyDownEsc = createHandler(popup);
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onKeyDownEsc);
};

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onKeyDownEsc);
};

export {openModal, closeModal};
