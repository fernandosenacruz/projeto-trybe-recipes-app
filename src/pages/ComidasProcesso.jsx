import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import shareRecipe from '../helpers/shareRecipe';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import favoriteRecipe from '../helpers/favoriteRecipe';
import IngredientsList from '../components/IngredientsList';
import changeButtonStatus from '../helpers/changeButtonStatus';
import RecipesContext from '../context/RecipesContext';
import manageCompletedRecipes from '../helpers/manageCompletedRecipes';

function ComidasProcesso() {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const {
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strArea,
    idMeal,
    strTags,
  } = recipeInProgress;
  const location = useLocation();
  const [link, setLink] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { isDone } = useContext(RecipesContext);
  const history = useHistory();
  let recipeFav = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    tags: strTags ? strTags.split(',').slice(0, 2) : [],
  };

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    const getRecipeById = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeInProgress(...data.meals);
    };
    getRecipeById();
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favRecipe !== [] && favRecipe.some((fav) => fav.id === id)) {
      setLink(blackHeart);
    } else {
      setLink(whiteHeart);
    }
  }, [location.pathname]);
  useEffect(() => setIsButtonDisabled(changeButtonStatus(isDone, recipeInProgress)),
    [isDone, recipeInProgress]);

  function recipeDone() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const doneDate = `${day}/${month}/${today.getFullYear()}`;
    if (!recipeFav.doneDate) {
      recipeFav = { ...recipeFav, doneDate };
    }
    manageCompletedRecipes('add', recipeFav);
    history.push('/receitas-feitas');
  }

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
        <div className="mt-3">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ () => shareRecipe(location) }
            className="btn"
          >
            <img src={ shareIcon } alt="heart icon" />

          </button>
          <button
            data-testid="favorite-btn"
            type="button"
            className="btn"
            onClick={ () => {
              const obj = {
                id: idMeal,
                type: 'comida',
                area: strArea,
                category: strCategory,
                alcoholicOrNot: '',
                name: strMeal,
                image: strMealThumb,
              };
              const icon = favoriteRecipe(obj);
              setLink(icon);
            } }
            src={ link }
          >
            <img src={ link } alt="heart icon" />
          </button>
        </div>
        <IngredientsList recipe={ recipeInProgress } />
        <p
          data-testid="instructions"
          className="card-text p-3 text-justify"
        >
          { strInstructions }
        </p>

        <div className="row">
          <div className="col-md-4">
            <button
              data-testid="finish-recipe-btn"
              type="submit"
              className="btn btn-primary btn-sm fixed-bottom w-100"
              disabled={ !isButtonDisabled }
              onClick={ recipeDone }
            >
              Finalizar Receita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComidasProcesso;
