import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import surpriseMe from '../helpers/surpriseMe';

function ExplorarBebidas() {
  const history = useHistory();
  return (
    <>
      <Header name="Explorar Bebidas" show="false" />
      <div className="d-flex justify-content-between bg-warning main-page">
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-surprise"
          onClick={ async () => {
            const id = await surpriseMe('bebidas');
            history.push(`/bebidas/${id}`);
          } }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
