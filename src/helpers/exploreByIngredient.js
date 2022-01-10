const mealOrCocktail = (string) => {
  let mealsOrCocktails = '';
  if (string === 'comida') {
    mealsOrCocktails = 'meal';
  } else {
    mealsOrCocktails = 'cocktail';
  }
  return mealsOrCocktails;
};

export const fecthIngredientName = async (ingredient) => {
  const MAX_INGREDIENTS = 12;
  let ingredients;
  const response = await (await fetch(`https://www.the${mealOrCocktail(ingredient)}db.com/api/json/v1/1/list.php?i=list`)).json();
  if (ingredient === 'comida') {
    ingredients = response.meals
      .filter((_, index) => index < MAX_INGREDIENTS)
      .map(({ strIngredient }) => strIngredient);
  } else {
    ingredients = response.drinks
      .filter((_, index) => index < MAX_INGREDIENTS)
      .map(({ strIngredient }) => strIngredient);
  }
  return ingredients;
};

export const fecthIngredientIMG = async (arr = [], string) => {
  const response = arr
    .map(async (ingredient) => fetch(`https://www.the${mealOrCocktail(string)}db.com/images/ingredients/${ingredient}-Small.png`));
  const data = await Promise.all(response);
  return data.map(({ url }) => url);
};

export const fetchRecipesByIngredient = async (ingredient, string) => {
  const response = await (await fetch(`https://www.the${mealOrCocktail(string)}db.com/api/json/v1/1/filter.php?i=${ingredient}`)).json();
  if (string === 'comida') {
    return response.meals;
  }
  return response.drinks;
};
