import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageContent from '../../../pages/Admin/ManageContent';
import { renderWithProviders } from '../../utils';
import toast from 'react-hot-toast';
import { vi } from 'vitest';

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
});
