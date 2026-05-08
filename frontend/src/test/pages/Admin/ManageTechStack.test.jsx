import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageTechStack from '../../../pages/Admin/ManageTechStack';
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
});
