import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../App.css';

function Header({name}) {
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
        <header data-testid="profile-top-btn" className="header">
            <button
                className="prof-btn"
                type="button"
                onClick={() => history.push('/perfil')}
            >
                <img
                    src={profileIcon}
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
                hidden={hidden}
            />
            <button
                className="search-btn"
                type="button"
                data-testid="search-top-btn"
                onClick={handleClick}
            >
                <img width="14" src={searchIcon} alt="Search" />
            </button>
        </header>
    );
}
export default Header;