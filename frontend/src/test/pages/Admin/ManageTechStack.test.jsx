import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageTechStack from '../../../pages/Admin/ManageTechStack';
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

describe('ManageTechStack Component', () => {
  it('renders correctly and loads data', async () => {
    renderWithProviders(<ManageTechStack />);
    
    // Check if loading state or data is present
    await waitFor(() => {
      expect(screen.getByDisplayValue('MockLang')).toBeInTheDocument();
    });
  });

  it('submits form and calls API', async () => {
    renderWithProviders(<ManageTechStack />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('MockLang')).toBeInTheDocument();
    });

    const saveButton = screen.getByText(/\[ Save_Tech_Stack \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Tech Stack saved successfully!');
    });
  });

  it('submits with N/A defaults for empty fields', async () => {
    renderWithProviders(<ManageTechStack />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('MockLang')).toBeInTheDocument();
    });

    // Clear a field
    fireEvent.change(screen.getByLabelText(/Languages/i), { target: { value: '' } });
    
    const saveButton = screen.getByText(/\[ Save_Tech_Stack \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Tech Stack saved successfully!');
    });
  });

  it('handles error on save', async () => {
    server.use(
      http.put(`${API_URL}/api/v1/stacks/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageTechStack />);
    
    const saveButton = screen.getByText(/\[ Save_Tech_Stack \]/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
