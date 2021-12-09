import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';

function Header({ name }) {
  const history = useHistory();

  const [hidden, setHidden] = useState(true);

  function handleClick() {
    if (hidden === true) {
      setHidden(false);
    } else {
      setHidden(true);
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
      <input
        className="search-input"
        type="text"
        name=""
        data-testid="search-input"
        hidden={ hidden }
      />
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
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
