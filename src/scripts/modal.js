const formNewCard = document.querySelector('[name="new-place"]');

function handler(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        close();
    }
};

function cleanInputFields() {
    formNewCard.querySelector('.popup__input_type_card-name').value = '';
    formNewCard.querySelector('.popup__input_type_url').value = '';
};

function close() {
    document.querySelector(".popup_is-opened").classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handler);
    cleanInputFields();
};

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handler);
};

function closeModal(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            close();
        }
    });
};

export {openModal, closeModal, close};
