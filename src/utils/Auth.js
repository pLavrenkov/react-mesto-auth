const baseApiUrl = "https://api.mesto.plavrenkov.nomoredomains.sbs";

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
        credentials: 'include',
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
        credentials: 'include',
    })
        .catch((err) => {
            console.log(`Не удалось войти. Ошибка ${err}`)
        })
}

export const checkToken = (token) => {
    return fetch(`${baseApiUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        credentials: 'include',
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