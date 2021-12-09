import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';

function Comidas() {
  const NUMBER_OF_RECIPES = 12;
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [recipes, setRecipes] = useState([]);

  async function getRecipesAPI() {
    const meals = await getRecipes(NUMBER_OF_RECIPES, endpoint);
    setRecipes(meals);
  }

  useEffect(() => {
    getRecipesAPI();
  }, []);
  return (
    <div>
      <Header name="Comidas" />
      {recipes.map((recipe, index) => (<RecipeCard
        key={ index + recipe.strMeal }
        img={ recipe.strMealThumb }
        name={ recipe.strMeal }
        index={ index }
      />))}

    </div>
  );
}

export default Comidas;
