import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageStats from '../../../pages/Admin/ManageStats';
import { renderWithProviders } from '../../utils';
import toast from 'react-hot-toast';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../../config';

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ManageStats Component', () => {
  it('renders and updates stats', async () => {
    renderWithProviders(<ManageStats />);
    
    await waitFor(async () => {
      const el = await screen.findByDisplayValue(/08|10+/);
      expect(el).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/YEARS_EXP/i), { target: { value: '10+' } });
    fireEvent.click(screen.getByText(/\[ Save_Changes \]/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Stats updated successfully!');
    });
  });

  it('handles error on save', async () => {
    server.use(
      http.put(/.*\/api\/v1\/stats\/.*/, () => {
        return new HttpResponse(null, { status: 500 });
      }),
      http.post(/.*\/api\/v1\/stats/, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageStats />);
    
    await waitFor(async () => {
      const el = await screen.findByDisplayValue(/08|10+/);
      expect(el).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/\[ Save_Changes \]/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
