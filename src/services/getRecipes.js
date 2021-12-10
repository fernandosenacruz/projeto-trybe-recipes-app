// Return a array with the number of recipes desired.
export default async function getRecipes(numberOfRecipes, URL) {
  let recipes = {};
  const NOT_FOUND = -1;
  await fetch(URL)
    .then((response) => response.json())
    .then((recipe) => {
      if (URL.indexOf('meal') !== NOT_FOUND) {
        recipes = recipe.meals;
      }
      if (URL.indexOf('cocktail') !== NOT_FOUND) {
        recipes = recipe.drinks;
      }
      recipes.splice(numberOfRecipes, Number.MAX_VALUE);
    });
  return recipes;
}
