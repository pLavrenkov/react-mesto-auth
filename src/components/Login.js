import React from "react";

function Login(){
    return (
        <form className="auth-form">
            <h3 className="auth-form__title">Вход</h3>
            <input type="email" className="auth-form__input" placeholder="Email" />
            <input type="password" className="auth-form__input" placeholder="Пароль" />
            <button type="submit" className="auth-form__button" >Войти</button>
        </form>
    )
}

export default Login