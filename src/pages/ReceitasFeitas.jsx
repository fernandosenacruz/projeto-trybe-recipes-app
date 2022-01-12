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
    <>
      <Header name="Receitas Feitas" show="false" />
      <div className="main-page">

        <div className="d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-inf btn-sm"
            data-testid="filter-by-all-btn"
            onClick={ clearFilters }
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-inf btn-sm"
            data-testid="filter-by-food-btn"
            onClick={ filterFood }
          >
            Food
          </button>
          <button
            type="button"
            className="btn btn-inf btn-sm"
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            Drinks
          </button>
        </div>
        {completedRecipes.map((recipes, index) => (
          <div key={ index } className="card">
            <Link to={ `/${recipes.type}s/${recipes.id}` }>
              <div className="text-center">
                <img
                  className="img-done mx-auto"
                  src={ recipes.image }
                  alt="recipes"
                  data-testid={ `${index}-horizontal-image` }
                // width="10%"
                />
              </div>
            </Link>
            <div className="card-body">
              <div
                style={ { display: recipes.type === 'comida' ? null : 'none' } }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipes.area} - ${recipes.category}` }

              </div>
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <h5
                  className="card-title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipes.name }
                </h5>
                {recipes.tags.map((tag) => (
                  <span
                    className="badge rounded-pill bg-info text-dark"
                    key={ `${tag}-${index}` }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
                <button
                  className="btn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  onClick={ () => shareRecipe(recipes.id, recipes.type) }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="heart icon" />
                </button>
              </Link>
              <span
                className="badge rounded-pill bg-info text-dark"
                style={ { display: recipes.type === 'bebida' ? null : 'none' } }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipes.alcoholicOrNot }

              </span>
              <div
                data-testid={ `${index}-horizontal-done-date` }
              >
                Feito em:
                {' '}
                { recipes.doneDate }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReceitasFeitas;
