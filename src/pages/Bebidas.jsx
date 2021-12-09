import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';

function Bebidas() {
  const NUMBER_OF_RECIPES = 12;
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [recipes, setRecipes] = useState([]);

  async function getRecipesAPI() {
    const drinks = await getRecipes(NUMBER_OF_RECIPES, endpoint);
    setRecipes(drinks);
  }

  useEffect(() => {
    getRecipesAPI();
  }, []);
  return (
    <div>
      <Header name="Bebidas" />
      {recipes.map((recipe, index) => (<RecipeCard
        key={ index + recipe.strDrink }
        img={ recipe.strDrinkThumb }
        name={ recipe.strDrink }
        index={ index }
      />))}
      <Footer />
    </div>
  );
}

export default Bebidas;
