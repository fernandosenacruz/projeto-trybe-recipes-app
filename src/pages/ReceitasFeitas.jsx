import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [completedRecipes, setCompletedRecipes] = useState([]);

  useEffect(() => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(compRecipe);
  }, []);

  const shareRecipe = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    toast.success('Link copiado!');
  };
  const filterDrinks = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'bebida');
    setCompletedRecipes(filtered);
  };

  const filterFood = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'comida');
    setCompletedRecipes(filtered);
  };

  const clearFilters = () => {
    const compRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setCompletedRecipes(compRecipe);
  };

  return (
    <div>
      <Header name="Receitas Feitas" show="false" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ clearFilters }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFood }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks

      </button>
      {completedRecipes.map((recipes, index) => (
        <div key={ index }>
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <img
              src={ recipes.image }
              alt="recipes"
              data-testid={ `${index}-horizontal-image` }
              width="10%"
            />
          </Link>
          <div
            style={ { display: recipes.type === 'comida' ? null : 'none' } }
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipes.area} - ${recipes.category}` }

          </div>
          <Link to={ `/${recipes.type}s/${recipes.id}` }>
            <div data-testid={ `${index}-horizontal-name` }>{ recipes.name }</div>
          </Link>
          <div
            style={ { display: recipes.type === 'bebida' ? null : 'none' } }
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipes.alcoholicOrNot }

          </div>
          <div
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipes.doneDate }

          </div>
          <div
            className="mt-3"
          >
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              onClick={ () => shareRecipe(recipes.id, recipes.type) }
              className="btn"
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="heart icon" />
            </button>
          </div>
          {recipes.tags.map((tag) => (
            <div
              key={ `${tag}-${index}` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </div>
          ))}

        </div>

      ))}
    </div>
  );
}

export default ReceitasFeitas;
