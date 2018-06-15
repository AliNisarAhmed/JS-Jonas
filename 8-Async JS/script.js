// function getRecipe() {

//   setTimeout(() => {
//       const recipeID = [523, 883, 432, 974];
//       console.log('recipeID :', recipeID);

//       setTimeout((id) => {
//         const recipe = {
//           title: 'fresh tomato pasta',
//           publisher: 'ali',
//         }
//         console.log(`${id}: ${recipe.title}`);

//         setTimeout(publisher => {
//           const recipe2 = {
//             title: 'Italian Pizza',
//             publisher: 'ali',
//           };
//           console.log('recipe2 :', recipe2);
//         }, 1500, recipe.publisher)

//       }, 1500, recipeID[2]);


//     }, 1500);
// }

// getRecipe();
const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([523, 883, 432, 974]);
  }, 1500)
});

const getRecipe = recID => {
  return new Promise((resolve, reject) => {
    setTimeout(ID => {
      const recipe = {
      title: 'fresh tomato pasta',
        publisher: 'ali',
      };
      resolve(recipe);

    }, 1500, recID)
  });
};

const getRelated = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(pub => {
      const recipe2 = {
        title: 'Italian Pizza',
        publisher: 'ali',
      };
      resolve(`${pub}: ${recipe2.title}`);
    }, 1500, publisher)
  });
};

// getIDs
//   .then(IDs => {
//     console.log('IDs :', IDs);
//     return getRecipe(IDs[2]);
//   })
//   .then(recipe => {
//     console.log('recipe :', recipe);
//     return getRelated(recipe.publisher)
//   })
//   .then(recipe2 => {
//     console.log('recipe2 :', recipe2);
//   })
//   .catch(error => {
//     console.log('error :', error);
//   });

async function getRecipesAW () {
  const IDs = await getIDs;
  console.log('IDs :', IDs);
  const recipe = await getRecipe(IDs[2]);
  console.log('recipe :', recipe);
  const related = await getRelated('ali');
  console.log('related :', related);

  return recipe;
}
getRecipesAW().then(result => console.log('result :', result));