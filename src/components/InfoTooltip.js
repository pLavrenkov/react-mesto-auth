import React from "react";
import { useState, useEffect } from "react";

function InfoTooltip( {isOpen, LoggedIn, onClose, onCloseByLayout} ) {
    const [subtitle, setSubtitle] = useState('');
    const [logedInClass, setLogedInClass] = useState('');
    const handleClassPopupOpen = (isOpen ? "pop-up pop-up_opened" : "pop-up");

    useEffect(() => {
        if (LoggedIn) {
            setSubtitle('Вы успешно зарегистрировались!');
            setLogedInClass("pop-up-form__image pop-up-form__image_type_logedin");
        } else {
            setSubtitle('Что-то пошло не так! Попробуйте еще раз.');
            setLogedInClass("pop-up-form__image pop-up-form__image_type_rejected");
        }
    }, [])


    return (
        <section className={handleClassPopupOpen} id={`pop-up-info-tooltip`} onClick={onCloseByLayout}>
            <div className="pop-up__container">
                <button type="button" className="pop-up__button-close" onClick={onClose}></button>
                <div className="pop-up-form pop-up-form_info-tooltip">
                    <div className={logedInClass}></div>
                    <h3 className="pop-up-form__subtitle">{subtitle}</h3>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip