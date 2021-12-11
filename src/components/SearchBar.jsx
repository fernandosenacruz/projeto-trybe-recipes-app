import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const SearchBar = ({ textToSearch }) => {
  const location = useLocation();
  const history = useHistory();
  const { setRecipeList } = useContext(RecipesContext);
  const [searchType, setSearchType] = useState('');
  const MAX_RECIPES = 12;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchType === 'f' && textToSearch.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return 0;
    }
    const isDrinkRoute = location.pathname.includes('bebidas');
    const siteDomain = isDrinkRoute ? 'thecocktaildb' : 'themealdb';
    let endPoint;
    switch (searchType) {
    case 'i':
      endPoint = `https://www.${siteDomain}.com/api/json/v1/1/filter.php?i=${textToSearch}`;
      break;
    case 's':
      endPoint = `https://www.${siteDomain}.com/api/json/v1/1/search.php?s=${textToSearch}`;
      break;

    case 'f':
      endPoint = `https://www.${siteDomain}.com/api/json/v1/1/search.php?f=${textToSearch}`;
      break;

    default:
      break;
    }

    const response = await fetch(endPoint);
    try {
      let recipes = [];
      const data = await response.json();
      console.log(isDrinkRoute);
      if (isDrinkRoute) {
        if (data.drinks.length === 1) {
          history.push(`/bebidas/${data.drinks[0].idDrink}`);
        }
        recipes = data.drinks.filter((drink, index) => index <= MAX_RECIPES && drink);
      }
      if (!isDrinkRoute) {
        if (data.meals.length === 1) {
          history.push(`/comidas/${data.meals[0].idMeal}`);
        }
        recipes = data.meals.filter((drink, index) => index <= MAX_RECIPES && drink);
      }
      console.log(recipes);
      setRecipeList(recipes);
    } catch (error) {
      console.error(error);
      global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className="control">
        <label className="radio" htmlFor="ingredient">
          <input
            type="radio"
            name="answer"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ () => setSearchType('i') }
          />
          Ingredientes
        </label>
        <label className="radio" htmlFor="name">
          <input
            type="radio"
            name="answer"
            id="name"
            data-testid="name-search-radio"
            onClick={ () => setSearchType('s') }
          />
          Nome
        </label>
        <label className="radio" htmlFor="firt-letter">
          <input
            type="radio"
            name="answer"
            id="firt-letter"
            data-testid="first-letter-search-radio"
            onClick={ () => setSearchType('f') }
          />
          Primeira letra
        </label>
        <button type="submit" data-testid="exec-search-btn">
          Pesquisar
        </button>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  textToSearch: PropTypes.string.isRequired,
};
export default SearchBar;
