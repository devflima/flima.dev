import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import CookieBanner from '../../components/CookieBanner';
import { renderWithProviders } from '../utils';

describe('CookieBanner Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the banner when no consent exists', () => {
    renderWithProviders(<CookieBanner />);
    expect(screen.getByText(/Nós utilizamos cookies essenciais e analíticos/i)).toBeInTheDocument();
  });

  it('does not render the banner when consent is already accepted', () => {
    localStorage.setItem('lgpd_cookie_consent', 'accepted');
    const { container } = renderWithProviders(<CookieBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('handles acceptance of cookies', () => {
    renderWithProviders(<CookieBanner />);
    const acceptBtn = screen.getByText('[ Aceitar_Cookies ]');
    fireEvent.click(acceptBtn);

    expect(localStorage.getItem('lgpd_cookie_consent')).toBe('accepted');
    expect(localStorage.getItem('visitor_id')).toBeTruthy();
    expect(screen.queryByText(/Nós utilizamos cookies essenciais e analíticos/i)).not.toBeInTheDocument();
  });

  it('handles declining of cookies', () => {
    renderWithProviders(<CookieBanner />);
    const declineBtn = screen.getByText('[ Recusar ]');
    fireEvent.click(declineBtn);

    expect(localStorage.getItem('lgpd_cookie_consent')).toBe('declined');
    expect(localStorage.getItem('visitor_id')).toBeNull();
    expect(screen.queryByText(/Nós utilizamos cookies essenciais e analíticos/i)).not.toBeInTheDocument();
  });
});
