import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import BebidasProcesso from './pages/BebidasProcesso';
import ComidasProcesso from './pages/ComidasProcesso';
import DetalheComida from './pages/DetalheComidas';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidasIngre from './pages/ExplorarBebidasIngre';
import ExplorarComidasIngre from './pages/ExplorarComidasIngre';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import DetalhesBebida from './pages/DetalhesBebidas';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ DetalheComida } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebida } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ComidasProcesso }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ BebidasProcesso }
        />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngre }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngre }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExplorarComidasArea }
        />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
