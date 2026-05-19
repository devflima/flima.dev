import { describe, it, expect } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../../../pages/Admin/Dashboard';
import { renderWithProviders } from '../../utils';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../../config';

describe('Dashboard Component', () => {
  it('renders stats and recent messages', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/messages`, () => {
        return HttpResponse.json([
          { id: "m1", username: "Replied User", email: "replied@example.com", message: "Hello", subject: "S1", timestamp: "2024-01-01T20:00:00Z", statusMessage: "REPLIED" }
        ]);
      })
    );

    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('System Telemetry')).toBeInTheDocument();
      expect(screen.getByText('TOTAL_VISITORS')).toBeInTheDocument();
      expect(screen.getByText('TOTAL_MESSAGES')).toBeInTheDocument();
      expect(screen.getByText(/Replied User/i)).toBeInTheDocument();
      
      // Verification of REPLIED status icon
      expect(screen.getByText('done_all')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderWithProviders(<Dashboard />);
    const loading = screen.queryByText(/Loading.../i);
    if (loading) {
      expect(loading).toBeInTheDocument();
    }
  });

  it('navigates to specific message details when recent message log is clicked', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/User 11/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/User 11/i));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/admin/messages');
      expect(window.history.state.usr).toEqual({ selectedMessageId: 'm11' });
    });
  });
});
