export type IBullishOIData = {
  id: number;
  stock: string;
  count: number;
  active: boolean;
  ltp: number;
  time: string;
  CE_SB: number;
  CE_LB: number;
  PE_LB: number;
  PE_LU: number;
  PE_SB: number;
  CE_SC: number;
  PE_SC: number;
  CE_LU: number;
};

type TimeAndPrice = {
  CE_ShortBuildup: number;
  CE_ShortBuildUp: number;
  CE_LongBuildup: number;
  CE_LongBuildUp: number;
  PE_LongBuildUp: number;
  PE_LongUnwinding: number;
  PE_ShortBuildUp: number;
  ltp: number;
  time: string;
  CE_ShortCovering: number;
  PE_ShortCovering: number;
  CE_LongUnwinding: number;
};

type StockInfo = {
  timeAndPrice: TimeAndPrice[];
  count: number;
  active: boolean;
};

export type IBullishOIResponse = Record<string, StockInfo>;

export type IBUllishTrainedOIData = {
  id: number;
  stock: string;
  count: number;
  active: boolean;
  added_time: string;
  removed_time: string | null;
}

type TimeEntry = {
  added_time: string;
  removed_time: string | null;
};

type StockActivity = {
  active: boolean;
  counter: number;
  times: TimeEntry[];
};

export type IBullishTrainedOIResponse = Record<string, StockActivity>;

export type INiftyStockList = {
  id: number;
  symbol: string;
  name: string;
  token: string;
  closePrice: number;
  exchangeSeg: string;
  nifty50: boolean;
  lotSize: number;
  sector: string;
  exchangeType: string;
  high: number;
  ath: number;
}
