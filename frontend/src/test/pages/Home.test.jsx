import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { renderWithProviders } from '../utils';

describe('Home Page Integration', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders stats from MSW successfully', async () => {
    renderWithProviders(<Home />);
    
    // MSW returns: yearsExp: "08", sysDeployed: "40+", uptimeSLA: "99.9%", commitsLogged: "12k"
    const yearsExp = await screen.findByText('08');
    const sysDeployed = await screen.findByText('40+');
    const uptime = await screen.findByText('99.9%');
    const commits = await screen.findByText('12k');
    
    expect(yearsExp).toBeInTheDocument();
    expect(sysDeployed).toBeInTheDocument();
    expect(uptime).toBeInTheDocument();
    expect(commits).toBeInTheDocument();
    
    expect(screen.getByText(/ARCHITECTING/i)).toBeInTheDocument();
  });
});
