import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const Provider = ({ children }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [favRecipe, setFavRecipe] = useState([]);
  const [isDone, setIsDone] = useState({ checkbox0: false });
  const CONTEXT_VALUE = {
    recipeList,
    favRecipe,
    isDone,
    setRecipeList,
    setFavRecipe,
    setIsDone };
  return (
    <RecipesContext.Provider value={ CONTEXT_VALUE }>
      {children}
    </RecipesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.objectOf(Object).isRequired,
};

export default Provider;
