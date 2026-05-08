import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageEducation from '../../../pages/Admin/ManageEducation';
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

describe('ManageEducation Component', () => {
  it('renders and lists education entries', async () => {
    renderWithProviders(<ManageEducation />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Degree')).toBeInTheDocument();
    });
  });

  it('submits a new degree entry', async () => {
    renderWithProviders(<ManageEducation />);
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Degree' } });
    fireEvent.change(screen.getByPlaceholderText('Institution'), { target: { value: 'New Univ' } });
    
    const addButton = screen.getByText(/\[ Add_Entry \]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Education entry added successfully!');
    });
  });

  it('switches to certification and submits', async () => {
    renderWithProviders(<ManageEducation />);
    
    const select = screen.getByLabelText(/^Type$/i);
    fireEvent.change(select, { target: { value: 'cert' } });
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Cert' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Some Desc' } });
    
    const addButton = screen.getByText(/\[ Add_Entry \]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Education entry added successfully!');
    });
  });

  it('handles edit and delete', async () => {
    renderWithProviders(<ManageEducation />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Degree')).toBeInTheDocument();
    });

    // Delete
    const deleteBtn = screen.getAllByText('delete')[0];
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Education entry deleted successfully!');
    });
  });

  it('submits a certification with N/A defaults for empty fields', async () => {
    renderWithProviders(<ManageEducation />);
    
    const select = screen.getByLabelText(/^Type$/i);
    fireEvent.change(select, { target: { value: 'cert' } });
    
    // Fill only Title, leave others empty
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Minimal Cert' } });
    
    const addButton = screen.getByText(/\[ Add_Entry \]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Education entry added successfully!');
    });
  });

  it('loads certification data for editing', async () => {
    renderWithProviders(<ManageEducation />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Cert')).toBeInTheDocument();
    });

    const editBtns = screen.getAllByText('edit');
    fireEvent.click(editBtns[1]); // The second one is the cert

    expect(screen.getByDisplayValue('Mock Specialty')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Skill1')).toBeInTheDocument();
  });
});
