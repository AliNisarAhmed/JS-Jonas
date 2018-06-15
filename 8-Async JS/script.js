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

// async function getRecipesAW () {
//   const IDs = await getIDs;
//   console.log('IDs :', IDs);
//   const recipe = await getRecipe(IDs[2]);
//   console.log('recipe :', recipe);
//   const related = await getRelated('ali');
//   console.log('related :', related);

//   return recipe;
// }
// getRecipesAW().then(result => console.log('result :', result));


// function getWeather(woeid) {

//   fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
//   .then(result => {
//     return result.json();
//   })
//   .then(data => {
//     // console.log('data :', data);
//     const today = data.consolidated_weather[0];
//     console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);
//   })
//   .catch(error => console.log('error :', error));
// }

// // getWeather(2487956);

// fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=karachi`)
// .then(result => result.json())
// .then(data => {
//   return data[0].woeid;
// })
// .then(woeid => {
//   getWeather(woeid);
// });

async function getWeatherAW (woeid) {
  const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
  console.log('result :', result);
  const data = await result.json();
  const today = data.consolidated_weather[0];
  console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`);

  // const woeid = data[0].woeid;

  // const result2 = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
  // const data2 = await result2.json();
}

getWeatherAW(2211096);