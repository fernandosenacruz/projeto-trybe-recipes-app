import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import getRecipes from '../services/getRecipes';

function Comidas() {
  const NUMBER_OF_RECIPES = 12;
  const NUMBER_OF_CATEGORIES = 5;
  const recipesEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const categoryEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState('');

  async function getRecipesAPI() {
    const meals = await getRecipes(NUMBER_OF_RECIPES, recipesEndpoint);
    setRecipes(meals);
    console.log(meals);
    const cat = await getRecipes(NUMBER_OF_CATEGORIES, categoryEndpoint);
    setCategories(cat);
  }
  async function filterByCategory(category) {
    let filterEndPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    if (filtered === category || category === 'All') {
      filterEndPoint = recipesEndpoint;
      setFiltered('');
    } else {
      setFiltered(category);
    }
    const rcp = await getRecipes(NUMBER_OF_RECIPES, filterEndPoint);
    setRecipes(rcp);
  }

  useEffect(() => {
    getRecipesAPI();
  }, []);
  return (
    <div>
      <Header name="Comidas" />
      {categories.map((cat, index) => (
        <button
          key={ index + cat.strCategory }
          type="button"
          data-testid={ `${cat.strCategory}-category-filter` }
          onClick={ () => filterByCategory(cat.strCategory) }
        >
          {cat.strCategory}
        </button>
      ))}
      <button
        key="all"
        type="button"
        data-testid="All-category-filter"
        name="All"
        onClick={ () => filterByCategory('All') }
      >
        All
      </button>
      {recipes.map((recipe, index) => (<RecipeCard
        key={ index + recipe.strMeal }
        img={ recipe.strMealThumb }
        name={ recipe.strMeal }
        id={ recipe.idMeal }
        index={ index }
      />))}
      <Footer />
    </div>
  );
}

export default Comidas;
