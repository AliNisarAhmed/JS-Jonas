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
}