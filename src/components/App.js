import React from 'react';
import { useState, useEffect } from "react";
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext';
import { Route, Redirect, Switch, useHistory, Link } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Login from './Login';
import Register from "./Register"
import Footer from "./Footer";
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';


function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltopOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const pageObj = useHistory();

  useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        alert(`Возникла ошибка при загрузке данных пользователя ${err}`);
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(item) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(item);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltopOpen(true);
  }

  function handleCardClick(name, link) {
    const card = {
      name: name,
      link: link
    }
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleLinkClick = () => {
    setClick(!click);
  }

  function handleUpdateUser(name, about) {
    api.patchUserInfo(name, about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .catch((err) => {
        alert(`Не загрузились данные пользователя. Ошибка ${err}`);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .catch((err) => {
        alert(`Не удалось загрузить аватар. Ошибка ${err}`);
      });
    closeAllPopups();
  }

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.getCards()
      .then((arrCards) => {
        setCards(arrCards)
      })
      .catch((err) => {
        alert(`Карточки не загрузились. Ошибка ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        alert(`Не удалось проставить like. Ошибка ${err}`);
      })
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(selectedCard._id)
      .then((newCard) => {
        console.log(newCard);
        setCards((state) => state.filter((c) => c._id !== selectedCard._id ? true : false));
      })
      .catch((err) => {
        alert(`Не удалось удалить карточку. Ошибка ${err}`);
      });
    closeAll();
  }

  function handleAddPlaceSubmit(name, link) {
    api.putNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        alert(`Не удалось загрузить катрочку. Ошибка ${err}`)
      })
  }

  function closeAll() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltopOpen(false);
    setSelectedCard({});
  }

  function closeAllPopups() {
    closeAll();
  }

  function closeAllPopupsByLayout(event) {
    if (event.target.className.includes('pop-up_opened')) {
      closeAll();
    }
  }

  useEffect(() => {
    const closeByEsc = (e) => {
      if (e.key === 'Escape') {
        closeAll();
      }
    }
    window.addEventListener('keydown', closeByEsc);
    return () => window.removeEventListener('keydown', closeByEsc);
  }, []);

  return (
    <div className="body">
      <div className="mainpage">
        <CurrentUserContext.Provider value={currentUser}>
          <Header onClick={handleLinkClick} click={click} />
          <Switch>
            <ProtectedRoute
              exact path={'/'}
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onUpdateUser={handleUpdateUser}
              onUpdateAvatar={handleUpdateAvatar}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
            <Route path={'/sign-up'}>
              <Register onClick={handleLinkClick} />
            </Route>
            <Route path={'/sign-in'}>
              <Login />
            </Route>
            <Route path={'*'}>
              {loggedIn ? <Redirect to={'/'} /> : <Redirect to={'/sign-in'} />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onCloseByLayout={closeAllPopupsByLayout} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onCloseByLayout={closeAllPopupsByLayout} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} newCardAdd={handleAddPlaceSubmit} onCloseByLayout={closeAllPopupsByLayout} />
          <PopupWithForm name={"deletecard"} title={"Вы уверены?"} button={"Да"} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCloseByLayout={closeAllPopupsByLayout} onSubmit={handleCardDelete} />
          <ImagePopup onClose={closeAllPopups} cardAttributes={selectedCard} isOpen={isImagePopupOpen} onCloseByLayout={closeAllPopupsByLayout} />
          <InfoTooltip isOpen={isInfoTooltipOpen} loggedIn={loggedIn} onClose={closeAllPopups} onCloseByLayout={closeAllPopupsByLayout} />
        </CurrentUserContext.Provider>

      </div>
    </div >
  );
}

export default App;
