import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import surpriseMe from '../helpers/surpriseMe';

function ExplorarComidas() {
  const history = useHistory();
  return (
    <>
      <Header name="Explorar Comidas" show="false" />
      <div className="d-flex flex-column justify-content-between main-page">
        <button
          type="button"
          className="btn btn-inf btn-sm mt-4 mb-4 me-2 ms-2"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="btn btn-inf btn-sm mt-4 mb-4 me-2 ms-2"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          className="btn btn-inf btn-sm mt-4 mb-4 me-2 ms-2"
          data-testid="explore-surprise"
          onClick={ async () => {
            const id = await surpriseMe('comidas');
            history.push(`/comidas/${id}`);
          } }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidas;
