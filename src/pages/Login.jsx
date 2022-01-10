import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import xandroGitHub from '../images/xandroGitHub.jpeg';
import fatGitHub from '../images/fatGitHub.jpeg';

function Login() {
  const [email, userEmail] = useState('');
  const [senha, userSenha] = useState('');

  const validaEmail = /\S+@\S+\.\S+/;
  const CARACTER_MIN = 6;

  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  return (
    <div className="container mx-auto mt-5">
      <h1
        className="h3 mb-3 font-weight-normal text-center mb-2"
      >
        Projeto App de Receitas
      </h1>
      <div className="row text-center mt-2">
        <div className="col-6">
          <img
            src={ xandroGitHub }
            alt=""
            className="img-git rounded-circle img-responsive"
          />
          <h6 className="text-muted">alexsandron3</h6>
        </div>
        <div className="col-6">
          <img
            src={ fatGitHub }
            alt=""
            className="img-git rounded-circle img-responsive"
          />
          <h6 className="text-muted">elielson</h6>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-6">
          <img
            src={ fatGitHub }
            alt=""
            className="img-git rounded-circle img-responsive"
          />
          <h6 className="text-muted">fernandosenacruz</h6>
        </div>
        <div className="col-6">
          <img
            src={ fatGitHub }
            alt=""
            className="img-git rounded-circle img-responsive"
          />
          <h6 className="text-muted">kelvin</h6>
        </div>
      </div>
      <form className="form-signin  p-3 text-center">
        <input
          type="email"
          className="form-control mb-1 input-rounded"
          name="email"
          id="input-email"
          value={ email }
          placeholder="Usuário"
          data-testid="email-input"
          onChange={ ({ target: { value } }) => userEmail(value) }
        />

        <input
          type="password"
          name="senha"
          className="form-control mb-3 input-rounded"
          value={ senha }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => userSenha(value) }
        />
        <button
          type="submit"
          className="btn btn-info input-rounded"
          data-testid="login-submit-btn"
          disabled={ senha.length <= CARACTER_MIN || !validaEmail.test(email) }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
