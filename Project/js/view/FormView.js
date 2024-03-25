/**
 * Represents the View. View holds refences to all GUI elements user interacts with.
 * The View exposes methods to interact with the view elements. 
 */


export class FormView {
    constructor() {
        this.inputs = null;
        this.form = document.querySelector('#form-shoe-name');
        
    }

    /**
     * Creates form inputs based on the injected JS object with data.
     * 
     * @param {Object} dataObject - JS object containing input data for this form
     * @returns {undefined}
     */
    createInputs(dataObject) {
        for (let property in dataObject) {
            let color = 'white'; //default color for input text
            this.form.querySelector('fieldset').insertAdjacentHTML('beforeend',
                `<p style='color: ${color};'>${property}
                    <input name='${property}' 
                           value='${dataObject[property]}' 
                           type='text' size='30'/>
                     <span class="validation-message error-message"></span> <!-- Validation message element -->
                 </p>`);
        }
    
        // Get all input elements after they are created
        this.inputs = this.form.querySelectorAll('input[type=text]');
    }   
    

    //checking if validation message is present to change css of input box
    updateValidationMessage(input, validationMessage) {
        const validationMessageElement = input.nextElementSibling;
        validationMessageElement.textContent = validationMessage || '';

        if (validationMessage) {
            input.classList.add('error-border');
        } else {
            input.classList.remove('error-border');
        }
    }

    
    
    
}
