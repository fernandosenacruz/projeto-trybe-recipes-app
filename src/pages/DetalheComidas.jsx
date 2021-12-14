import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';
import '../App.css';
import StartRecipeButton from '../components/StartRecipeButton';
import IngredientsList from '../components/IngredientsList';
import shareRecipe from '../helpers/shareRecipe';
import favoriteRecipe from '../helpers/favoriteRecipe';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function ComidasDetalhes(props) {
  const NUMBER_OF_RECIPES = 1;
  const NUMEBR_OF_RECOMENDATIONS = 6;
  const { match } = props;
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [embedYt, setEmbedYt] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const location = useLocation();
  const [link, setLink] = useState();

  useEffect(() => {
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favRecipe !== [] && favRecipe.some((fav) => fav.id === id)) {
      setLink(blackHeart);
    } else {
      setLink(whiteHeart);
    }
  }, [id]);

  useEffect(() => {
    async function fetchRecipe() {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const recomendationEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const rcp = await getRecipes(NUMBER_OF_RECIPES, endPoint);
      const recip = rcp[0];
      setRecipe(recip);
      setEmbedYt(recip.strYoutube.replace('watch?v=', 'embed/'));
      const drinks = await getRecipes(NUMEBR_OF_RECOMENDATIONS, recomendationEndPoint);
      setRecomended(drinks);
    }
    fetchRecipe();
  }, [id]);

  function renderButton(recp) {
    if (typeof recp === 'object' && !Array.isArray(recp)) {
      return <StartRecipeButton recipe={ recipe } id={ id } />;
    }
  }

  const { strMealThumb: imgSrc,
    strMeal: name, strCategory, strInstructions } = recipe;

  return (
    <div>
      <img
        src={ `${imgSrc}` }
        alt={ `${name}` }
        data-testid="recipe-photo"
        className="detail-img rounded"
      />
      <h2 data-testid="recipe-title">{name}</h2>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareRecipe(location) }
      >
        share
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ () => {
          const obj = {
            id,
            type: 'comida',
            area: recipe.strArea,
            category: recipe.strCategory,
            alcoholicOrNot: '',
            name: recipe.strMeal,
            image: recipe.strMealThumb,
          };
          const icon = favoriteRecipe(obj);
          setLink(icon);
        } }
        src={ link }
      >
        <img src={ link } alt="heart icon" />
      </button>
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <IngredientsList recipe={ recipe } />
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        src={ embedYt }
        title="video"
        width="420"
        height="315"
        data-testid="video"
      />
      <div className="container">
        <div className="row">
          {recomended.map((recip, index) => (<RecipeCard
            key={ index }
            recipe={ recip }
            index={ index }
            recomend
          />))}
        </div>
      </div>
      {renderButton(recipe)}
    </div>

  );
}

ComidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ComidasDetalhes;
