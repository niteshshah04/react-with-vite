import { useEffect, useState } from "react";
import { Tabs, Tab, Box, TextField } from "@mui/material";
import getBullishOIDEtails from "../Mock/getBullishOIDetails.json";
import getBullishTrainedData from "../Mock/getBullishTrainedData.json";
import stockData from '../Mock/getNiftyDataList.json';
import { IBullishOIData, IBUllishTrainedOIData, INiftyStockList } from "./types";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import StockListTable from "../StockListTable/StockListTable";
import { useBullishTrainedOIData } from "./hooks/useBullishTrainedOITable";
import {
  useHandleChangeRowsPerPage,
  useCleanData,
  useHandleTabChange,
  useHandleSort,
} from "./hooks/useBullishOITable";

const DashboardTable = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Show 3 rows per page
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[]>([]);
  const [bullishTrainedOIData, setBullishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);

  // custom hooks for Bullish Trained Data
  const { cleanBullishTrainedOIData } = useBullishTrainedOIData();
  const bullishTrainedData = cleanBullishTrainedOIData(getBullishTrainedData);

  // custom hooks for Clean Data
  const { cleanData } = useCleanData();
  const bullishData = cleanData(getBullishOIDEtails);

  useEffect(() => {
    setBullishOIData(bullishData);
    setBullishTrainedOIData(bullishTrainedData);
  }, [bullishData]);

  // custom hooks for Handle Tab Change
  const handleTabChange = useHandleTabChange(setTabIndex, setSearchText, setPage);

  // custom hooks for Handle Sorting
  const handleSort = useHandleSort(order, orderBy, setOrder, setOrderBy);

  // Sorting Function
  const sortData = (data: any) => {
    return data.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Get sorted, filtered, and paginated data
  const getProcessedData = (data: any) => {
    return sortData(filterData([...data])).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

  // Filter data based on search text
  const filterData = (data: any) => {
    return data.filter((row: any) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // custom hooks for Handle Change Rows Per Page
  const handleChangeRowsPerPage = useHandleChangeRowsPerPage(event, setRowsPerPage, setPage);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Bullish Data" />
        <Tab label="Bullish Trained Data" />
        <Tab label="Bearish Data" />
        <Tab label="Bearish Trained Data" />
        <Tab label="F&O Stock List" />
      </Tabs>

      {/* Common Search Bar */}
      <Box p={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {/* Display Bullish OI Table */}
      {tabIndex === 0 && (
        <BullishOITable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          bullishOIData={bullishOIData}
          getProcessedData={getProcessedData}
          filterData={filterData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      {/* Display Bullish Trained OI Table */}
      {tabIndex === 1 && (
        <BullishTrainedOITable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          bullishTrainedOIData={bullishTrainedOIData}
          getProcessedData={getProcessedData}
          filterData={filterData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      {/* Display Stock List Table */}
      {tabIndex === 4 && (
        <StockListTable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          stockData={stockData as unknown as INiftyStockList}
          getProcessedData={getProcessedData}
          filterData={filterData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default DashboardTable;
