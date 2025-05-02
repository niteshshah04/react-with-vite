// Type: Custom Hook

import { useCallback } from 'react';
import { IBullishOIResponse } from '../types'; // Adjust the import path as necessary

const useCleanData = () => {
  const cleanData = useCallback((data: IBullishOIResponse) => {
    return Object.keys(data).map((key, index) => {
      const lastRecord = data[key].timeAndPrice[data[key]?.timeAndPrice?.length - 1];

      return {
        id: index + 1,
        stock: key, 
        count: data[key].count,
        active: data[key].active,
        ltp: lastRecord.ltp,
        time: lastRecord.time,
        CE_SB: lastRecord.CE_ShortBuildup?.toFixed(2) ? lastRecord.CE_ShortBuildup?.toFixed(2) : lastRecord.CE_ShortBuildUp.toFixed(2),
        CE_LB: lastRecord.CE_LongBuildup?.toFixed(2) ? lastRecord.CE_LongBuildup?.toFixed(2) : lastRecord.CE_LongBuildUp.toFixed(2),
        PE_LB: lastRecord.PE_LongBuildUp?.toFixed(2) ? lastRecord.PE_LongBuildUp?.toFixed(2) : 0,
        PE_LU: lastRecord.PE_LongUnwinding.toFixed(2),
        PE_SB: lastRecord.PE_ShortBuildUp.toFixed(2),
        CE_SC: lastRecord.CE_ShortCovering.toFixed(2),
        PE_SC: lastRecord.PE_ShortCovering.toFixed(2),
        CE_LU: lastRecord.CE_LongUnwinding?.toFixed(2) ? lastRecord.CE_LongUnwinding.toFixed(2) : 0,
      };
    });
  }, []);

  return { cleanData };
};

const useHandleChangeRowsPerPage = (_: unknown, setRowsPerPage: (value: number) => void, setPage: (value: number) => void) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
}

const useHandleTabChange = (setTabIndex: React.Dispatch<React.SetStateAction<number>>, setSearchText: React.Dispatch<React.SetStateAction<string>>, setPage: React.Dispatch<React.SetStateAction<number>>) => {
  return useCallback((_: unknown, newIndex: number) => {
    setTabIndex(newIndex);
    setSearchText(""); // Reset search on tab switch
    setPage(0); // Reset pagination when switching tabs
  }, [setTabIndex, setSearchText, setPage]);
};

const useHandleSort = (order: "asc" | "desc", orderBy: string, setOrder: (order: "asc" | "desc") => void, setOrderBy: (orderBy: string) => void) => {
  return useCallback(
    (property: string) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy, setOrder, setOrderBy]
  );
};

export { useHandleChangeRowsPerPage, useCleanData, useHandleTabChange, useHandleSort };