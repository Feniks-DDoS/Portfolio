const rootSelector = `[data-js-contact-form]`

class FormValidate {

    selectors = {
        root: rootSelector,
        fieldErrors: `[data-js-form-errors]`
    }

    errorMessages = {
        tooShort: ({ minLength }) => `Min character ${minLength}`,
        tooLong: ({ maxLength }) => `Max character ${maxLength}`,
        patternMismatch: ({ title }) => title || 'Incorrect value',
        valueMissing: () => 'Incorrect value',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.bindEvents()
        this.inputName()
    }


    manageError(fieldControlElement , errorMessages) {
        const fieldControlError = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors)

        fieldControlError.innerHTML = errorMessages
        .map((message) => `<span class="field__erorrs">${message}</span>`)
        .join("")
    }

    inputName() {
        const userNameControl = this.rootElement.querySelector('#user-Name')

        userNameControl.addEventListener('keypress' , (event) => {
            if(/\d/.test(event.key)) {
                event.preventDefault()
            }
        })
    }

    validate(fieldControlElement) {
        const error = fieldControlElement.validity

        const errorMessages = []

        Object.entries(this.errorMessages).forEach(([errorType, getMessage]) => {
            if(error[errorType]) {
                errorMessages.push(getMessage(fieldControlElement))
            }
        })

        const isValid = errorMessages.length === 0

        fieldControlElement.ariaInvalid = !isValid

        this.manageError(fieldControlElement , errorMessages)

        return isValid
    }

    onBlur(event) {
        const { target } = event
        const isRequired = target.required
        const isFormElement = target.closest(this.selectors.root) 

        if(isFormElement && isRequired && target.value.trim() !== '') {
            this.validate(target)
        }
    }

    onSubmit(event) {
        const { target } = event

        const isFormElement = target.closest(this.selectors.root)

        if(!isFormElement) return

        const isAllRequired = [...target.elements].filter(({required}) => required)

        let isFormValid = true
        let isFirstInvalidElement = null

        isAllRequired.forEach((element) => {
            const isFieldValid = this.validate(element)

            if(!isFieldValid) {
                isFormValid = false
                
                if(!isFirstInvalidElement) {
                    isFirstInvalidElement = element
                }
            }
        })

        if(!isFormValid) {
            event.preventDefault()
            isFirstInvalidElement.focus()
        }
    }

    bindEvents() {
        document.addEventListener('blur' , (event) => {
            this.onBlur(event)
        }, true)
        document.addEventListener('submit' , (event) => this.onSubmit(event))
    }

}

class FormValidateCollection {
            constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new FormValidate(element)
        })
    }
}

export default FormValidateCollection