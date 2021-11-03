function validateForm(paramsDto) { // dto = data transfer object
    let childs = [...document.getElementById(paramsDto.formId).children]
        .filter(child => child.nodeName === "INPUT")

    let formIsValid = function (inputElement) {
        let isValid = true;
        const inputValue = inputElement.value;
        const validator = inputElement.dataset.validator;
        switch(validator) {
            case 'number':
                isValid = /^\d+$/.test(inputValue);

                const minValue = inputElement.dataset.validatorMin;
                const maxValue = inputElement.dataset.validatorMax;

                if (isValid && minValue) {
                    isValid = parseInt(inputValue, 10) > minValue;
                }

                if (isValid && maxValue) {
                    isValid = parseInt(inputValue, 10) < maxValue;
                }
                break;
            case 'letters':
                isValid = /^[a-z]+$/i.test(inputValue);
                break;
            case 'regexp':
                isValid = RegExp(inputElement.dataset.validatorPattern).test(inputValue);
                break;
        }
        return isValid;
    }

    let validateFunction = function (input) {
        if (formIsValid(input)) {
            input.classList.remove(paramsDto.inputErrorClass)
        } else {
            input.classList.add(paramsDto.inputErrorClass)
        }
    }

    childs.forEach(child => {
        child.onblur = function () {
            validateFunction(child)
        }
    })

    let form = document.getElementById(paramsDto.formId)
    form.onsubmit = function () {
        if (childs.some(input => !formIsValid(input))) {
            form.classList.add(paramsDto.formInvalidClass)
            form.classList.remove(paramsDto.formValidClass)
        } else {
            form.classList.remove(paramsDto.formInvalidClass)
            form.classList.add(paramsDto.formValidClass)
        }

        return false
    }
}
