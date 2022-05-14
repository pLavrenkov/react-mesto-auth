import React from "react";
import PopupWithForm from "./PopupWithForm";
import { checkTextValid, checkUrlValid, classListValidationInput } from "../utils/Validation";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, newCardAdd, onCloseByLayout }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isLinkValid, setIsLinkValid] = useState(false);
    const [isButtonBlocked, setIsButtonBlocked] = useState(true);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function onClosePopupAddPlace() {
        onClose();
        setName('');
        setLink('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        newCardAdd(name, link);
        onClosePopupAddPlace();
    }

    useEffect(() => {
        setIsNameValid(checkTextValid(name, 2, 21));
        setIsLinkValid(checkUrlValid(link));
        (!isNameValid || !isLinkValid ? setIsButtonBlocked(true) : setIsButtonBlocked(false));
    }, [name, link, isNameValid, isLinkValid]);

    const classNameList = (isNameValid ? classListValidationInput.valid : classListValidationInput.error);
    const classLinkList = (isLinkValid ? classListValidationInput.valid : classListValidationInput.error);

    return (
        <PopupWithForm name={"newcard"} title={"Новое место"} button={"Сохранить"} isOpen={isOpen} onClose={onClosePopupAddPlace} onSubmit={handleSubmit} onBlocked={isButtonBlocked} onCloseByLayout={onCloseByLayout}>
            <input type="text" className={classNameList.input} placeholder="Название" id="pop-up-form-newcard-title"
                name="title" required minLength="2" maxLength="30" autoComplete="off" onChange={handleNameChange} value={name} />
            <span className={classNameList.error}>{`Должно быть не менее 3х символов и не более 20ти. Сейчас символов: ${name.length}.`}</span>
            <input type="url" className={classLinkList.input} placeholder="Ссылка на картинку"
                id="pop-up-form-newcard-added-info" name="info" required autoComplete="url" onChange={handleLinkChange} value={link} />
            <span className={classLinkList.error}>Введите адрес в формате URL</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup