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
    })
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
    })
}

function editProfile(profileName, profileDescription) {
    fetch(config.baseUrl + '/users/me', {
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
    })
}

function postCard(cardName, cardLink) {
    fetch(config.baseUrl + '/cards', {
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
    })
}

export {getCards, getUserInfo, editProfile, postCard}
// return Promise.reject(`Ошибка: ${res.status}`); //TODO когда сервер вернул ошибку
