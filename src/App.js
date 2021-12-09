import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Comidas from './pages/Comidas';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas'
import BebidasProgresso from './pages/BebidasProgresso'
import ComidasProgresso from './pages/ComidasProgresso'
import DetalheComida from './pages/DetalheComidas'
import DetalhesBebida from './pages/DetalhesBebidas'
import Explorar from './pages/Explorar'
import ExplorarBebidas from './pages/DetalhesBebidas'
import ExplorarComidas from './pages/ExplorarComidas'
import ExplorarBebidasIngre from './pages/ExplorarBebidasIngre'
import ExplorarComidasIngre from './pages/ExplorarComidasIngre'
import ExplorarComidasArea from './pages/ExplorarComidasArea'
import Perfil from './pages/Login'
import ReceitasFavoritadas from './pages/ReceitasFavoritadas'
import ReceitasFeitas from './pages/ReceitasFeitas'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={ Login } />
        <Route exact path="/comidas" component={ Comidas }/>
        <Route exact path="/bebidas" component={ Bebidas }/>
        <Route exact path="/comidas/{id-da-receita}" component={ DetalheComida } />
        <Route exact path="/bebidas/{id-dareceita}" component={ DetalhesBebida }/>
        <Route exact path="/comidas/{id-da-receita}/in-progress" component={ ComidasProgresso } />
        <Route exact path="/bebidas/{id-da-receita}/in-progress" component={ BebidasProgresso }/>
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas }/>
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas }/>
        <Route exact path="/explorar/comidas/ingredientes" component={ ExplorarComidasIngre }/>
        <Route exact path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasIngre }/>
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea }/>
        <Route exact path="/perfil" component={ Perfil }/>
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas }/>
        <Route exact path="/receitas-favoritadas" component={ ReceitasFavoritadas }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
