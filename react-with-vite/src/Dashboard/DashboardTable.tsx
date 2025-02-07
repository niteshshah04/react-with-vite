import { useEffect, useState } from "react";
import { Tabs, Tab, Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import getBullishOIDEtails from "../Mock/getBullishOIDetails.json";
import getBullishTrainedData from "../Mock/getBullishTrainedData.json";
import getBearishhOIDEtails from "../Mock/getBearishOIDetails.json";
import getBearishTrainedData from "../Mock/getBearishTrainedData.json";
import stockData from '../Mock/getNiftyDataList.json';
import { IBullishOIData, IBUllishTrainedOIData, INiftyStockList } from "./types";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import StockListTable from "../StockListTable/StockListTable";
import { useBullishTrainedOIData } from "./hooks/useBullishTrainedOITable";
import { useHandleChangeRowsPerPage, useCleanData, useHandleTabChange, useHandleSort } from "./hooks/useBullishOITable";

const DashboardTable = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Show 3 rows per page
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[]>([]);
  const [bullishTrainedOIData, setBullishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [bearishOIData, setBearishOIData] = useState<IBullishOIData[]>([]);
  const [bearishTrainedOIData, setBearishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);


  // custom hooks for Bullish Trained Data
  const { cleanBullishTrainedOIData } = useBullishTrainedOIData();
  const bullishTrainedData = cleanBullishTrainedOIData(getBullishTrainedData);
  const bearishTrainedData = cleanBullishTrainedOIData(getBearishTrainedData);

  // custom hooks for Clean Data
  const { cleanData } = useCleanData();
  const bullishData = cleanData(getBullishOIDEtails);
  const bearishData = cleanData(getBearishhOIDEtails);

  useEffect(() => {
    setBullishOIData(bullishData);
    setBullishTrainedOIData(bullishTrainedData);
    setBearishOIData(bearishData);
    setBearishTrainedOIData(bearishTrainedData);
    // Ensure dependencies are stable and not causing re-renders
  }, [cleanData, getBullishOIDEtails, getBullishTrainedData, getBearishhOIDEtails, getBearishTrainedData ]);
  
  // custom hooks for Handle Tab Change
  const handleTabChange = useHandleTabChange(setTabIndex, setSearchText, setPage);

  // custom hooks for Handle Sorting
  const handleSort = useHandleSort(order, orderBy, setOrder, setOrderBy);

  // Sorting Function
  const sortData = (data: any[], orderBy: string, order: "asc" | "desc") => {
    if (!orderBy || !order) {
      return data;
    }
  
    return data.sort((a: any, b: any) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };
  // Get sorted, filtered, and paginated data
  const getProcessedData = (data: any) => {
    return sortData(filterData([...data]), orderBy, order).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };

    // Filter data based on search text and active status
    const filterData = (data: any) => {
      return data.filter((row: any) =>
        (showActiveOnly ? row.active === true : true) &&
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowActiveOnly(event.target.checked);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Bullish Data" />
        <Tab label="Bullish Trained Data" />
        <Tab label="Bearish Data" />
        <Tab label="Bearish Trained Data" />
        <Tab label="F&O Stock List" />
        <Tab label="Bullish OI Breakout" />
      </Tabs>

      {/* Common Search Bar */}
      <Box p={2} display="flex" alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Box ml={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showActiveOnly}
                onChange={handleCheckboxChange}
                name="showActiveOnly"
                color="primary"
              />
            }
            label="Show Active Only"
          />
        </Box>
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

      {/* Display Bearish OI Table */}
      {tabIndex === 2 && (
        <BearishOITable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          bearishOIData={bearishOIData}
          getProcessedData={getProcessedData}
          filterData={filterData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      {/* Display Bearish Trained OI Table */}
      {tabIndex === 3 && (
        <BearishTrainedOITable
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          bearishTrainedOIData={bearishTrainedOIData}
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

      {/* Display Bullish OI Breakout Table */}
      {tabIndex === 5 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <div style={{ fontWeight: "bold" }}>Coming soon</div>
        </Box>
      )}
    </Box>
  );
};

export default DashboardTable;
