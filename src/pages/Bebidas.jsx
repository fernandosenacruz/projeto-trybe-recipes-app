import React, { useState, useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import getRecipes from '../services/getRecipes';

function Bebidas() {
  const NUMBER_OF_RECIPES = 12;
  const NUMBER_OF_CATEGORIES = 5;
  const recipesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const categoryEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { recipeList, setRecipeList } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState('All');

  async function filterByCategory(category) {
    let filterEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (filtered === category || category === 'All') {
      filterEndPoint = recipesEndpoint;
      setFiltered('All');
    } else {
      setFiltered(category);
    }
    const rcp = await getRecipes(NUMBER_OF_RECIPES, filterEndPoint);
    setRecipeList(rcp);
  }

  useEffect(() => {
    async function loadRecipes() {
      const drinks = await getRecipes(NUMBER_OF_RECIPES, recipesEndpoint);
      setRecipeList(drinks);
    }
    async function loadCategories() {
      const cat = await getRecipes(NUMBER_OF_CATEGORIES, categoryEndpoint);
      setCategories(cat);
    }
    if (recipeList.length === 0 || !Object.keys(recipeList[0]).includes('idDrink')) {
      loadRecipes();
    }
    loadCategories();
  }, [setRecipeList, recipeList]);

  return (
    <div className="main-page">
      <Header name="Bebidas" show="true" />
      <div className="" role="group">

        {categories.map((cat, index) => (
          <span key={ index + cat.strCategory } className="low-margin">
            <button
              type="button"
              className={ cat.strCategory === filtered
                ? 'btn btn-filter btn-sm selected' : 'btn btn-filter btn-sm' }
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ () => filterByCategory(cat.strCategory) }
            >
              {cat.strCategory}
            </button>
          </span>
        ))}
        <button
          key="all"
          type="button"
          className={ filtered === 'All'
            ? 'btn btn-filter btn-sm selected' : 'btn btn-filter btn-sm' }
          data-testid="All-category-filter"
          name="All"
          onClick={ () => filterByCategory('All') }
        >
          All
        </button>
      </div>
      <div className="row text-center mb-5">
        {recipeList.map((recipe, index) => (<RecipeCard
          key={ index }
          recipe={ recipe }
          index={ index }
          recomend={ false }
        />))}
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
