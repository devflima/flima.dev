import '@testing-library/jest-dom';
import { fetch } from 'cross-fetch';
import { server } from './mocks/server';

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
