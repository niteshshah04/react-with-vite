// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
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
  http.get(`${API_URL}/bullish`, async () => {
    const data = await import('../Mock/getBullishTrainedData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/bearish`, async () => {
    const data = await import('../Mock/getBearishTrainedData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getOIAdvanceDecline`, async () => {
    const data = await import('../Mock/getAdvanceOIDecline.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getNiftyDataList`, async () => {
    const data = await import('../Mock/getNiftyDataList.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  }),
  http.get(`${API_URL}/api/v1/getOIBuildUp?token=ADANIENT`, async () => {
    const data = await import('../Mock/getGraphData.json')
    await delay(1500);
    return HttpResponse.json(data.default);
  })  
];