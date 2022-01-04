import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredients, getMeasures } from '../helpers/getIngredients';
import checkIngredients from '../helpers/checkIngredients';

const IngredientsList = ({ recipe }) => {
  const location = useLocation();
  const { id } = useParams();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasureList] = useState([]);
  const [isProgressRoute, setIsProgressRoute] = useState(false);
  const [isDone, setIsDone] = useState([]);

  useEffect(() => {
    const inProgress = location.pathname.includes('in-progress');
    const ingredientList = getIngredients(recipe);
    const measureList = getMeasures(recipe);
    setIngredientsList(ingredientList);
    setMeasureList(measureList);
    setIsProgressRoute(inProgress);
  }, [location, recipe]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (inProgressRecipes.length !== 0) setIsDone(...inProgressRecipes.cocktails[id]);
  }, [id]);

  useEffect(() => console.log(isDone), [isDone]);

  const handleChange = ({ target }) => {
    let completedIngredients = {};
    if (target.value === 'true') {
      completedIngredients = { ...isDone, [target.name]: false };
      setIsDone({ ...isDone, [target.name]: false });
    } else {
      completedIngredients = { ...isDone, [target.name]: true };
      setIsDone({ ...isDone, [target.name]: true });
    }
    const favoritedRecipe = { [id]: [completedIngredients] };
    checkIngredients('cocktails', favoritedRecipe);
  };

  return (
    <div>
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={ index }
            data-testid={ isProgressRoute
              ? `data-testid=${index}-ingredient-step`
              : `${index}-ingredient-name-and-measure` }
            className={ isDone[`checkbox${index}`] && 'line-through' }
          >
            <input
              type="checkbox"
              key={ index }
              name={ `checkbox${index}` }
              id=""
              onChange={ handleChange }
              value={ isDone[`checkbox${index}`] || false }
              checked={ isDone[`checkbox${index}`] || false }
              data-testid={ `${index}-ingredient-step` }
            />
            {`${item}: ${measuresList[index]}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
};

export default IngredientsList;
