/**
 * Responds to user inputs. Here, we use the FormData, a JS built-in class that 
 * provides a way to easily construct a set of key/value pairs representing form 
 * fields and their values.
 */
export class FormController {

    //contructor
    constructor(model, view, validator) {
        this.model = model;
        this.view = view;
        this.view.createInputs(this.model.getInputData());
        this.validator = validator;
        this.bindInputEvents();
        this.bindFormSubmit();

        // register one event handler for all input 'change' events
        this.view.inputs.forEach((input) => {
            input.addEventListener('change', this.handleInputChange);
        });

        // register form submit handler
        this.view.form.addEventListener('submit', this.handleFormSubmit);

    }

    // Adds 'input' event listeners to each input element in the form view.
    bindInputEvents() {
        this.view.inputs.forEach((input) => {
            input.addEventListener('input', this.handleInputChange);
        });
    }

    // Adds a 'submit' event listener to the form element in the form view.
    bindFormSubmit() {
        this.view.form.addEventListener('submit', this.handleFormSubmit);
    }


    /**
     * Handles the input change event.
     * 
     * @param {Event} event - The input change event.
     * @returns {void}
     */
    handleInputChange = (event) => {
        const input = event.target;
        const propertyName = input.getAttribute('name');
        const value = input.value;
        const validationMessage = this.validator.validateInput(propertyName, value);

        this.view.updateValidationMessage(input, validationMessage);
    }

    /**
     * Handles the form submission event.
     * 
     * @param {Event} event - The form submission event.
     * @returns {void}
     */
    handleFormSubmit = (event) => {
        event.preventDefault();

        // Check if any validation messages are displayed
        const validationMessagesDisplayed = Array.from(this.view.inputs)
            .some(input => input.nextElementSibling.textContent.trim() !== '');

        // If validation messages are displayed, do not save data
        if (validationMessagesDisplayed) {
            console.log("Validation errors exist. Data not saved.");
            return;
        }

        // Update model with current form data
        this.view.inputs.forEach((input) => {
            const propertyName = input.getAttribute('name');
            const value = input.value;
            this.model[propertyName] = value;
        });

        // Persist the form data
        this.model.persist();
    }

}