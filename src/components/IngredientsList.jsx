import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getIngredients, getMeasures } from '../helpers/getIngredients';

const IngredientsList = ({ recipe }) => {
  const location = useLocation();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasureList] = useState([]);
  const [isProgressRoute, setIsProgressRoute] = useState(false);

  useEffect(() => {
    const inProgress = location.pathname.includes('in-progress');
    const ingredientList = getIngredients(recipe);
    const measureList = getMeasures(recipe);
    setIngredientsList(ingredientList);
    setMeasureList(measureList);
    setIsProgressRoute(inProgress);
  }, [recipe]);

  return (
    <div>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ isProgressRoute
              ? `data-testid=${index}-ingredient-step`
              : `${index}-ingredient-name-and-measure` }
          >
            {`${item}: ${measuresList[index]}`}

          </li>))}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
};

export default IngredientsList;
