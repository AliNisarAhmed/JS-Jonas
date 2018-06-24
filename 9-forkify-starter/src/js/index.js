import Search from "./models/Search"
import * as searchView from "./views/searchView";
import { elements, renderLoader, elementStrings, clearLoader } from "./views/base";
import Recipe from "./models/Recipe"


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

    //create new recipe object

    state.recipe = new Recipe(id);

    try {
      
      // get recipe data and parse ingredients
      
      await state.recipe.getRecipe();
      console.log('state.recipe.ingredients :', state.recipe.ingredients);
      state.recipe.parseIngredients();  

      // calculate servings and time
  
      state.recipe.calcTime();
      state.recipe.calcServings();
  
      //render recipe
      
      console.log(state.recipe);
    
    } catch (error) {
      console.log('error :', error);
      alert('error processing recipe')
    }

  }
}

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))