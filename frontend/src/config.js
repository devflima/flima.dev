const envApiUrl = import.meta.env.VITE_API_URL;
const isTestMode = import.meta.env.MODE === 'test';

export const API_URL = envApiUrl || (isTestMode ? 'http://localhost:8080' : 'http://localhost:8080');
