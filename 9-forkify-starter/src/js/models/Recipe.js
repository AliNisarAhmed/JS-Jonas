import axios from 'axios';
import { key, proxy } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios.get(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
      console.log('res :', res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      // console.log('error :', error);
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    //assuming for every 3 ingredients it takes 15 minuetes
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {

    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'ozs'];
    const unitsShort = ['tbsp', 'tblsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'oz']

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform Units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i])
      });

      // 2) remove Parentheses

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

      // 3) Parse ingredients into count, units and ingredients
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el => unitsShort.includes(el));

      let objIng;
      if (unitIndex > -1) {
        // there is a unit
        // if "4 cups", arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex); //  Ex. 4 1/2 cups, arrCount will be [4, 1/2]

        let count;
        if (arrCount === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
          
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        }

      } else if (parseInt(arrIng[0], 10)) {
        // There is NO unit, but the first element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1,).join(' '),
        }
      } else if (unitIndex === -1) {
        //means there is no unit in ingredient and no number
        objIng = {
          count: 1,
          unit: '',
          ingredient, 
        }
      }


      return objIng;
    });

    this.ingredients = newIngredients;
  }
}