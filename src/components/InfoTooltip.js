import React from "react";
import { useState, useEffect } from "react";

function InfoTooltip( {isOpen, isRegistred, onClose, onCloseByLayout} ) {
    const [subtitle, setSubtitle] = useState('');
    const [loggedInClass, setLoggedInClass] = useState('');
    const handleClassPopupOpen = (isOpen ? "pop-up pop-up_opened" : "pop-up");
  
    useEffect(() => {
        if (isRegistred) {
            setSubtitle('Вы успешно зарегистрировались!');
            setLoggedInClass("pop-up-form__image pop-up-form__image_type_logedin");
        } else {
            setSubtitle('Что-то пошло не так! Попробуйте еще раз.');
            setLoggedInClass("pop-up-form__image pop-up-form__image_type_rejected");
        }
    }, [handleClassPopupOpen])


    return (
        <section className={handleClassPopupOpen} id={`pop-up-info-tooltip`} onClick={onCloseByLayout}>
            <div className="pop-up__container">
                <button type="button" className="pop-up__button-close" onClick={onClose}></button>
                <div className="pop-up-form pop-up-form_info-tooltip">
                    <div className={loggedInClass}></div>
                    <h3 className="pop-up-form__subtitle">{subtitle}</h3>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip