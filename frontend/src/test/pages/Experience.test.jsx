import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Experience from '../../pages/Experience';
import { renderWithProviders } from '../utils';

describe('Experience Page Regression', () => {
  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Experience />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Architect');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });
});
