import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipersContext from '../context/RecipesContext';

const SearchBar = ({ textToSearch }) => {
  const location = useLocation();
  const history = useHistory();
  const [recipeList, setRecipeList] = useContext(RecipersContext);

  const [searchType, setSearchType] = useState('');

  const fetchByIngredient = async () => {
    const isDrinkRoute = location.pathname.includes('bebidas');
    const endpoint = `https://www.${
      isDrinkRoute ? 'thecocktaildb' : 'themealdb'
    }.com/api/json/v1/1/filter.php?i=${textToSearch}`;
    const response = await fetch(endpoint).then((d) => d.json());
    if (isDrinkRoute && response.drinks.length === 1) {
      history.push(`/bebidas/${response.drinks[0].idDrink}`);
    }
    if (response.meals.length === 1) {
      history.push(`/comidas/${response.meals[0].idMeal}`);
    }
  };

  const fetchByName = async () => {
    const isDrinkRoute = location.pathname.includes('bebidas');
    const endpoint = `https://www.${
      isDrinkRoute ? 'thecocktaildb' : 'themealdb'
    }.com/api/json/v1/1/search.php?s=${textToSearch}`;
    const response = await fetch(endpoint).then((d) => d.json());
    if (isDrinkRoute && response.drinks.length === 1) {
      history.push(`/bebidas/${response.drinks[0].idDrink}`);
    }
    if (response.meals.length === 1) {
      history.push(`/comidas/${response.meals[0].idMeal}`);
    }
  };

  const fetchByFirstLetter = async () => {
    const isDrinkRoute = location.pathname.includes('bebidas');
    if (textToSearch.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const endpoint = `https://www.${
      isDrinkRoute ? 'thecocktaildb' : 'themealdb'
    }.com/api/json/v1/1/search.php?f=${textToSearch}`;
    const response = await fetch(endpoint).then((d) => d.json());
    if (isDrinkRoute && response.drinks.length === 1) {
      history.push(`/bebidas/${response.drinks[0].idDrink}`);
    }
    if (response.meals.length === 1) {
      history.push(`/comidas/${response.meals[0].idMeal}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (searchType) {
      case 'i':
        fetchByIngredient();
        break;
      case 's':
        fetchByName();
        break;
      case 'f':
        fetchByFirstLetter();
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="control">
        <label className="radio" htmlFor="ingredient">
          <input
            type="radio"
            name="answer"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onClick={() => setSearchType('i')}
          />
          Ingredientes
        </label>
        <label className="radio" htmlFor="name">
          <input
            type="radio"
            name="answer"
            id="name"
            data-testid="name-search-radio"
            onClick={() => setSearchType('s')}
          />
          Nome
        </label>
        <label className="radio" htmlFor="firt-letter">
          <input
            type="radio"
            name="answer"
            id="firt-letter"
            data-testid="first-letter-search-radio"
            onClick={() => setSearchType('f')}
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
export default SearchBar;
