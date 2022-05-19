import React from "react";
import { useState } from "react";
import { Route } from "react-router-dom";
import { Link, useHistory, Switch, Redirect } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header({ onClick, loggedIn, onLoggedOut, userEmail }) {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const currentPage = useHistory();

  const handleNav = () => {
    setIsNavOpened(!isNavOpened);
  }

  const handleLinkClikExit = () => {
    onLoggedOut();
    setIsNavOpened(false);
    onClick();
  }

  const handleLinkClik = () => {
    onClick();
  }

  const headerClasslist = (currentPage.location.pathname === '/') ? "header header_type_cardpage" : "header";
  const navClassList = (currentPage.location.pathname === '/') ? (isNavOpened ? "header__nav header__nav_cardpage header__nav_cardpage_opened" : "header__nav header__nav_cardpage") : "header__nav";
  const buttonMenuClassList = isNavOpened ? "header__button-menu header__button-menu_opened" : "header__button-menu header__button-menu_closed";

  return (
    <header className={headerClasslist}>
      <div className="header__logo-place">
        <img className="header__logo" src={logoPath} alt="Логотип" />
        {(currentPage.location.pathname === '/') && <button type="button" className={buttonMenuClassList} onClick={handleNav} ></button>}
      </div>
      <Switch>
        <Route exact path={'/'}>
          <p className={navClassList}>
            {userEmail}
            <Link to={'/sign-in'} className="header__link" onClick={handleLinkClikExit} >Выход</Link>
          </p>
        </Route>
        <Route exact path={'/sign-up'}>
          <p className={navClassList}>
            <Link to={'/sign-in'} className="header__link" onClick={handleLinkClik} >Войти</Link>
          </p>
        </Route>
        <Route exact path={'/sign-in'}>
          <p className={navClassList}>
            <Link to={'/sign-up'} className="header__link" onClick={handleLinkClik} >Регистрация</Link>
          </p>
        </Route>
        <Route exact path={'*'}>
          {loggedIn ? <Redirect to={'/'} /> : <Redirect to={'/sign-in'} />}
        </Route>
      </Switch>
    </header>
  )
}

export default Header