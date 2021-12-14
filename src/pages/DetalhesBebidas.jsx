import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';
import StartRecipeButton from '../components/StartRecipeButton';
import shareRecipe from '../helpers/shareRecipe';
import favoriteRecipe from '../helpers/favoriteRecipe';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function BebidasDetalhes(props) {
  const NUMBER_OF_RECIPES = 1;
  const NUMEBR_OF_RECOMENDATIONS = 6;
  const { match } = props;
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
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
    function getIngredients(rcp) {
      const NOT_FOUND = -1;
      const entries = Object.entries(rcp);
      const newIngredients = [];
      entries.forEach((entry) => {
        if (entry[0].indexOf('Ingredient')
        !== NOT_FOUND
        && entry[1] !== ''
        && entry[1] !== null) {
          newIngredients.push(entry[1]);
        }
      });
      setIngredientsList(newIngredients);
    }
    function getMeasures(rcp) {
      const NOT_FOUND = -1;
      const entries = Object.entries(rcp);
      const newMeasures = [];
      entries.forEach((entry) => {
        if (entry[0].indexOf('Measure')
        !== NOT_FOUND
        && entry[1] !== ' ') {
          newMeasures.push(entry[1]);
        }
      });
      setMeasureList(newMeasures);
    }
    async function fetchRecipe() {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const recomendationEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const rcp = await getRecipes(NUMBER_OF_RECIPES, endPoint);
      const recip = rcp[0];
      setRecipe(recip);
      getIngredients(recip);
      getMeasures(recip);
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

  const { strDrinkThumb: imgSrc,
    strDrink: name, strAlcoholic, strInstructions, strCategory: category } = recipe;

  return (
    <div>
      {console.log(recipe)}
      <img
        src={ `${imgSrc}` }
        alt={ `${name}` }
        data-testid="recipe-photo"
        className="detail-img"
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
            type: 'bebida',
            area: '',
            category,
            alcoholicOrNot: strAlcoholic,
            name,
            image: imgSrc,
          };
          const icon = favoriteRecipe(obj);
          console.log(icon);
          setLink(icon);
        } }
        src={ link }
      >
        <img src={ link } alt="heart icon" />
      </button>
      <h4 data-testid="recipe-category">{strAlcoholic}</h4>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item}  ${measureList[index] || ''}`}

          </li>))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
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
BebidasDetalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default BebidasDetalhes;
