import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const favoriteRecipe = (recip) => {
  const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favRecipe !== [] && favRecipe.some((recipe) => recipe.id === recip.id)) {
    const unfavorite = favRecipe.filter((recipe) => recipe.id !== recip.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    return whiteHeart;
  }
  localStorage.setItem(
    'favoriteRecipes', JSON.stringify(
      [...favRecipe, recip],
    ),
  );
  return blackHeart;
};

export default favoriteRecipe;
