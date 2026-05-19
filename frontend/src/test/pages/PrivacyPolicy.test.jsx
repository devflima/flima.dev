import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import { renderWithProviders } from '../utils';

describe('PrivacyPolicy Page', () => {
  it('renders correctly', () => {
    const { container } = renderWithProviders(<PrivacyPolicy />);
    
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
    expect(screen.getByText(/Coleta de Dados/i)).toBeInTheDocument();
    expect(screen.getByText(/Uso dos Dados/i)).toBeInTheDocument();
    expect(screen.getByText(/Direitos do Titular/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
