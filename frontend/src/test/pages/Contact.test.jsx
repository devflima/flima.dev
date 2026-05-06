import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../../pages/Contact';
import { renderWithProviders } from '../utils';

describe('Contact Page Integration', () => {
  it('submits form and activates cooldown logic', async () => {
    renderWithProviders(<Contact />);
    
    const nameInput = await screen.findByPlaceholderText('Enter string...');
    const emailInput = screen.getByPlaceholderText('user@domain.tld');
    const bodyInput = screen.getByPlaceholderText('Enter payload data...');
    const titleInput = screen.getByPlaceholderText('Enter metadata...');
    const submitBtn = screen.getByText('[ Execute_Transmission ]');
    
    // Fill form
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(bodyInput, { target: { name: 'message_body', value: 'Testing contact flow' } });
    fireEvent.change(titleInput, { target: { name: 'title_header', value: 'Test Subject' } });
    
    // Submit
    fireEvent.click(submitBtn);
    
    // Expect Loading state
    await screen.findByText('[ Transmitting... ]');
    
    // Wait for success and cooldown
    await waitFor(() => {
      expect(screen.getByText('> Payload transmitted successfully. Connection closed.')).toBeInTheDocument();
    });
    
    // Expect Cooldown button
    const cooldownBtn = await screen.findByText(/\[ Rate_Limit: \d+s \]/);
    expect(cooldownBtn).toBeInTheDocument();
    expect(cooldownBtn).toBeDisabled();
  });
});
