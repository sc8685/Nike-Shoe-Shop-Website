//importing select data with selectData.js
import { selectData } from '../store/selectData.js';

export class ShoeModel {

    //external data
    static store = selectData;

    //constructor
    constructor() {

        //assign deafult values
        this.ShoeType = "undefined";
        this.ShoeColor = "undefined";
        this.LaceColor = "undefined";
    }



    /**
     * Getter for the list of properties.
     *
     * @returns {Array} Array of property names.
     */
    getProperties() {
        return Object.keys(this);
    }



    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - The ID of the select element.
     * @returns {Array} Array of select's options (strings).
     */
    getOptions(selectID) {
        // 1. Extract the data from the external resource (ShoeModel.store).
        let options; // A JavaScript object
        switch (selectID) {
            case 'ShoeType':
                options = Object.keys(ShoeModel.store);
                break;

            case 'ShoeColor':
                options = Object.keys(ShoeModel.store[this.ShoeType]);
                break;

            case 'LaceColor':
                // Check if ShoeColor and ShoeType are defined in order to access the data
                options = this.ShoeColor !== 'undefined' && ShoeModel.store[this.ShoeType] &&
                    ShoeModel.store[this.ShoeType][this.ShoeColor] ?
                    Object.keys(ShoeModel.store[this.ShoeType][this.ShoeColor]) :
                    [];
                break;
        }

        console.log(`Options for ${selectID}:`, options);
        // 2. Return select options
        return options || [];
    }



    /**
     * Resets this object's properties to "undefined". Not all properties are
     * going to be reset, only those that are listed after the property defined 
     * by this method parameter. 
     * 
     * @param {string} property - The property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    //persist method to store data in local storage
    persist() {
        localStorage.setItem('shoe', JSON.stringify(this));
        console.log(localStorage.getItem('shoe'));

    }
}
