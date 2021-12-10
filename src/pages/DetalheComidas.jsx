import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';
import '../App.css';

function ComidasDetalhes(props) {
  const NUMBER_OF_RECIPES = 1;
  const NUMEBR_OF_RECOMENDATIONS = 6;
  const NOT_FOUND = -1;
  const { match } = props;
  const { id } = match.params;
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const recomendationEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [recipe, setRecipe] = useState([]);
  const [embedYt, setEmbedYt] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recomended, setRecomended] = useState([]);

  function getIngredients(rcp) {
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
    const rcp = await getRecipes(NUMBER_OF_RECIPES, endPoint);
    const recip = rcp[0];
    setRecipe(recip);
    setEmbedYt(recip.strYoutube.replace('watch?v=', 'embed/'));
    getIngredients(recip);
    getMeasures(recip);
    const drinks = await getRecipes(NUMEBR_OF_RECOMENDATIONS, recomendationEndPoint);
    setRecomended(drinks);
  }
  if (recipe.length === 0) {
    fetchRecipe();
  }
  console.log(recipe);
  const { strMealThumb: imgSrc,
    strMeal: name, strCategory, strInstructions } = recipe;
  return (
    <div>
      <img
        src={ `${imgSrc}` }
        alt={ `${name}` }
        data-testid="recipe-photo"
        className="detail-img"
      />
      <h2 data-testid="recipe-title">{name}</h2>
      <button data-testid="share-btn" type="button">share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item}: ${measureList[index]}`}

          </li>))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        src={ embedYt }
        title="video"
        width="420"
        height="315"
        data-testid="video"
      />
      {recomended.map((recip, index) => (<RecipeCard
        key={ index }
        recipe={ recip }
        index={ index }
        recomend
      />))}
      <button
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>

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
