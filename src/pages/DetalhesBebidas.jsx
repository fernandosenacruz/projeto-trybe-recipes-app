import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';
import '../App.css';
import StartRecipeButton from '../components/StartRecipeButton';
import IngredientsList from '../components/IngredientsList';
import shareRecipe from '../helpers/shareRecipe';
import shareIcon from '../images/shareIcon.svg';
import favoriteRecipe from '../helpers/favoriteRecipe';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function BebidasDetalhes(props) {
  const NUMBER_OF_RECIPES = 1;
  const NUMEBR_OF_RECOMENDATIONS = 6;
  const { match } = props;
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const location = useLocation();
  const [link, setLink] = useState('./images/whiteHeartIcon.svg');

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
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const recomendationEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const rcp = await getRecipes(NUMBER_OF_RECIPES, endPoint);
      const recip = rcp[0];
      const drinks = await getRecipes(NUMEBR_OF_RECOMENDATIONS, recomendationEndPoint);

      setRecipe(recip);
      setRecomended(drinks);
    }
    fetchRecipe();
  }, [id]);

  function renderButton(recp) {
    if (typeof recp === 'object' && !Array.isArray(recp)) {
      return <StartRecipeButton recipe={ recipe } id={ id } />;
    }
  }

  const { strDrinkThumb: imgSrc,
    strDrink: name, strAlcoholic,
    strInstructions, strCategory: category } = recipe;

  return (
    <div className="card">
      <img
        src={ `${imgSrc}` }
        alt={ `${name}` }
        data-testid="recipe-photo"
        className="detail-img rounded"
      />
      <div className="card-body d-flex row">
        <span className="mt-3 mb-1 d-flex col">
          <h1 data-testid="recipe-title" className="card-title">{name}</h1>
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => shareRecipe(location) }
            className="btn"
          >
            <img src={ shareIcon } alt="heart icon" />
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
            className="btn"
            onClick={ () => {
              const obj = {
                id,
                type: 'bebida',
                area: '',
                category,
                alcoholicOrNot: strAlcoholic,
                name,
                image: imgSrc,
              };
              const icon = favoriteRecipe(obj);
              setLink(icon);
            } }
            src={ link }
          >
            <img src={ link } alt="heart icon" />
          </button>
        </span>
        <span
          data-testid="recipe-category"
          className="badge rounded-pill bg-info text-dark"
        >
          {strAlcoholic}
        </span>
        <div className="mt-3 mb-1" />
        <h3>Ingredients List: </h3>
        <IngredientsList recipe={ recipe } />
        <h3>Instructions: </h3>
        <p
          data-testid="instructions"
          className="card-text p-3 text-justify"
        >
          {strInstructions}
        </p>
      </div>

      <div className="container mb-1">
        <div className="row p-5">
          <h4>Recommended for you: </h4>
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
BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default BebidasDetalhes;
