import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer
      className="Footer d-flex justify-content-between fixed-bottom"
      data-testid="footer"
    >
      <button
        type="button"
        className="btn"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Bebidas"
        />
      </button>

      <button
        type="button"
        className="btn "
        onClick={ () => history.push('/explorar') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explore"
        />
      </button>

      <button
        type="button"
        className="btn"
        onClick={ () => history.push('/comidas') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Comidas"
        />
      </button>
    </footer>
  );
}

export default Footer;
