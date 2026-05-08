import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Experience from '../../pages/Experience';
import { renderWithProviders } from '../utils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

describe('Experience Page Regression', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<Experience />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Experience />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Architect');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when experiences is null', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/experiences`, () => {
        return HttpResponse.json(null);
      })
    );
    const { container } = renderWithProviders(<Experience />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
