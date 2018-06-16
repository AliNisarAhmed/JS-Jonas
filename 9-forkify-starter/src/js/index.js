import str from './models/Search';
import { add, multiply, ID } from "./views/searchView";
// import * as searchView from "./views/searchView"

console.log(`using imported functions add ${add(ID, 2)} and multiple ${multiply(3, 5)}, ${str}`);
