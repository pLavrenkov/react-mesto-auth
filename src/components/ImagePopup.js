function ImagePopup({ onClose, cardAttributes, isOpen, onCloseByLayout, }) {
    const cardData = {
        name: '',
        link: ''
    }

    if (cardAttributes) {
        cardData.name = cardAttributes.name;
        cardData.link = cardAttributes.link
    }

    const imageClassList = (isOpen ? "pop-up pop-up_opened" : "pop-up");

    return (
        <section className={imageClassList} id="pop-up-image-view" onClick={onCloseByLayout} >
            <div className="pop-up__container">
                <button type="button" className="pop-up__button-close" onClick={onClose} ></button>
                <figure className="pop-up-picture">
                    <img className="pop-up-picture__photo" alt="Место большое фото" src={cardData.link} />
                    <figcaption className="pop-up-picture__caption">{cardData.name}</figcaption>
                </figure>
            </div>
        </section>
    )
}

export default ImagePopup