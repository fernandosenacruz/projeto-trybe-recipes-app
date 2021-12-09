import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
      >
        {drinkIcon}
      </button>

      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
      >
        {exploreIcon}
      </button>

      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
      >
        {mealIcon}
      </button>
    </footer>
  );
}

export default Footer;
