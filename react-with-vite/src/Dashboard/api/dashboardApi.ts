// API Base URLs
export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL_TRAINED = import.meta.env.VITE_API_URL_TRAINED;
export const API_URL_NIFTY = import.meta.env.VITE_API_URL_NIFTY;
// API Endpoints
export const API_ENDPOINTS = {
  BULLISH_OI: `${API_URL}/api/v1/getBullishOIData`,
  BEARISH_OI: `${API_URL}/api/v1/getBearishOIData`,
  BULLISH_TRAINED: `${API_URL_TRAINED}/bullish`,
  BEARISH_TRAINED: `${API_URL_TRAINED}/bearish`,
  OI_ADVANCE_DECLINE: `${API_URL}/api/v1/getOIAdvanceDecline`,
  NOTIFICATIONS: `${API_URL}/api/v1/getNotification`,
  NIFTY_STOCK_LIST: `${API_URL_NIFTY}/api/v1/getNiftyDataList`,
  SECTOR_INFO: `${API_URL_NIFTY}/api/v1/getSectorInfo`,
  SECTOR_INDEX: `${API_URL_NIFTY}/api/v1/getIndexInfo`,
  NEWS: `${API_URL}/api/v1/getNews`
};

export const urls = Object.values(API_ENDPOINTS);