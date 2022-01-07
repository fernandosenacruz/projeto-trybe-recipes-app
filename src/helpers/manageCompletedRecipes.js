// first parameter: 'add' to add a new recipe to the completed list.
// 'remove' to remove a previous completed recipe from the list
// second parameter: a object with the following format:
// const recipeFav = {
//   id:
//   type: 'comida' || 'bebida'
//   area:
//   category:
//   alcoholicOrNot:
//   name:
//   image:
//   tags:
// };

const manageCompletedRecipes = (operation, recipe) => {
  const op = operation.toLowerCase();
  const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  if (compRecipe !== [] && compRecipe.some((item) => item.id === recipe.id
  && item.type === recipe.type && op === 'remove')) {
    const newCompleted = compRecipe.filter((item) => item.id !== recipe.id
    || item.type !== recipe.type);
    localStorage.setItem('doneRecipes', JSON.stringify(newCompleted));
    return 'removed succesfully';
  }
  if (compRecipe !== [] && compRecipe.some((item) => item.id === recipe.id
  && item.type === recipe.type && op === 'add')) {
    return 'already completed';
  }
  localStorage.setItem(
    'doneRecipes', JSON.stringify(
      [...compRecipe, recipe],
    ),
  );
  return 'added succesfully';
};

export default manageCompletedRecipes;
