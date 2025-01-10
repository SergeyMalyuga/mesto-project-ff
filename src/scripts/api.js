const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: '035b9530-c102-464d-a0ab-0f3f6371c738',
        'Content-Type': 'application/json'
    }
}

const getCards = () => {
    return fetch(config.baseUrl + '/cards', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.log(error);
    });
}

const getUserInfo = () => {
    return fetch(config.baseUrl + '/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

const editProfile = (profileName, profileDescription) => {
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
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

const postCard = (cardName, cardLink) => {
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
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

const deleteCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

const addLike = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}


const deleteLike = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization
        }
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

const patchAvatar = (url) => {
    fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: url})
    }).then((response) => {
        return checkResponse(response);
    }).catch((error) => {
        console.error(error.message);
    });
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export {getCards, getUserInfo, editProfile, postCard, deleteCard, addLike, deleteLike, patchAvatar}

