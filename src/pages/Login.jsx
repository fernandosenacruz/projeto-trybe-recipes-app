import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <form>
      <input
        type="email"
        name="email"
        value={ email }
        placeholder="email"
        data-testid="email-input"
        onChange={ ({ target: { value } }) => userEmail(value) }
      />

      <input
        type="password"
        name="senha"
        value={ senha }
        placeholder="senha"
        data-testid="password-input"
        onChange={ ({ target: { value } }) => userSenha(value) }
      />

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ senha.length <= CARACTER_MIN || !validaEmail.test(email) }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
