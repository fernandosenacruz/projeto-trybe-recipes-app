import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredients, getMeasures } from '../helpers/getIngredients';
import checkIngredients from '../helpers/checkIngredients';
import RecipesContext from '../context/RecipesContext';

const IngredientsList = ({ recipe }) => {
  const location = useLocation();
  const { id } = useParams();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasureList] = useState([]);
  const [isProgressRoute, setIsProgressRoute] = useState(false);
  const { isDone, setIsDone } = useContext(RecipesContext);
  const x = location.pathname.includes('comidas') ? 'meals' : 'cocktails';
  const isInProgress = location.pathname.includes('in-progress');

  useEffect(() => {
    const inProgress = location.pathname.includes('in-progress');
    const ingredientList = getIngredients(recipe);
    const measureList = getMeasures(recipe);
    setIngredientsList(ingredientList);
    setMeasureList(measureList);
    setIsProgressRoute(inProgress);
  }, [location, recipe]);

  useEffect(() => {
    checkIngredients(x, []);
    // teste(setIsDone, x, id);
    // PARA REDUZIR A COMPLEXIDADE TRANSFERIMOS OS COMANDOS ABAIXO PARA A FUNÇÃO TESTE
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || false;
    const checkedDrinkOrMealExists = inProgressRecipes
     !== undefined;
    const drinkOrMealExists = inProgressRecipes[x][id] !== undefined;
    if (inProgressRecipes
      && drinkOrMealExists
      && checkedDrinkOrMealExists) setIsDone(...inProgressRecipes[x][id]);
  }, [id, setIsDone, x]);

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
    checkIngredients(x, favoritedRecipe);
  };

  const ingredientListWithCheckbox = () => (
    <ul>
      {ingredientsList.map((item, index) => (
        <li
          key={ index }
          data-testid={ isProgressRoute
            ? `${index}-ingredient-step`
            : `${index}-ingredient-name-and-measure` }
        >
          <label
            htmlFor={ `${index}-ingredient` }
            className={ isDone[`checkbox${index}`] && 'line-through' }
          >
            <input
              type="checkbox"
              key={ index }
              name={ `checkbox${index}` }
              id={ `${index}-ingredient` }
              onChange={ handleChange }
              value={ isDone[`checkbox${index}`] || false }
              checked={ isDone[`checkbox${index}`] || false }
            />
            <span style={ { fontSize: '13px' } }>
              {`${measuresList[index] ? `${item}: ${measuresList[index]}` : `${item}`}`}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );

  const ingredientList = () => (
    <ul>
      {ingredientsList.map((item, index) => (
        <li
          key={ index }
          data-testid={ isProgressRoute
            ? `${index}-ingredient-step`
            : `${index}-ingredient-name-and-measure` }
        >
          <label
            htmlFor={ `${index}-ingredient` }
          >
            <span style={ { fontSize: '13px' } }>
              {`${measuresList[index] ? `${item}: ${measuresList[index]}` : `${item}`}`}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {isInProgress ? ingredientListWithCheckbox() : ingredientList()}
    </div>
  );
};

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
};

export default IngredientsList;
