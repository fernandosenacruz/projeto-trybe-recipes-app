import React, { useState } from 'react';

import RecipesContext from './RecipesContext';

const Provider = ({ children }) => {
  const [recipeList, setRecipeList] = useState();
  const CONTEXT_VALUE = [recipeList, setRecipeList];
  return (
    <RecipesContext.Provider value={CONTEXT_VALUE}>
      {children}
    </RecipesContext.Provider>
  );
};

export default Provider;
