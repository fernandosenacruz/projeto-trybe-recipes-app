import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';

function RecipeCard({ recipe, index, recomend }) {
  const NOT_FOUND = -1;
  const type = Object.keys(recipe)[0].indexOf('Meal') !== NOT_FOUND ? 'Meal' : 'Drink';
  const route = type === 'Meal' ? 'comidas' : 'bebidas';
  const id = `id${type}`;
  let dataTestId = '';
  if (recomend) {
    dataTestId = `${index}-recomendation-title`;
  } else {
    dataTestId = `${index}-card-name`;
  }
  return (
    <Link to={ `/${route}/${recipe[id]}` }>
      <div
        data-testid={ recomend ? `${index}-recomendation-card` : `${index}-recipe-card` }
      >
        <h4 data-testid={ dataTestId }>{recipe[`str${type}`]}</h4>
        <img
          src={ recipe[`str${type}Thumb`] }
          alt={ `foto da receita ${recipe[`str${type}`]}` }
          data-testid={ `${index}-card-img` }
          className="card-img"
        />
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  recomend: PropTypes.bool.isRequired,
};

export default RecipeCard;
