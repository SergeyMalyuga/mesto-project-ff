const button = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit');

function onKeyDownEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

function closePopup() {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onKeyDownEsc);
}

button.addEventListener('click', () => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onKeyDownEsc);
})

popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup();
    }
})
