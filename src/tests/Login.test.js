import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Verificação dos itens da tela de login', () => {
  it('Existe inputs com os respectivos id`s?', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('Existe um botão de Login com id "login-submit-btn" e nome "Entrar"?', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it(('Verifica se a rota de login é "/"'), () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(window.location.pathname).toStrictEqual('/');
  });

  it('Botão inicia Desabilitado', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    const { disabled } = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(disabled).toBe(true);
  });
});
