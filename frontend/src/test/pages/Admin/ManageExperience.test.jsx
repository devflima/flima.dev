import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageExperience from '../../../pages/Admin/ManageExperience';
import { renderWithProviders } from '../../utils';
import toast from 'react-hot-toast';

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ManageExperience Component', () => {
  it('renders and lists experiences', async () => {
    renderWithProviders(<ManageExperience />);
    
    await waitFor(() => {
      expect(screen.getByText('Manage Experience')).toBeInTheDocument();
      expect(screen.getByText('Mock Corp')).toBeInTheDocument();
    });
  });

  it('submits a new experience entry', async () => {
    renderWithProviders(<ManageExperience />);
    
    fireEvent.change(screen.getByPlaceholderText('Job Title'), { target: { value: 'New Job' } });
    fireEvent.change(screen.getByPlaceholderText('Company'), { target: { value: 'New Corp' } });
    fireEvent.change(screen.getByPlaceholderText('Period (e.g. 2021 - PRESENT)'), { target: { value: '2022 - 2023' } });
    fireEvent.change(screen.getByPlaceholderText('Technologies (comma separated)'), { target: { value: 'React, Node' } });
    fireEvent.change(screen.getByPlaceholderText('Icon (e.g. dns, database)'), { target: { value: 'code' } });
    fireEvent.change(screen.getByPlaceholderText(/Bullets/i), { target: { value: 'B1\\nB2' } });

    const addButton = screen.getByText(/\[ Add_Experience \]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Experience added successfully!');
    });
  });

  it('handles edit and delete', async () => {
    renderWithProviders(<ManageExperience />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Corp')).toBeInTheDocument();
    });

    // Edit
    const editBtn = screen.getByText('edit');
    fireEvent.click(editBtn);
    expect(screen.getByText(/Edit Experience: Mock Corp/i)).toBeInTheDocument();

    // Delete
    const deleteBtn = screen.getByText('delete');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Experience deleted successfully!');
    });
  });
});
