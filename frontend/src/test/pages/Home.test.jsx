import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import { renderWithProviders } from '../utils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../config';

describe('Home Page Integration', () => {
  it('renders loading state initially', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders stats from MSW successfully', async () => {
    renderWithProviders(<Home />);
    
    // MSW returns: yearsExp: "08", sysDeployed: "40+", uptimeSLA: "99.9%", commitsLogged: "12k"
    const yearsExp = await screen.findByText('08');
    expect(yearsExp).toBeInTheDocument();
    
    expect(screen.getByText(/ARCHITECTING/i)).toBeInTheDocument();
  });

  it('renders custom title correctly', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/contents`, () => {
        return HttpResponse.json([
          { sectionType: "HOME", sectionContent: { title: "Word1 Word2 Word3 Word4", subtitle: "Sub" } }
        ]);
      })
    );

    renderWithProviders(<Home />);
    
    // Mid highlight for 4 words is index 1, count 2 (Word2 Word3)
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toContain('Word2 Word3');
    });
  });

  it('renders default content when content is missing', async () => {
    server.use(
      http.get(`${API_URL}/api/v1/contents`, () => {
        return HttpResponse.json(null);
      })
    );
    renderWithProviders(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/ARCHITECTING/i)).toBeInTheDocument();
    });
  });
});
