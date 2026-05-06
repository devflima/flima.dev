import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Education from '../../pages/Education';
import { renderWithProviders } from '../utils';

describe('Education Page Regression', () => {
  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Education />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Degree');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });
});
