export const getIngredients = (rcp) => {
  const NOT_FOUND = -1;
  const entries = Object.entries(rcp);
  const ingredientsList = [];
  entries.forEach((entry) => {
    if (entry[0].indexOf('Ingredient')
    !== NOT_FOUND
    && entry[1] !== ''
    && entry[1] !== null) {
      ingredientsList.push(entry[1]);
    }
  });
  return ingredientsList;
};

export const getMeasures = (rcp) => {
  const NOT_FOUND = -1;
  const entries = Object.entries(rcp);
  const measureList = [];
  entries.forEach((entry) => {
    if (entry[0].indexOf('Measure')
    !== NOT_FOUND
    && entry[1] !== ' ') {
      measureList.push(entry[1]);
    }
  });
  return measureList;
};
