const teste = (func, x, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || false;
  const checkedDrinkOrMealExists = inProgressRecipes
      !== undefined;
  const drinkOrMealExists = inProgressRecipes[x][id] !== undefined;
  if (inProgressRecipes
        && drinkOrMealExists
        && checkedDrinkOrMealExists) func(...inProgressRecipes[x][id]);
};
export default teste;
