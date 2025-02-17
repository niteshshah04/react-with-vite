import { useState, useEffect } from 'react';
import { urls } from "../api/dashboardApi";
import { useCleanData } from "./useBullishOITable";
import { useBullishTrainedOIData } from "./useBullishTrainedOITable";
import { IBullishOIData, IBUllishTrainedOIData, INiftyStockList } from "../types";
import { INotificationData } from '../../Notification/types';
interface OIAdvanceDeclineData {
  Advance: number;
  Decline: number;
  AdvanceActive: number;
  DeclineActive: number;
}

export const useDataFetching = () => {
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[]>([]);
  const [bullishTrainedOIData, setBullishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [bearishOIData, setBearishOIData] = useState<IBullishOIData[]>([]);
  const [bearishTrainedOIData, setBearishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [oiAdvanceDeclineData, setOIAdvanceDeclineData] = useState<OIAdvanceDeclineData>({ 
    Advance: 0, Decline: 0, AdvanceActive: 0, DeclineActive: 0 
  });
  const [notificationData, setNotificationData] = useState<INotificationData[]>([]);
  const [niftyStockList, setNiftyStockList] = useState<INiftyStockList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sectorInfo, setSectorInfo] = useState<any[]>([]);
  const [sectorIndex, setSectorIndex] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  const { cleanBullishTrainedOIData } = useBullishTrainedOIData();
  const { cleanData } = useCleanData();

  useEffect(() => {
    const fetchData = async () => {
      if (import.meta.env.VITE_USE_MSW === "true" && import.meta.env.MODE !== "production") {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay
      }
      setIsLoading(true);
      try {
        console.log('Attempting to fetch from URLs:', urls);
        const responses = await Promise.all(
          urls.map(async (url) => {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                console.warn(`Failed to fetch from ${url}: ${response.statusText}`);
                return null;
              }
              const data = await response.json();
              console.log(`Successful response from ${url}:`, data);
              return data;
            } catch (error) {
              console.error(`Error fetching from ${url}:`, error);
              return null;
            }
          })
        );

        const [
          bullishOIData,
          bearishOIData,
          bullishTrainedData,
          bearishTrainedData,
          oiAdvanceDeclineData,
          notificationData,
          niftyStockList,
          sectorInfo,
          sectorIndex,
          news
        ] = responses;

        if (bullishOIData) setBullishOIData(cleanData(bullishOIData));
        if (bearishOIData) setBearishOIData(cleanData(bearishOIData));
        if (bullishTrainedData) setBullishTrainedOIData(cleanBullishTrainedOIData(bullishTrainedData));
        if (bearishTrainedData) setBearishTrainedOIData(cleanBullishTrainedOIData(bearishTrainedData));
        if (oiAdvanceDeclineData) setOIAdvanceDeclineData(oiAdvanceDeclineData);
        if (notificationData) setNotificationData(notificationData);
        if (niftyStockList) setNiftyStockList(niftyStockList);
        if (sectorInfo) setSectorInfo(sectorInfo);
        if (sectorIndex) setSectorIndex(sectorIndex);
        if (news) setNews(news);
      } catch (error) {
        console.error("Error in fetchData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    bullishOIData,
    bullishTrainedOIData,
    bearishOIData,
    bearishTrainedOIData,
    oiAdvanceDeclineData,
    notificationData,
    niftyStockList,
    isLoading,
    sectorInfo,
    sectorIndex,
    news
  };
};