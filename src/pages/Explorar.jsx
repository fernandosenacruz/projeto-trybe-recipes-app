import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <Header name="Explorar" show="false" />
      <div className="d-flex justify-content-between bg-warning">
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
