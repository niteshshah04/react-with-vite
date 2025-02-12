// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_TRAINED = import.meta.env.VITE_API_URL_TRAINED;
const API_URL_NIFTY = import.meta.env.VITE_API_URL_NIFTY;
const isDevelopment = import.meta.env.MODE === 'development';
console.log('----------------Handlers----------------',isDevelopment, import.meta.env.MODE);

export const handlers = isDevelopment && import.meta.env.VITE_USE_MSW === "true" ? [
  http.get(`${API_URL}/api/v1/getBullishOIData`, async () => {
    const data = await import('../Mock/getBullishOIDetails.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getBearishOIData`, async () => {
    const data = await import('../Mock/getBearishOIDetails.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getNotification`, async () => {
    const data = await import('../Mock/getNotifications.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL_TRAINED}/bullish`, async () => {
    const data = await import('../Mock/getBullishTrainedData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL_TRAINED}/bearish`, async () => {
    const data = await import('../Mock/getBearishTrainedData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getOIAdvanceDecline`, async () => {
    const data = await import('../Mock/getAdvanceOIDecline.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL_NIFTY}/api/v1/getNiftyDataList`, async () => {
    const data = await import('../Mock/getNiftyDataList.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getOIBuildUp?token=ADANIENT`, async () => {
    const data = await import('../Mock/getGraphData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  })  
] : [];