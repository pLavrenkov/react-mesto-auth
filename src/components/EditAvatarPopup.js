import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { checkUrlValid, classListValidationInput } from "../utils/Validation";
import { useState, useContext, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onCloseByLayout }) {
    const currentUser = useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState('');
    const [isUrlValid, setIsUrlValid] = useState(true);
    const [isButtonBlocked, setIsButtonBlocked] = useState(true);

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, []);

    function handleAvatarChange(event) {
        setAvatar(event.target.value);
    }

    function onCloseAvatarPopup() {
        onClose();
        setAvatar('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar(avatar);
        setAvatar('');
    }

    useEffect(() => {
        setIsUrlValid(checkUrlValid(avatar));
        (!isUrlValid ? setIsButtonBlocked(true) : setIsButtonBlocked(false));
    }, [avatar, isUrlValid]);

    const classUrlList = (isUrlValid ? classListValidationInput.valid : classListValidationInput.error);
    
    return (
        <PopupWithForm name={"avatar-edit"} title={"Обновить аватар"} button={"Сохранить"} isOpen={isOpen} onClose={onCloseAvatarPopup} onSubmit={handleSubmit} onBlocked={isButtonBlocked} onCloseByLayout={onCloseByLayout}>
            <input type="url" className={classUrlList.input} placeholder="Ссылка на картинку" id="pop-up-form-avatar-url"
                name="info" required autoComplete="url" onChange={handleAvatarChange} value={avatar} />
            <span className={classUrlList.error}>Введите адрес в формате URL</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup