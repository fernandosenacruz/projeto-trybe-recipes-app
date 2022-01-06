import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const favoriteRecipe = ({ id, type, area, category, alcoholicOrNot, name, image }) => {
  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favRecipe !== [] && favRecipe.some((recipe) => recipe.id === id)) {
    const unfavorite = favRecipe.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    return whiteHeart;
  }
  localStorage.setItem(
    'favoriteRecipes', JSON.stringify(
      [...favRecipe, { id, type, area, category, alcoholicOrNot, name, image }],
    ),
  );
  return blackHeart;
};

export default favoriteRecipe;
