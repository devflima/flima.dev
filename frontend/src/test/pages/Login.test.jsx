import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';
import { renderWithProviders } from '../utils';

describe('Login Page Unit Test', () => {
  it('renders login form and accepts inputs', () => {
    // Login doesn't fetch, it uses a mock login logic directly in the component, so we just test the UI.
    // It requires navigate from react-router-dom, which is provided by BrowserRouter in renderWithProviders.
    const { container } = renderWithProviders(<Login />);
    
    expect(screen.getByText('ADMIN_AUTH_REQUIRED')).toBeInTheDocument();
    
    const userField = container.querySelector('input[type="text"]');
    const passField = container.querySelector('input[type="password"]');
    const submitBtn = screen.getByText('[ Execute_Login ]');
    
    fireEvent.change(userField, { target: { value: 'admin' } });
    fireEvent.change(passField, { target: { value: 'root' } });
    
    expect(userField.value).toBe('admin');
    expect(passField.value).toBe('root');
    
    // We can simulate click, but testing routing here requires more setup. 
    // We just verify the form functions without crashing.
    fireEvent.click(submitBtn);
  });
});
