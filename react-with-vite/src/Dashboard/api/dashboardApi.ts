// API Base URLs
export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL_TRAINED = import.meta.env.VITE_API_URL_TRAINED;

// API Endpoints
export const API_ENDPOINTS = {
  BULLISH_OI: `${API_URL}/api/v1/getBullishOIData`,
  BEARISH_OI: `${API_URL}/api/v1/getBearishOIData`,
  BULLISH_TRAINED: `${API_URL_TRAINED}/bullish`,
  BEARISH_TRAINED: `${API_URL_TRAINED}/bearish`,
  OI_ADVANCE_DECLINE: `${API_URL}/api/v1/getOIAdvanceDecline`,
  NOTIFICATIONS: `${API_URL}/api/v1/getNotification`
};

export const urls = Object.values(API_ENDPOINTS);