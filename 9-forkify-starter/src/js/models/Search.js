import axios from "axios";
import { key, proxy } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;  
  }

  async getResult() {
    

    // cors proxy = "https://cors-anywhere.herokuapp.com/"
    // cors proxy = "https://crossorigin.me/"
    const proxy = "https://cors-anywhere.herokuapp.com/"
    const key = "b74b520e46a90335918b9b3f83db4f74";
    try {
  
      const res = await axios.get(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      // console.log('recipes :', this.result);
  
    } catch(error) {
      alert(error);
    }
  }

}