

//===================================
// ====== BUDGET Controller ====== //
//===================================


const budgetController = (function () {
  
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }

    calcPercentage(totalIncome) {

      if(totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    }
    
    getPercentage() {
      return this.percentage;
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
    },
    budget: 0,
    percentage: -1,
  }

  const calculateTotal = function(type) {
    
    data.totals[type] = data.allItems[type].reduce((a, x) => a + x.value, 0);

  }

  return {
    addItem: function(type, desc, val) { // add exp or inc in database and returns it
      
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

      // Return  the new Element
      return newItem;
      
    },

    deleteItem: function(type, id) {  // receives type and id from controller when user clicks the delete button on a particular entry

      let itemIndex = data.allItems[type].findIndex(item => item.id === id);
      data.allItems[type].splice(itemIndex, 1);

    },
    
    calculateBudget: function() {

      // calculate total inc and exp

      calculateTotal('inc');
      calculateTotal('exp');

      // calculate budget = total inc - total exp

      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage of income that we have spent
      if(data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

    },

    calculatePercentages: function() {

      data.allItems.exp.forEach(cur => cur.calcPercentage(data.totals.inc));

    },

    getPercentages: function() {

      return data.allItems.exp.map(cur => cur.getPercentage());

    },

    getBudget: function() {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
      } 
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
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  function formatNumber(num, type) { // format all numbers in +/- x,000.00

    num = Math.abs(num).toFixed(2);  //toFixed converts num to string
    let [int, dec] = num.split('.');
    
    if(int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3);
    } 
    
    // else if(int.length > 6) {
    //   int = int.substr(0, int.length - 6) + ',' + int.substr(int.length - 6, int.length - 3) + int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3); 
    // }

    let sign = type === 'exp' ? '-' : '+';

    return sign + ' ' + int + '.' + dec;
  }

  return {

    getInput : function () {  // gets user input from the 3 fields
      const type = document.querySelector(DOMStrings.inputType).value; // will be either inc or exp

      const description = document.querySelector(DOMStrings.inputDescription).value;
 
      const value = parseFloat(document.querySelector(DOMStrings.inputValue).value);

      return {
        type,
        description,
        value,
      };
    },

    getDOMStrings: function() { 
      return DOMStrings;
    },

    addListItem: function(obj, type) {  // add new item into html as either inc or exp

      let html, element;

      // Create HTML string with placeholder text
      if(type === 'inc') {

        element = DOMStrings.incomeContainer;

        html =  `<div class="item clearfix" id="inc-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${formatNumber(obj.value, type)}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;

      } else {

        element = DOMStrings.expensesContainer;

        html =  `<div class="item clearfix" id="exp-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${formatNumber(obj.value, type)}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }
      
      // replace the placeholder text with some actual data
      
      // Done with template strings
      
      // Insert HTML into the DOM
      
      document.querySelector(element).insertAdjacentHTML('beforeend', html);

    },

    deleteListItem: function(selectorID) {

      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el)

    },

    clearFields: function() {  // clear the fields once user has clicked or pressed Enter

      let fields = Array.from(document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue));  // IMPORTANT

      for(let elem of fields) {
        elem.value = '';
      }

      fields[0].focus();  // to bring focus back to the decription field

    },

    displayBudget: function(obj) { // displays budget on html, receives budgetObj, which is the output of getBudget method on budgetController

      let type = obj.budget > 0 ? 'inc' : 'exp'; 

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
      document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
      
      if(obj.percentage > 0) {
        
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';

      } else {

        document.querySelector(DOMStrings.percentageLabel).textContent = '--';

      }

    },

    displayPercentages: function(percentages) {

      let fields = Array.from(document.querySelectorAll(DOMStrings.expensesPercentageLabel));
      
      fields.forEach((field, i) => field.textContent = percentages[i] + "%");

    },

    displayMonth: function() {
      let now = new Date();

      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', "September", 'October', "November", "December",]

      let year = now.getFullYear();
      let month = now.getMonth();
      document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
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
  
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

  };

  const updateBudget = function() {

    // 1. Calculate the Budget

    bdgtCntrl.calculateBudget();

    // 2. Returns the budget

    const budgetObj = bdgtCntrl.getBudget();

    // 5. Display the budget in the UI

    UICntrl.displayBudget(budgetObj);
  
  };

  const updatePercentages = function() {

    // Calculate Percentages

    bdgtCntrl.calculatePercentages();

    // read percentages from Budget Controller

    let percentages = bdgtCntrl.getPercentages();

    // Update UI

    UICntrl.displayPercentages(percentages);

  };

  const ctrlAddItem = function () {

    let input, newItem;

    // 1. Get the field input data

    input = UICntrl.getInput();

    if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller

      newItem = bdgtCntrl.addItem(input.type, input.description, input.value)

      // 3. Add the item to the UI

      UICntrl.addListItem(newItem, input.type);

      // 3a. Clear the fields

      UICntrl.clearFields();

      // The last two steps of calculating the budget and updating the UI have been moved to a separate function so that the func may be used when we delete the entries.

      // calculate and update Budget

      updateBudget();

      // Calculate and update percentages

      updatePercentages();

    }
    
  }

  const ctrlDeleteItem = function(event) {
    
    let clickedItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(clickedItemID) {

      // inc-id or exp-id is the format of ID returned from html node
      let [type, ID] = clickedItemID.split('-');

      // delete item frm the database

      bdgtCntrl.deleteItem(type, Number(ID));

      // delete item from the UI

      UICntrl.deleteListItem(clickedItemID);

      // update and show the new Budget

      updateBudget();

      // Calculate and update percentages

      updatePercentages();

    }
  
  };
  
  return {
    init: function() {
      console.log("Application has started");
      UICntrl.displayMonth();
      UICntrl.displayBudget({
        budget: 0,
        percentage: -1,
        totalIncome: 0,
        totalExpenses: 0,
      });
      setupEventListeners();
    }
  }; 

})(budgetController, UIController);


controller.init();