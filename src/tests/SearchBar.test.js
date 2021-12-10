import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Verifica se após clicar na lupa, os elementos corretos aparecem', () => {
  it('Deve haver um campo para pesquisa:', () => {
    render(<Header />);
    // userEvent.click('');
  });
});
