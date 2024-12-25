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
        console.log(error);
    })
}

export {getCards, getUserInfo}
// return Promise.reject(`Ошибка: ${res.status}`); //TODO когда сервер вернул ошибку
