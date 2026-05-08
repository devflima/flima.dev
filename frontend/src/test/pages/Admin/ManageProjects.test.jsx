import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageProjects from '../../../pages/Admin/ManageProjects';
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
    
    const titleInput = await screen.findByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Proj' } });
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

  it('handles edit mode', async () => {
    renderWithProviders(<ManageProjects />);
    
    await waitFor(() => {
      expect(screen.getByText('Mock Project')).toBeInTheDocument();
    });

    const editBtn = screen.getByText('edit');
    fireEvent.click(editBtn);

    expect(screen.getByText(/Edit Project: Mock Project/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Mock Project')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Mock Subtitle')).toBeInTheDocument();
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

  it('handles edit and submit update', async () => {
    renderWithProviders(<ManageProjects />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('edit'));
    });

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Project' } });
    fireEvent.click(screen.getByText(/\[ Update_Project \]/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project updated successfully!');
    });
  });

  it('handles error on update', async () => {
    server.use(
      http.put(`${API_URL}/api/v1/projects/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageProjects />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('edit'));
    });
    
    fireEvent.click(screen.getByText(/\[ Update_Project \]/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles error on delete', async () => {
    server.use(
      http.delete(`${API_URL}/api/v1/projects/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageProjects />);
    await waitFor(() => {
      const deleteBtn = screen.getByText('delete');
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      fireEvent.click(deleteBtn);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles error on submit', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/projects`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageProjects />);
    
    const titleInput = await screen.findByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Err Proj' } });
    fireEvent.change(screen.getByPlaceholderText('Subtitle'), { target: { value: 'Sub' } });
    fireEvent.change(screen.getByPlaceholderText('Icon (e.g. code, terminal)'), { target: { value: 'code' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByPlaceholderText('Technologies (comma separated)'), { target: { value: 'React' } });
    fireEvent.change(screen.getByPlaceholderText('Code Snippet'), { target: { value: 'err' } });

    const addButton = screen.getByText(/\[ Add_Project ]/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
