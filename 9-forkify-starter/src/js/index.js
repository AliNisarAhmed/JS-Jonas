import axios from 'axios';

// b74b520e46a90335918b9b3f83db4f74

// http://food2fork.com/api/search 

// http://food2fork.com/api/get

// https://cors-anywhere.herokuapp.com/

async function getResult(query) {
  const proxy = "https://cors-anywhere.herokuapp.com/"
  const key = "b74b520e46a90335918b9b3f83db4f74";
  try {

    const res = await axios.get(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log('recipes :', recipes);

  } catch(error) {
    alert(error);
  }
}

getResult('tomato pasta');