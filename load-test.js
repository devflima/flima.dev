import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Sobe para 20 usuários em 30s
    { duration: '1m', target: 50 },  // Sobe para 50 usuários em 1m
    { duration: '30s', target: 0 },  // Desce para 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem ser < 500ms
  },
};

const BASE_URL = 'https://flima.dev'; // Altere para seu domínio ou IP

export default function () {
  // Teste da Home
  const resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'home status is 200': (r) => r.status === 200,
  });

  // Teste da API de Projetos (se estiver pública)
  const resApi = http.get(`${BASE_URL}/api/v1/projects`);
  check(resApi, {
    'api status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
