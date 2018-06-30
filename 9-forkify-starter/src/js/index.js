import Search from "./models/Search"
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import { elements, renderLoader, elementStrings, clearLoader } from "./views/base";
import Recipe from "./models/Recipe";
import List from "./models/List";


/* GLOBAL STATE of the app
    - Search Object
    - Current Recipe object
    - Shopping List Object
    - Liked recipes 
*/
const state = {};


// ================================================================
// Search Controller

//================================================================

const controlSearch = async () => {
  // 1) get query from view

  const query = searchView.getInput();

  if (query) {
    // 2) create new search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearPreviousResults();
    renderLoader(elements.searchRes);

    try {

      // 4) search for recipes
      await state.search.getResult();
  
      // 5) render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      
    } catch (error) {
      console.log('error :', error);
      alert("something wrong with the search");
      clearLoader()
    }

  }
}

elements.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  controlSearch();
})



elements.searchResPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline')
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearPreviousResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

//=========================================================================
// - Recipe Controller
//====================================================================

const controlRecipe = async () => {
  
  // GET THE RECIPE ID FROM THE URL
  const id = window.location.hash.replace("#", "");
  console.log('id :', id);


  if (id) {
    
    // prepare UI for changes

    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    
    // Highlighted selected Recipe

    if (state.search) {
      searchView.highlightSelected(id);
    }

    //create new recipe object

    state.recipe = new Recipe(id);

    try {
      
      // get recipe data and parse ingredients
      
      await state.recipe.getRecipe();
      // console.log('state.recipe.ingredients :', state.recipe.ingredients);
      state.recipe.parseIngredients();  

      // calculate servings and time
  
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      //render recipe
      
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    
    } catch (error) {
      console.log('error :', error);
      alert('error processing recipe')
    }

  }
}

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//=============================================================================
// - List Controller
//=============================================================================

const controlList = () => {
  // create a new list if there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list
  state.recipe.ingredients.forEach( el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
};

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id);

    // Delete from UI
    listView.deleteItem(id);

    // Handle Count update
  } else if (e.target.matches('.shopping__count--value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
})


// Handling recipe servings button clicks

elements.recipe.addEventListener('click', e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {

    // Decrease button is clicked

    if (state.recipe.servings > 1) {

      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }

  
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    
    // Increase button is clicked

    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }

});

window.l = new List();