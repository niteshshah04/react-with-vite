export type IBullishOIData = {
    id: number;
    stock: string;
    count: number;
    active: boolean;
    ltp: number;
    time: string;
    CE_ShortBuildup: string;
    CE_LongBuildup: string;
    PE_LongBuildUp: string;
    PE_LongUnwinding: string;
    PE_ShortBuildUp: string;
    CE_ShortCovering: string;
    PE_ShortCovering: string;
    CE_LongUnwinding: string;
  };

  type TimeAndPrice = {
    CE_ShortBuildup: number;
    CE_LongBuildup: number;
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