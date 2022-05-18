const baseApiUrl = "https://auth.nomoreparties.co";

export const register = (login, password) => {
    return fetch(`${baseApiUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'password': password,
            'email': login
        }),
    })
}

export const login = (login, password) => {
    return fetch(`${baseApiUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'password': password,
            'email': login
        }),
    })
        .then(checkResponse)
        .catch((err) => {
            alert(`Не удалось войти. Ошибка ${err}`)
        })
}

export const checkToken = (token) => {
    return fetch(`${baseApiUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(checkResponse)
        .catch((err) => {
            alert(`Не удалось войти. Ошибка ${err}`)
        })
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}