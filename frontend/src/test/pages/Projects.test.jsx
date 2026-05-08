import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Projects from '../../pages/Projects';
import { renderWithProviders } from '../utils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

describe('Projects Page Regression', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('matches DOM snapshot when loaded', async () => {
    const { container } = renderWithProviders(<Projects />);
    
    // Wait for the mock data to load
    await screen.findByText('Mock Project');
    
    // Create a snapshot of the container
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when projects is null', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/projects`, () => {
        return HttpResponse.json(null);
      })
    );
    const { container } = renderWithProviders(<Projects />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
