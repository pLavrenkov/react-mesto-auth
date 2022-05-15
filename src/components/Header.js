import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header({ onClick, click }) {
  const [path, setPath] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [email, setEmail] = useState('');
  const [isNavOpened, setIsNavOpened] = useState(false);
  const currentPage = useHistory();

  const handleNav = () => {
    setIsNavOpened(!isNavOpened);
  }

  const headerClasslist = (currentPage.location.pathname === '/') ? "header header_type_cardpage" : "header";

  const navClassList = isNavOpened ? "header__nav header__nav_opened" : "header__nav";
  const buttonMenuClassList = isNavOpened ? "header__button-menu header__button-menu_opened" : "header__button-menu header__button-menu_closed";

  useEffect(() => {
    switch (currentPage.location.pathname) {
      case '/':
        setPath('/sign-in');
        setLinkTitle('Выйти');
        setEmail('beasty2006@yandex.ru');
        break;
      case '/sign-up':
        setPath('/sign-in');
        setLinkTitle('Войти');
        setEmail('');
        break;
      case '/sign-in':
        setPath('/sign-up');
        setLinkTitle('Регистрация');
        setEmail('');
        break;
      default:
        setPath('/sign-up');
        setLinkTitle('Регистрация');
        setEmail('');
        break;
    }
  }, [click])

  return (
    <header className={headerClasslist}>
      <div className="header__logo-place">
        <img className="header__logo" src={logoPath} alt="Логотип" />
        <button type="button" className={buttonMenuClassList} onClick={handleNav} ></button>
      </div>
      <p className={navClassList}>
        {email}
        <Link to={path} className="header__link" onClick={onClick} >{linkTitle}</Link>
      </p>
    </header>
  )
}

export default Header