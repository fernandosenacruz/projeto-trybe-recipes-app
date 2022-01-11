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
      <div className="d-flex justify-content-between bg-warning">
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sm"
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
