import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header({ onClick, click }) {
  const [path, setPath] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [email, setEmail] = useState('');
  const currentPage = useHistory();
  
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
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип" />
      <p className="header__nav">
          {email}
          <Link to={path} className="header__link" onClick={onClick} >{linkTitle}</Link>
        </p>
    </header>
  )
}

export default Header