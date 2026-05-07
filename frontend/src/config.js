const envApiUrl = import.meta.env.VITE_API_URL;
const isTestMode = import.meta.env.MODE === 'test';

export const API_URL = envApiUrl || (isTestMode || import.meta.env.DEV ? 'http://localhost:8080' : '');
