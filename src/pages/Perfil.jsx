import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user')) || [];
    setUser(userEmail.email);
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header name="Perfil" show="false" />
      <div data-testid="profile-email">{user}</div>
      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas Feitas
      </Link>
      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Sair

      </button>
      <Footer />
    </>
  );
}

export default Perfil;
