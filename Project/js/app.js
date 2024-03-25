// Importing necessary modules
import { ShoeView } from './view/ShoeView.js';
import { ShoeController } from './controller/ShoeController.js';
import { ShoeModel } from './model/ShoeModel.js';

import { FormView } from './view/FormView.js';
import { FormController } from './controller/FormController.js';
import { FormModel } from './model/FormModel.js';
import { FormValidator } from './validator/FormValidator.js';


class App {

    //contructor
    constructor() {

        
        const url = window.location.href;
        const page = url.match(/[a-z]+.html/)[0];

        //switch case to decide which controller is for which html
        switch (page) {
            case 'index.html':
                new ShoeController(new ShoeModel(), new ShoeView());
                break;
            case 'form.html':
                new FormController(new FormModel(), new FormView(), new FormValidator());
                break;
        }
    }
}

const app = new App();
