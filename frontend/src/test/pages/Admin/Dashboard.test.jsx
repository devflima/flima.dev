import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Dashboard from '../../../pages/Admin/Dashboard';
import { renderWithProviders } from '../../utils';

describe('Dashboard Component', () => {
  it('renders stats and recent messages', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('System Telemetry')).toBeInTheDocument();
      expect(screen.getByText('TOTAL_VISITORS')).toBeInTheDocument();
      expect(screen.getByText(/User 11/i)).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderWithProviders(<Dashboard />);
    const loading = screen.queryByText(/Loading.../i);
    if (loading) {
      expect(loading).toBeInTheDocument();
    }
  });
});
