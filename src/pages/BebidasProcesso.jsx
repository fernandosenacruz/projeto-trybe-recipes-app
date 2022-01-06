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

function BebidasProcesso() {
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const {
    strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb,
    idDrink,
    strAlcoholic,
  } = recipeInProgress;
  const location = useLocation();
  const history = useHistory();
  const [link, setLink] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { isDone } = useContext(RecipesContext);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    const getRecipeById = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeInProgress(...data.drinks);
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

  return (
    <div className="card">
      <img
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        className="card-img-top"
        alt={ strDrink }
      />
      <div className="card-body">
        <h5 data-testid="recipe-title" className="card-title">{ strDrink }</h5>
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
                id: idDrink,
                type: 'bebida',
                area: '',
                category: strCategory,
                alcoholicOrNot: strAlcoholic,
                name: strDrink,
                image: strDrinkThumb,
              };
              const icon = favoriteRecipe(obj);
              setLink(icon);
            } }
            src={ link }
          >
            <img src={ link } alt="heart icon" />
          </button>
        </div>
        <IngredientsList
          recipe={ recipeInProgress }
        />
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
              className="btn btn-primary"
              disabled={ !isButtonDisabled }
              onClick={ () => history.push('/receitas-feitas') }
            >
              Finalizar Receita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BebidasProcesso;
