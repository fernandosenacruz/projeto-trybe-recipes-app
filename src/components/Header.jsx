import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';
import SearchBar from './SearchBar';

function Header({ name, show }) {
  const history = useHistory();

  const [hidden, setHidden] = useState(true);
  const [textToSearch, setTextToSearch] = useState('');

  function handleClick() {
    if (hidden === false) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }

  return (
    <header className="header d-flex flex-column">
      <navbar
        className="container navbar navbar-expand-lg
        navbar-dark d-flex justify-content-between"
        style={ { backgroundColor: '#c3ede1' } }
      >
        <button
          className="prof-btn btn"
          type="button"
          onClick={ () => history.push('/perfil') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="imagem do perfil"
          />
        </button>
        <h1 className="mb-0" data-testid="page-title">{name}</h1>

        {show === 'true' ? (
          <button
            className="search-btn btn"
            type="button"
            onClick={ handleClick }
            data-testid="search-btn btn"
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        ) : undefined}
        {!hidden
          && <input
            className="search-input"
            type="text"
            name=""
            data-testid="search-input"
            hidden={ hidden }
            value={ textToSearch }
            onChange={ ({ target }) => setTextToSearch(target.value) }
          />}
        {!hidden && <SearchBar textToSearch={ textToSearch } />}
      </navbar>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  show: PropTypes.string.isRequired,
};

export default Header;
