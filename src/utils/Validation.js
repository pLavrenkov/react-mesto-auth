export function checkTextValid(text, numMin, numMax) {
    if (text.length > numMin && text.length < numMax && !text.includes('   ')) {
        return true
    } else {
        return false
    };
}

export function checkUrlValid(url) {
    try {
        new URL(url);
    } catch {
        return false;
    }
    return true;
}

export const classListValidationInput = {
    valid: {
        input: "pop-up-form__field",
        error: "pop-up-form__input-error"
    },
    error: {
        input: "pop-up-form__field pop-up-form__field_type_error",
        error: "pop-up-form__input-error pop-up-form__input-error_active"
    }
}

