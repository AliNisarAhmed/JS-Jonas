

//===================================
// ====== BUDGET Controller ====== //
//===================================


const budgetController = (function () {
  
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  const data = {

    allItems: {
      exp: [],
      inc: [],  
    },
    totals: {
      exp: 0,
      inc: 0,
    }
  }

  return {
    addItem: function(type, desc, val) {
      
      let newItem, ID;

      // Create new ID based on last ID + 1 of the existing
      if(data.allItems[type].length) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      


      // Create new Item based on whether type is 'inc' or 'exp'
      if(type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if(type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      // Push it into Data Struct
      data.allItems[type].push(newItem);
      // data.totals[type] += val;

      // Return  the new Element
      return newItem;
      
    }, 

    testing: function() {
      console.log(data);
    },

  };

})();


//=================================================
// ================ UI Controller ============== //
//=================================================


const UIController = (function() {

  const DOMStrings = {
    inputType : '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
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

    addListItem: function(obj, type) {

      let html, element;

      // Create HTML string with placeholder text
      if(type === 'inc') {

        element = DOMStrings.incomeContainer;

        html =  `<div class="item clearfix" id="income-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;

      } else {

        element = DOMStrings.expensesContainer;

        html =  `<div class="item clearfix" id="expense-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__percentage">21%</div><div class="item__delete">          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }
      
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
      // replace the placeholder text with some actual data

          // Done with template strings

      // Insert HTML into the DOM


    }

  };

})();


//===============================================
// ============== APP Controller ============= //
//===============================================


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

    let input, newItem;

    // 1. Get the field input data

    input = UICntrl.getInput();


    // 2. Add the item to the budget controller

    newItem = bdgtCntrl.addItem(input.type, input.description, input.value)

    // 3. Add the item to the UI

    UICntrl.addListItem(newItem, input.type);

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