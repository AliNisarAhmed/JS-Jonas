
// ====== BUDGET Controller ====== //

const budgetController = (function () {
 
})();




// ====== UI Controller ====== //

const UIController = (function() {

  const DOMStrings = {
    inputType : '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
  }

  return {
    getInput : function () {
      const type = document.querySelector(DOMStrings.inputType).value; // will be either inc or exp

      const description = document.querySelector(DOMStrings.inputDescription).value;

      const value = document.querySelector(DOMStrings.inputValue).value;

      return {
        type: type,
        description: description,
        value: value
      };
    },

    getDOMStrings: function() {
      return DOMStrings;
    },

  };

})();



// ====== APP Controller ====== //

const controller = (function(bdgtCntrl, UICntrl) {

  const setupEventListeners = function() {
   
    const DOM = UICntrl.getDOMStrings();
    
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if(event.key === "Enter") {
        ctrlAddItem();
      }
    });   
  
  
  };

  const ctrlAddItem = function () {

    // 1. Get the field input data

    const input = UICntrl.getInput();


    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the Budget

    // 5. Display the budget in the UI
  }
  
  return {
    init: function() {
      console.log("Application has started");
      setupEventListeners();
    }
  }; 

})(budgetController, UIController);


controller.init();