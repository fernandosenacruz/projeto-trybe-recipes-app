import React from 'react';
import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Verificação de existência de itens no Menu inferior / Footer', () => {
  it('Existem `data-testids` no componente:', () => {
    // Passo 1 - Acesse o componente:
    render(<Footer />);
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  it('Existem `img` no componente: com respectivos names ou alt:', () => {
    // Passo 1 - Acesse o componente:
    render(<Footer />);
    // Passo 2 - Interagir com ele (caso haja necessidade):

    // Passo 3 - Faça o teste:
    expect(screen.getByRole('img', {
      name: /bebidas/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('img', {
      name: /explore/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('img', {
      name: /comidas/i,
    })).toBeInTheDocument();
  });

  it('Existem três botões com os respectivos names:', () => {
    // Passo 1 - Acesse o componente:
    render(<Footer />);
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    const NUMBER_BUTTONS = 3;
    expect(screen.getAllByRole('button', { exact: true })).toHaveLength(NUMBER_BUTTONS);
  });
});
