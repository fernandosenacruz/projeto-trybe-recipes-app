import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ComidasProcesso() {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const { strMeal, strCategory, strInstructions, strMealThumb } = recipeInProgress;
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    const getRecipeById = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeInProgress(...data.meals);
    };
    getRecipeById();
  });

  return (
    <div className="card">
      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
        className="card-img-top"
        alt={ strMeal }
      />
      <div className="card-body">
        <h5 data-testid="recipe-title" className="card-title">{ strMeal }</h5>
        <span
          data-testid="recipe-category"
          className="badge rounded-pill bg-info text-dark"
        >
          { strCategory }
        </span>
        <p
          data-testid="instructions"
          className="card-text p-3 text-justify"
        >
          { strInstructions }
        </p>
        <div className="row">
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Finalizar Receita</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComidasProcesso;
