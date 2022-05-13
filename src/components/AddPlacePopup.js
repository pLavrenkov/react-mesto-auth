import React from "react";
import PopupWithForm from "./PopupWithForm";
import { checkTextValid, checkUrlValid, classListValidationInput } from "../utils/Validation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function AddPlacePopup({ isOpen, onClose, newCardAdd, onCloseByLayout }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isLinkValid, setIsLinkValid] = useState(false);
    const [isButtonBlocked, setIsButtonBlocked] = useState(false);
    const { register, formState: {errors}, handleSubmit } = useForm();

    function handleNameChange(event) {
        setName(register.title);
    }

    function handleLinkChange(event) {
        setLink(register.url);
    }

    function onClosePopupAddPlace() {
        onClose();
        setName('');
        setLink('');
    }

    function formSubmit(d) {
        //d.preventDefault();
        newCardAdd(d.title, d.url);
        onClosePopupAddPlace();
        console.log(errors.message);
    }

    console.log(errors.message);

    {/*   useEffect(() => {
        setIsNameValid(checkTextValid(name, 2, 21));
        setIsLinkValid(checkUrlValid(link));
        (!isNameValid || !isLinkValid ? setIsButtonBlocked(true) : setIsButtonBlocked(false));
    }, [name, link, isNameValid, isLinkValid]);*/}

    const classNameList = (isNameValid ? classListValidationInput.valid : classListValidationInput.error);
    const classLinkList = (isLinkValid ? classListValidationInput.valid : classListValidationInput.error);

    return (
        <PopupWithForm name={"newcard"} title={"Новое место"} button={"Сохранить"} isOpen={isOpen} onClose={onClosePopupAddPlace} onSubmit={handleSubmit(formSubmit)} onBlocked={isButtonBlocked} onCloseByLayout={onCloseByLayout}>
            <input type="text" className={classNameList.input} placeholder="Название" id="pop-up-form-newcard-title"
                name="title" autoComplete="off" onChange={handleNameChange} ref={
                register({
                    required: true,
                    mixLength: 2,
                    maxLength: 10
                })} />
            <ErrorMessage errors={errors} name="title" render={({ message }) => <p>{message}</p>}/>
            {/*<span className={classNameList.error}>{errors.title?.type === "minLength" && "Значение мнеьше минимального"}</span>*/}
            <input type="url" className={classLinkList.input} placeholder="Ссылка на картинку"
                id="pop-up-form-newcard-added-info" name="url" required autoComplete="url" onChange={handleLinkChange}  {...register("url")} />
            <span className={classLinkList.error}>Введите адрес в формате URL</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup