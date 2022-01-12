import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <Header name="Explorar" show="false" />
      <div className="d-flex flex-column justify-content-between main-page">
        <button
          type="button"
          className="btn btn-inf btn-sm mt-4 mb-4 me-2 ms-2"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="btn btn-inf btn-sm mt-4 mb-4 me-2 ms-2"
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
