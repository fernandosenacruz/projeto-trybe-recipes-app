const checkIngredients = (type, recipe) => {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  if (inProgressRecipes !== []) {
    inProgressRecipes[type] = { ...inProgressRecipes[type], ...recipe };
  } else {
    inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    inProgressRecipes[type] = { ...inProgressRecipes[type], ...recipe };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes }));
};
export default checkIngredients;
