import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';

function StartRecipeButton({ id, recipe }) {
  function startRecipe(route) {
    return (
      <Link to={ `/${route}/${id}/in-progress` }>
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    );
  }
  function continueRecipe(route) {
    return (
      <Link to={ `/${route}/${id}/in-progress` }>
        <button
          className="start-btn"
          type="button"
          data-testid="start-recipe-btn"
        >
          Continuar Receita
        </button>
      </Link>
    );
  }
  const NOT_FOUND = -1;
  const type = Object.keys(recipe)[0].indexOf('Meal') !== NOT_FOUND ? 'Meal' : 'Drink';
  const route = type === 'Meal' ? 'comidas' : 'bebidas';
  const recipeType = type === 'Meal' ? 'meals' : 'cocktails';
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let status = '';
  if (doneRecipes) {
    doneRecipes.forEach((rcp) => {
      if (rcp.id === id) {
        status = 'done';
      }
    });
  }
  if (inProgressRecipes && inProgressRecipes[recipeType][id]) {
    status = 'inProgress';
  }
  if (status === 'done') {
    return null;
  }
  if (status === 'inProgress') {
    return continueRecipe(route);
  }
  return startRecipe(route);
}

StartRecipeButton.propTypes = {
  recipe: PropTypes.objectOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};

export default StartRecipeButton;
