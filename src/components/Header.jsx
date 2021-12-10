import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';

function Header({ name, show }) {
  const history = useHistory();

  const [hidden, setHidden] = useState(false);

  function handleClick() {
    if (hidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }

  return (
    <header className="header">
      <button
        className="prof-btn"
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="imagem do perfil"
        />
      </button>
      <h1 data-testid="page-title">
        { name }
      </h1>
      {
        hidden
          ? (
            <input
              className="search-input"
              type="text"
              data-testid="search-input"
            />)
          : undefined
      }

      {
        show === 'true'
          ? (
            <button
              className="search-btn"
              type="button"
              onClick={ handleClick }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search"
              />
            </button>
          )
          : undefined
      }
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Header;
