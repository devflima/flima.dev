import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageMessages from '../../../pages/Admin/ManageMessages';
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

describe('ManageMessages Component', () => {
  it('renders and lists messages', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      expect(screen.getByText(/INBOX_LOGS/i)).toBeInTheDocument();
      expect(screen.getByText('User 11')).toBeInTheDocument();
    });
  });

  it('handles message selection and status update', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      const msg = screen.getByText('User 11');
      fireEvent.click(msg);
    });

    expect(screen.getByText('COMPOSE_REPLY')).toBeInTheDocument();
  });

  it('sends a reply successfully', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('User 11'));
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
      fireEvent.click(screen.getByText('User 11'));
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

  it('handles pagination', async () => {
    renderWithProviders(<ManageMessages />);
    
    await waitFor(() => {
      expect(screen.getByText('User 11')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    const nextBtn = screen.getByText(/NEXT/i);
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('User 11')).not.toBeInTheDocument();
    });

    const prevBtn = screen.getByText(/PREV/i);
    fireEvent.click(prevBtn);

    await waitFor(() => {
      expect(screen.getByText('User 11')).toBeInTheDocument();
    });
  });

  it('handles error on delete', async () => {
    server.use(
      http.delete(`${API_URL}/api/v1/messages/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageMessages />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('User 11'));
    });
    fireEvent.click(screen.getByText('delete'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles error on reply', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/messages/reply/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageMessages />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('User 11'));
    });
    
    fireEvent.change(screen.getByPlaceholderText(/> Type response.../i), { target: { value: 'Err reply' } });
    fireEvent.click(screen.getByText(/\[ Transmit_Reply \]/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
