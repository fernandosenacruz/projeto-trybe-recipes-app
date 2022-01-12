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
      <div className="d-flex flex-column flex-fill main-page">
        <h3
          className="text-center"
          data-testid="profile-email"
        >
          {user}
        </h3>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
          className="btn btn-inf"
        >
          Receitas Feitas
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          className="btn btn-inf"
        >
          Receitas Favoritas
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
