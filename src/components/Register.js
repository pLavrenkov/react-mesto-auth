import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onClick, onRegister }) {
    const [state, setState] = useState({ login: '', password: '' });

    const handleChange = (e) => {
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onRegister && state.login && state.password) {
            onRegister(state.login, state.password);
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3 className="auth-form__title">Регистрация</h3>
            <input name="login" type="email" className="auth-form__input" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" className="auth-form__input" placeholder="Пароль" onChange={handleChange} />
            <button type="submit" className="auth-form__button">Зарегистрироваться</button>
            <p className="auth-form__subtitle">
                Уже зарегистрированы?
                <Link to={'/sign-in'} onClick={onClick} className="auth-form__link" >Войти</Link>
            </p>
        </form>
    )
}

export default Register