import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function RecipeCard({ img, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{name}</h4>
      <img
        src={ img }
        alt={ `foto da receita ${name}` }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
