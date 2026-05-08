import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageMessages from '../../../pages/Admin/ManageMessages';
import { renderWithProviders } from '../../utils';
import toast from 'react-hot-toast';

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ManageMessages Component', () => {
  it('renders and lists messages', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      expect(screen.getByText(/INBOX_LOGS/i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('handles message selection and status update', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      const msg = screen.getByText('John Doe');
      fireEvent.click(msg);
    });

    expect(screen.getByText('COMPOSE_REPLY')).toBeInTheDocument();
  });

  it('sends a reply successfully', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('John Doe'));
    });

    const replyArea = screen.getByPlaceholderText(/> Type response.../i);
    fireEvent.change(replyArea, { target: { value: 'Hello back!' } });

    const sendBtn = screen.getByText(/\[ Transmit_Reply \]/i);
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Reply sent successfully!');
    });
  });

  it('handles message deletion', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('John Doe'));
    });

    const deleteBtn = screen.getByText('delete');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Message deleted successfully!');
    });
  });

  it('shows replied state correctly', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Jane Smith'));
    });

    expect(screen.getByText(/Already_Replied/i)).toBeInTheDocument();
    expect(screen.getByText(/Already_Replied/i)).toBeDisabled();
  });
});
