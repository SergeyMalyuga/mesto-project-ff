const button = document.querySelector('.popup__close');
const popup = document.querySelector('.popup_type_edit');

button.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
    popup.setAttribute('display', 'none');
});
