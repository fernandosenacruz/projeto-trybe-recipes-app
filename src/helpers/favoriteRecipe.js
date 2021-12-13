const favoriteRecipe = ({ id, type, area, category, alcoholicOrNot, name, image }) => {
  const favRecipe = JSON.parse(localStorage.getItem('favRecipe')) || [];
  if (favRecipe !== [] && favRecipe.some((recipe) => recipe.id === id)) {
    const unfavorite = favRecipe.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    return './images/blackHeartIcon.svg';
  }
  localStorage.setItem(
    'favoriteRecipes', JSON.stringify(
      [...favRecipe, { id, type, area, category, alcoholicOrNot, name, image }],
    ),
  );
  return './images/whiteHeartIcon.svg';
};

export default favoriteRecipe;
