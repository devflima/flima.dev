import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { renderWithProviders } from '../utils';
import { Route, Routes } from 'react-router-dom';

describe('ProtectedRoute JWT Validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const TestRouter = () => (
    <Routes>
      <Route path="/login" element={<div>LOGIN_PAGE</div>} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<div>ADMIN_CONTENT</div>} />
      </Route>
    </Routes>
  );

  it('redirects to login if no token is present', () => {
    renderWithProviders(<TestRouter />, { route: '/admin' });
    expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument();
  });

  it('renders admin content if valid admin JWT is present', () => {
    // Generate valid mock JWT
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ sub: "admin", groups: ["OWNER"], role: "OWNER", exp: Math.floor(Date.now() / 1000) + 3600 }));
    const token = `${header}.${payload}.mocksignature`;
    
    localStorage.setItem('token', token);
    
    renderWithProviders(<TestRouter />, { route: '/admin' });
    expect(screen.getByText('ADMIN_CONTENT')).toBeInTheDocument();
  });

  it('redirects to login if token is expired', () => {
    // Generate EXPIRED mock JWT
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ sub: "admin", groups: ["OWNER"], role: "OWNER", exp: Math.floor(Date.now() / 1000) - 3600 }));
    const token = `${header}.${payload}.mocksignature`;
    
    localStorage.setItem('token', token);
    
    renderWithProviders(<TestRouter />, { route: '/admin' });
    expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument();
  });

  it('redirects to login if token role is not admin', () => {
    // Generate GUEST mock JWT
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ sub: "guest", groups: ["guest"], exp: Math.floor(Date.now() / 1000) + 3600 }));
    const token = `${header}.${payload}.mocksignature`;
    
    localStorage.setItem('token', token);
    
    renderWithProviders(<TestRouter />, { route: '/admin' });
    expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument();
  });
});
