/**
 * Controller class for managing shoe-related functionality.
 *
 * @class
 */
export class ShoeController {



  /**
  * Creates an instance of ShoeController.
  *
  * @constructor
  * @param {ShoeModel} model - The shoe model instance.
  * @param {ShoeView} view - The shoe view instance.
  */
  constructor(model, view) {

    this.model = model;
    this.view = view;

    // 1. render all selects
    let properties = this.model.getProperties();
    this.view.renderSelects(properties);

    // 2. populate the first select
    let firstSelectID = properties[0];
    this.view.addOptions(firstSelectID, this.model.getOptions(firstSelectID));

    // 3. register one event handler for all select 'change' events
    this.view.selects.forEach((select) => {
      select.addEventListener('change', this.handleSelectChange);
    });

    // 4. register form submit handler
    this.view.myForm.addEventListener('submit', this.handleFormSubmit);


  }



  /**
   * Handles the change event on a select element.
   *
   * @param {Event} event - The change event.
   */
  handleSelectChange = (event) => {
    let select = event.target;

    // 1. UPDATE MODEL ------------------------------------------------------
    // Once the current model property is updated, the other model properties
    // that are defined after the current property need to be reset to "undefined".
    this.model[select.id] = select.value;
    this.model.resetNextProperties(select.id);
    console.log(this.model);

    // 2. UPDATE VIEW (selectsDiv + shoeDiv -------------------------------    

    // 2.1 Update the selectsDiv - reset next selects & load new options into
    // the next select only if the current selected option is different than 
    // '-- Select the ... --', whose index is 0.
    this.view.resetNextSiblings(select.id);
    let nextSelect = select.nextElementSibling;
    if (select.selectedIndex > 0 && nextSelect) {
      this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
    }

    // 2.2 Update the shoeDiv 
    this.view.renderShoe();
  }



  /**
   * Handles the form submission event.
   *
   * @param {Event} event - The form submission event.
   */
  handleFormSubmit = (event) => {
    // Prevent the default action of a form (prevent submitting it).
    // event.preventDefault();
    this.model.persist();


  }




}
