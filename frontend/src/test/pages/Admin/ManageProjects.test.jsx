import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageProjects from '../../../pages/Admin/ManageProjects';
import { renderWithProviders } from '../../utils';
import toast from 'react-hot-toast';

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ManageProjects Component', () => {
  it('renders correctly and lists projects', async () => {
    renderWithProviders(<ManageProjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Manage Projects')).toBeInTheDocument();
      expect(screen.getByText('Mock Project')).toBeInTheDocument();
    });
  });

  it('submits a new project with correct payload', async () => {
    renderWithProviders(<ManageProjects />);
    
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Proj' } });
    fireEvent.change(screen.getByPlaceholderText('Subtitle'), { target: { value: 'Sub' } });
    fireEvent.change(screen.getByPlaceholderText('Icon (e.g. code, terminal)'), { target: { value: 'code' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByPlaceholderText('Technologies (comma separated)'), { target: { value: 'React, Node' } });
    fireEvent.change(screen.getByPlaceholderText('Code Snippet'), { target: { value: 'console.log()' } });

    const addButton = screen.getByText(/\[ Add_Project \]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project added successfully!');
    });
  });

  it('handles edit and reset', async () => {
    renderWithProviders(<ManageProjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Project')).toBeInTheDocument();
    });

    const editBtn = screen.getByText('edit');
    fireEvent.click(editBtn);

    expect(screen.getByText(/Edit Project: Mock Project/i)).toBeInTheDocument();
    
    const cancelBtn = screen.getByText(/\[ Cancel_Edit \]/i);
    fireEvent.click(cancelBtn);
    
    expect(screen.getByText(/Add New Project/i)).toBeInTheDocument();
  });

  it('handles delete', async () => {
    renderWithProviders(<ManageProjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Project')).toBeInTheDocument();
    });

    const deleteBtn = screen.getByText('delete');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project deleted successfully!');
    });
  });
});
