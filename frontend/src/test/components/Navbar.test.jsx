import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { renderWithProviders } from '../utils';

describe('Navbar Component', () => {
  it('renders without crashing and displays the logo', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Execute_Contact button', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('[ Execute_Contact ]')).toBeInTheDocument();
  });
});
