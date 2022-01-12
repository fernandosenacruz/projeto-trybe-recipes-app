import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  fecthIngredientIMG,
  fecthIngredientName, fetchRecipesByIngredient } from '../helpers/exploreByIngredient';

function ExplorarComidasIngre() {
  const { setRecipeList } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([{
    name: 'Sem dados',
    img: '',
  }]);

  useEffect(() => {
    const allFetchs = async () => {
      const ingredientsName = await fecthIngredientName('comida');
      const ingredientsIMG = await fecthIngredientIMG(ingredientsName, 'comida');
      const arr = ingredientsName.map((ingredient, index) => ({
        name: ingredient,
        img: ingredientsIMG[index],
      }));
      setIngredients(arr);
    };
    allFetchs();
  }, []);

  return (
    <>
      <Header name="Explorar Ingredientes" show="false" />
      <div className="d-flex flex-row flex-wrap card">
        {ingredients.map(({ name, img }, index) => (
          <div
            className="card col-6"
            data-testid={ `${index}-ingredient-card` }
            key={ name + index }
          >
            <Link
              to="/comidas"
              onClick={ async () => setRecipeList(
                await fetchRecipesByIngredient(name, 'comida'),
              ) }
            >
              <img
                src={ img }
                className="card-img-top"
                alt={ name }
                data-testid={ `${index}-card-img` }
              />
              <div className="card-body">
                <h5
                  className="card-title text-center"
                  data-testid={ `${index}-card-name` }
                >
                  { name }
                </h5>

              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasIngre;
