import React from "react";
import { useState } from "react";

function Login({ onLogin }) {
    const [state, setState] = useState({ login: '', password: '' });

    const handleChange = (e) => {
        setState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin && state.login && state.password) {
            onLogin(state.login, state.password)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3 className="auth-form__title">Вход</h3>
            <input name="login" type="email" className="auth-form__input" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" className="auth-form__input" placeholder="Пароль" onChange={handleChange} />
            <button type="submit" className="auth-form__button" >Войти</button>
        </form>
    )
}

export default Login