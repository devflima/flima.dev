import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import ManageExperience from '../../../pages/Admin/ManageExperience';
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
    
    const jobTitleInput = await screen.findByPlaceholderText('Job Title');
    fireEvent.change(jobTitleInput, { target: { value: 'New Job' } });
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
    
    fireEvent.change(screen.getByPlaceholderText('Job Title'), { target: { value: 'Updated Job' } });
    fireEvent.click(screen.getByText(/\[ Update_Experience \]/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Experience updated successfully!');
    });

    // Delete
    const deleteBtn = screen.getByText('delete');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Experience deleted successfully!');
    });
  });

  it('handles error on update', async () => {
    server.use(
      http.put(`${API_URL}/api/v1/experiences/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageExperience />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('edit'));
    });
    
    fireEvent.click(screen.getByText(/\[ Update_Experience \]/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles error on save', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/experiences`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageExperience />);
    const jobTitleInput = await screen.findByPlaceholderText('Job Title');
    fireEvent.change(jobTitleInput, { target: { value: 'Err Title' } });
    fireEvent.change(screen.getByPlaceholderText('Company'), { target: { value: 'Err Corp' } });
    fireEvent.change(screen.getByPlaceholderText('Period (e.g. 2021 - PRESENT)'), { target: { value: '2022 - 2023' } });
    fireEvent.change(screen.getByPlaceholderText('Technologies (comma separated)'), { target: { value: 'React' } });
    fireEvent.change(screen.getByPlaceholderText('Icon (e.g. dns, database)'), { target: { value: 'code' } });
    fireEvent.change(screen.getByPlaceholderText(/Bullets/i), { target: { value: 'B1' } });
    
    fireEvent.click(screen.getByText(/\[ Add_Experience \]/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it('handles error on delete', async () => {
    server.use(
      http.delete(`${API_URL}/api/v1/experiences/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<ManageExperience />);
    await waitFor(() => {
      const deleteBtn = screen.getByText('delete');
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      fireEvent.click(deleteBtn);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
