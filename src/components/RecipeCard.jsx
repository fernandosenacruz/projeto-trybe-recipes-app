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
    <div
      data-testid={ recomend ? `${index}-recomendation-card` : `${index}-recipe-card` }
      className={ `col-6 ${index >= 2 ? 'd-none' : ' '}` }
    >
      <Link to={ `/${route}/${recipe[id]}` }>
        <h4 data-testid={ dataTestId }>{recipe[`str${type}`]}</h4>
        <img
          src={ recipe[`str${type}Thumb`] }
          alt={ `foto da receita ${recipe[`str${type}`]}` }
          data-testid={ `${index}-card-img` }
          className="card-img img-fluid d-block"
        />
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  recomend: PropTypes.bool.isRequired,
};

export default RecipeCard;
