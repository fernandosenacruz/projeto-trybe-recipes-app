import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';
import StartRecipeButton from '../components/StartRecipeButton';

function BebidasDetalhes(props) {
  const NUMBER_OF_RECIPES = 1;
  const NUMEBR_OF_RECOMENDATIONS = 6;
  const { match } = props;
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recomended, setRecomended] = useState([]);

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
      console.log(typeof recp);
      return <StartRecipeButton recipe={ recipe } id={ id } />;
    }
  }

  console.log(recipe);
  const { strDrinkThumb: imgSrc,
    strDrink: name, strAlcoholic, strInstructions } = recipe;

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
      {recomended.map((recip, index) => (<RecipeCard
        key={ index }
        recipe={ recip }
        index={ index }
        recomend
      />))}
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
