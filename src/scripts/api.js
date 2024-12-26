const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: '035b9530-c102-464d-a0ab-0f3f6371c738',
        'Content-Type': 'application/json'
    }
}

function getCards() {
    return fetch(config.baseUrl + '/cards', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getUserInfo() {
    return fetch(config.baseUrl + '/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

function editProfile(profileName, profileDescription) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: profileName,
            about: profileDescription
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

function postCard(cardName, cardLink) {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

function deleteCard(cardId) {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

function addLike(cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}


function deleteLike(cardId) {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

function patchAvatar(url) {
    console.log(url);
    fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: url})
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }).catch((error) => {
        console.error(error.message);
    });
}

export {getCards, getUserInfo, editProfile, postCard, deleteCard, addLike, deleteLike, patchAvatar}

