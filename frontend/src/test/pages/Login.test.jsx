import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { renderWithProviders } from '../utils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

describe('Login Page Unit Test', () => {
  it('renders login form and accepts inputs', () => {
    const { container } = renderWithProviders(<Login />);
    
    expect(screen.getByText('ADMIN_AUTH_REQUIRED')).toBeInTheDocument();
    
    const userField = container.querySelector('input[type="text"]');
    const passField = container.querySelector('input[type="password"]');
    
    fireEvent.change(userField, { target: { value: 'admin' } });
    fireEvent.change(passField, { target: { value: 'root' } });
    
    expect(userField.value).toBe('admin');
    expect(passField.value).toBe('root');
  });

  it('handles login success', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/auth`, () => {
        return HttpResponse.json({ 
          token: 'fake-token', 
          username: 'admin', 
          role: 'OWNER' 
        });
      })
    );

    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('[ Execute_Login ]'));

    await waitFor(() => {
      expect(localStorage.getItem('isAuthenticated')).toBe('true');
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });

  it('handles login failure', async () => {
    server.use(
      http.post(`${API_URL}/api/v1/auth`, () => {
        return new HttpResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
      })
    );

    renderWithProviders(<Login />);
    
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('[ Execute_Login ]'));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
