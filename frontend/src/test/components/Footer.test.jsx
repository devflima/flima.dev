import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { renderWithProviders } from '../utils';

describe('Footer Component', () => {
  it('renders the dynamic copyright text', () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} // ALL RIGHTS RESERVED`)).toBeInTheDocument();
  });

  it('renders social and contact links', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText(/Status: Operational/i)).toBeInTheDocument();
  });
});
