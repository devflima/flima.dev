import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Education from '../../pages/Education';
import { renderWithProviders } from '../utils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

describe('Education Page Regression', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<Education />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Education />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Degree');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when education is null', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/educations`, () => {
        return HttpResponse.json(null);
      })
    );
    const { container } = renderWithProviders(<Education />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
