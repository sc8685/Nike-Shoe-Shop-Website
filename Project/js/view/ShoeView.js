
/**
 * View class for managing the shoe-related user interface.
 *
 * @class
 */
export class ShoeView {

    //contructor
    constructor() {

        //get ids with query selector
        this.myForm = document.querySelector("#myForm");
        this.shoeImage = document.querySelector("#div-shoe");
        this.selectsDiv = document.querySelector("#div-selects");
        this.selects = null;
       
    }

    /**
     * Renders HTML select elements. The options are not loaded in the process,
     * meaning that there are no Option elements as part of the select element.
     *  
     * @param {Array} selectIDs - Array of strings (select ids).
     */
    renderSelects(selectIDs) {
        selectIDs.forEach((name) => {
            let select = document.createElement('select');
            select.setAttribute("id", name);
            select.options.add(new Option(` Select a ${name} `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });

        this.selects = this.selectsDiv.querySelectorAll('select');
    }



    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - The ID of the select which next siblings are going to be reset.
     */
    resetNextSiblings(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        let nextSelect = select.nextElementSibling;
        while (nextSelect) {
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }
    }



    /**
     * Adds options to a select.
     * 
     * @param {String} selectID - The ID of the select element.
     * @param {Array} options - Array of strings (option names).
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.length = 1;
        options.forEach((option) => {
            select.options.add(new Option(option, option));
        });
    }



    /**
     * Renders the shoe image based on the selected options in the dropdowns.
     */
    renderShoe() {
        let imgSrc = 'media/';

        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`;
            this.shoeImage.querySelector('img').src = imgSrc.slice(0, -1) + '.jpg';
        });
    }


}
