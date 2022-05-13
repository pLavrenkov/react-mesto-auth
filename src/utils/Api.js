export class Api {
  constructor(baseUrl, headers) {
    this._baseUrlMesto = baseUrl.baseUrlMesto;
    this._baseUrlUser = baseUrl.baseUrlUser;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._baseUrlMesto}/cards`, {
      headers: this._headers,
    }
    )
    .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrlUser}/users/me`, {
      headers: this._headers,
    }
    )
    .then(this._checkResponse)
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrlUser}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  patchAvatar(url) {
    return fetch(`${this._baseUrlMesto}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._checkResponse)
  }

  putNewCard(name, link) {
    return fetch(`${this._baseUrlMesto}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  getLike() {
    return fetch(`${this._baseUrlMesto}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
        return this.deleteLike(cardId)
    } else {
        return this.putLike(cardId)
    }
  }
}



export const api = new Api(
  {
    baseUrlMesto: 'https://mesto.nomoreparties.co/v1/cohort-38',
    baseUrlUser: 'https://nomoreparties.co/v1/cohort-38'
  },
  {
    authorization: '4668ff3a-c5ce-444d-bb20-dac560596bbe',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);


