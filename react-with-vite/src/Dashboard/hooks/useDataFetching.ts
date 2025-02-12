import { useState, useEffect } from 'react';
import { urls } from "../api/dashboardApi";
import { useCleanData } from "./useBullishOITable";
import { useBullishTrainedOIData } from "./useBullishTrainedOITable";
import { IBullishOIData, IBUllishTrainedOIData } from "../types";

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
  const [notificationData, setNotificationData] = useState([]);

  const { cleanBullishTrainedOIData } = useBullishTrainedOIData();
  const { cleanData } = useCleanData();

  useEffect(() => {
    const fetchData = () => {
      Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
        .then(([
          bullishOIData,
          bearishOIData,
          bullishTrainedData,
          bearishTrainedData,
          oiAdvanceDeclineData,
          notificationData
        ]) => {
          setBullishOIData(cleanData(bullishOIData));
          setBearishOIData(cleanData(bearishOIData));
          setBullishTrainedOIData(cleanBullishTrainedOIData(bullishTrainedData));
          setBearishTrainedOIData(cleanBullishTrainedOIData(bearishTrainedData));
          setOIAdvanceDeclineData(oiAdvanceDeclineData);
          setNotificationData(notificationData);
        })
        .catch((error) => console.error("Error fetching data:", error));
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
    notificationData
  };
};