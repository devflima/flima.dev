/* global beforeAll, afterEach, afterAll */
import '@testing-library/jest-dom';
import { fetch } from 'cross-fetch';
import { server } from './mocks/server';
import { apiSlice } from '../store/apiSlice';
import { store } from '../store';

globalThis.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});
afterAll(() => server.close());
