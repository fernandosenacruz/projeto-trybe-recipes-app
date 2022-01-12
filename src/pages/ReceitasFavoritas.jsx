import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import favoriteRecipe from '../helpers/favoriteRecipe';

function ReceitasFavoritas() {
  const [favouritedRecipes, setFavouritedRecipes] = useState([]);

  useEffect(() => {
    const compRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavouritedRecipes(compRecipe);
  }, []);

  const shareRecipe = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    toast.success('Link copiado!');
  };
  const filterDrinks = () => {
    const compRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'bebida');
    setFavouritedRecipes(filtered);
  };

  const filterFood = () => {
    const compRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const filtered = compRecipe.filter((recip) => recip.type === 'comida');
    setFavouritedRecipes(filtered);
  };

  const clearFilters = () => {
    const rcp = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavouritedRecipes(rcp);
  };

  return (
    <>
      <Header name="Receitas Favoritas" show="false" />
      <div className="main-page">

        <div className="d-flex justify-content-around ">
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
        {favouritedRecipes.map((recipes, index) => (
          <div key={ index } className="card">
            <div
              className="mt-3"
            >
              <Link to={ `/${recipes.type}s/${recipes.id}` }>
                <h5
                  className="card-title text-dark"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipes.name }
                </h5>
              </Link>
              <span
                className="badge rounded-pill bg-info text-dark"
                style={ { display: recipes.type === 'bebida' ? null : 'none' } }
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipes.alcoholicOrNot }

              </span>
              <span
                className="badge rounded-pill bg-info text-dark"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipes.doneDate }

              </span>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                onClick={ () => shareRecipe(recipes.id, recipes.type) }
                className="btn"
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="heart icon" />
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                className="btn"
                onClick={ () => {
                  favoriteRecipe(recipes);
                  const compRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'))
              || [];
                  setFavouritedRecipes(compRecipe);
                } }
                src={ blackHeart }
              >
                <img src={ blackHeart } alt="heart icon" />
              </button>
            </div>
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
            <div
              className="card-body"
              style={ { display: recipes.type === 'comida' ? null : 'none' } }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipes.area} - ${recipes.category}` }

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReceitasFavoritas;
