import React from "react";
import { Link } from "react-router-dom";

function Register({onClick}) {
    return (
        <form className="auth-form">
            <h3 className="auth-form__title">Регистрация</h3>
            <input type="email" className="auth-form__input" placeholder="Email" />
            <input type="password" className="auth-form__input" placeholder="Пароль" />
            <button type="submit" className="auth-form__button">Зарегистрироваться</button>
            <p className="auth-form__subtitle">
                Уже зарегистрированы? 
                <Link to={'/sign-in'} onClick={onClick} className="auth-form__link" >Войти</Link>
            </p>
        </form>
    )
}

export default Register