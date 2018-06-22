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

    // 4) search for recipes
    await state.search.getResult();

    // 5) render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
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

const r = new Recipe(35477);
r.getRecipe();
console.log(r);