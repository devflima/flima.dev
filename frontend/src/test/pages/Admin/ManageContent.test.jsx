import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageContent from '../../../pages/Admin/ManageContent';
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

describe('ManageContent Component', () => {
  it('renders correctly and loads data', async () => {
    renderWithProviders(<ManageContent />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.')).toBeInTheDocument();
    });
  });

  it('submits form and calls API', async () => {
    renderWithProviders(<ManageContent />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.')).toBeInTheDocument();
    });

    const saveButton = screen.getByText(/\[ Save_Content \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Page Content saved successfully!');
    });
  });

  it('submits with N/A defaults for empty fields', async () => {
    renderWithProviders(<ManageContent />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.')).toBeInTheDocument();
    });

    // Clear a field
    fireEvent.change(screen.getByDisplayValue('MOCK_ARCHITECTING DISTRIBUTED SYSTEMS.'), { target: { value: '' } });
    
    const saveButton = screen.getByText(/\[ Save_Content \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Page Content saved successfully!');
    });
  });

  it('handles error on save', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/contents`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageContent />);
    
    const saveButton = await screen.findByText(/\[ Save_Content \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
