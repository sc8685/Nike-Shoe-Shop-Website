export class FormValidator {

    //constructor to assign error message values
    constructor() {
        this.validationMessages = {
            Name: "Name can only contain letters and needs to start with a capital letter.",
            PhoneNumber: "Phone number must be in the format: xxx-xxx-xxxx.",
            CardNumber: "Card number must be in the format: xxxx-xxxx-xxxx-xxxx."
        };
    }

    /**
     * Validates the input value based on the input name.
     * 
     * @param {string} name - The name of the input field.
     * @param {string} value - The value of the input field.
     * @returns {string|null} - The validation message or null if the input is valid.
     */
    validateInput(propertyName, value) {
        switch (propertyName) {
            case "Name":
                return this.validateName(value);
            case "PhoneNumber":
                return this.validatePhoneNumber(value);
            case "CardNumber":
                return this.validateCardNumber(value);
            default:
                return null;
        }
    }

    /**
     * Validates the name input.
     * 
     * @param {string} value - The value of the name input field.
     * @returns {string|null} - The validation message or null if the input is valid.
     */
    validateName(value) {
        //First letter capital, only letter can be used
        const nameRegex = /^[A-ZČĆŽŠĐ][a-za-zčćžšđ\s]*$/;
        if (!nameRegex.test(value)) {
            return this.validationMessages.Name;
        }
        return null;
    }


    /**
     * Validates the phone number input.
     * 
     * @param {string} value - The value of the phone number input field.
     * @returns {string|null} - The validation message or null if the input is valid.
     */
    validatePhoneNumber(value) {
        //must be in the correct format
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            return this.validationMessages.PhoneNumber;
        }
        return null;
    }

    /**
     * Validates the credit card number input.
     * 
     * @param {string} value - The value of the credit card number input field.
     * @returns {string|null} - The validation message or null if the input is valid.
     */
    validateCardNumber(value) {
        //must be in the correct format
        const cardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!cardRegex.test(value)) {
            return this.validationMessages.CardNumber;
        }
        return null;
    }
}
