const buttonPopupClose = document.querySelector('.popup__close');

function onKeyDownEsc(popup) {
    return function (evt) {
        if (evt.key === 'Escape') {
            close(popup);
        }
    };
}

function close(popup) {
    const handler = onKeyDownEsc(popup);
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handler);
};

function openPopup(button, popup) {
    const handler = onKeyDownEsc(popup);
    button.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handler);
    })
};

function closePopup(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            close(popup);
        }
    });
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            close(popup);
        }
    });
};

export {openPopup, closePopup};
