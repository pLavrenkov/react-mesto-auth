import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { checkTextValid, classListValidationInput } from "../utils/Validation";
import { useState, useContext, useEffect } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseByLayout, onCloseByEsc }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    const handleNameValue = (isOpen ? name : '');
    const handleAboutValue = (isOpen ? description : '');

    useEffect(() => {
        setIsNameValid(checkTextValid(name, 2, 21));
        setIsDescriptionValid(checkTextValid(description, 2, 41));
        (!isNameValid || !isDescriptionValid ? setIsButtonBlocked(true) : setIsButtonBlocked(false));
    }, [name, description, isNameValid, isDescriptionValid]);

    const classNameList = (isNameValid ? classListValidationInput.valid : classListValidationInput.error);
    const classDescriptionList = (isDescriptionValid ? classListValidationInput.valid : classListValidationInput.error);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser(name, description);
    }

    return (
        <PopupWithForm name={"profile"} title={"Редактировать профиль"} button={"Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} onBlocked={isButtonBlocked} onCloseByLayout={onCloseByLayout} onCloseByEsc={onCloseByEsc} >
            <input type="text" className={classNameList.input} placeholder="Введите другое имя" id="pop-up-form-profile-title"
                name="title" required minLength="2" maxLength="40" autoComplete="name" onChange={handleNameChange} value={handleNameValue} />
            <span className={classNameList.error}>{`Должно быть не менее 3х символов и не более 20ти. Сейчас символов: ${name.length}.`}</span>
            <input type="text" className={classDescriptionList.input} placeholder="Введите занятие" id="pop-up-form-profile-added-info"
                name="info" required minLength="2" maxLength="200" autoComplete="off" onChange={handleDescriptionChange} value={handleAboutValue} />
            <span className={classDescriptionList.error}>{`Должно быть не менее 3х символов и не более 40ка. Сейчас символов: ${description.length}.`}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup