import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Projects from '../../pages/Projects';
import { renderWithProviders } from '../utils';

describe('Projects Page Regression', () => {
  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Projects />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Project');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });
});
