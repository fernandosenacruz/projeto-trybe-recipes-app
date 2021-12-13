const favoriteRecipe = (id, type) => {
  const favRecipe = JSON.parse(localStorage.getItem('favRecipe')) || [];
  if (favRecipe !== [] && favRecipe.some((recipe) => recipe.id === id)) {
    const unfavorite = favRecipe.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favRecipe', JSON.stringify(unfavorite));
    return './images/blackHeartIcon.svg';
  }
  localStorage.setItem('favRecipe', JSON.stringify([...favRecipe, { id, type }]));
  return './images/whiteHeartIcon.svg';
};

export default favoriteRecipe;
