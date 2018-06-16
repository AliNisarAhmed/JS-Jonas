import Search from "./models/Search"


/* GLOBAL STATE of the app
    - Search Object
    - Current Recipe object
    - Shopping List Object
    - Liked recipes 
*/
const state = {};

const controlSearch = async () => {
  // 1) get query from view

  const query = 'pizza' //TODO

  if (query) {
    // 2) create new search object and add to state
    state.search = new Search(query);

    // 3) Pprepare Ui for results

    // 4) search for recipes
    await state.search.getResult();

    // 5) render results on UI
    console.log('state.search.result :', state.search.result);

  }
}

document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault();
  controlSearch();
})
