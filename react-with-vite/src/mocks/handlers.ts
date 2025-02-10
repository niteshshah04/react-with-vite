// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/posts`, async () => {
    const data = await import('../Mock/getBullishOIDetails.json')
    console.log('1111', data.default)
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
];