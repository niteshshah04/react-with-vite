import { useEffect, useState } from "react";
import { Tabs, Tab, Box, TextField, FormControlLabel, Checkbox, Modal } from "@mui/material";
// import getBullishOIDEtails from "../Mock/getBullishOIDetails.json";
// import getBullishTrainedData from "../Mock/getBullishTrainedData.json";
// import getBearishhOIDEtails from "../Mock/getBearishOIDetails.json";
// import getBearishTrainedData from "../Mock/getBearishTrainedData.json";
import stockData from '../Mock/getNiftyDataList.json';
import { IBullishOIData, IBUllishTrainedOIData, INiftyStockList } from "./types";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import StockListTable from "../StockListTable/StockListTable";
import { useBullishTrainedOIData } from "./hooks/useBullishTrainedOITable";
import { useHandleChangeRowsPerPage, useCleanData, useHandleTabChange, useHandleSort } from "./hooks/useBullishOITable";
import LineChartModal from '../Graph/LineChartModal';
import './Dashboard.css';
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_TRAINED = import.meta.env.VITE_API_URL_TRAINED;
const urls = [
  `${API_URL}/api/v1/getBullishOIData`,
  `${API_URL}/api/v1/getBearishOIData`,
  `${API_URL_TRAINED}/bullish`,
  `${API_URL_TRAINED}/bearish`,
  `${API_URL}/api/v1/getOIAdvanceDecline`
];

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
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false)
  const [oiAdvanceDeclineData, setOIAdvanceDeclineData] = useState({ Advance: 0, Decline: 0, AdvanceActive: 0, DeclineActive: 0 });


  // custom hooks for Bullish Trained Data
  const { cleanBullishTrainedOIData } = useBullishTrainedOIData();
  // custom hooks for Clean Data
  const { cleanData } = useCleanData();

  useEffect(() => {
    const fetchData = () => {
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then(
        ([
          bullishOIData,
          bearishOIData,
          bullishTrainedData,
          bearishTrainedData,
          oiAdvanceDeclineData
        ]) => {
          setBullishOIData(cleanData(bullishOIData));
          setBearishOIData(cleanData(bearishOIData));
          setBullishTrainedOIData(cleanBullishTrainedOIData(bullishTrainedData));
          setBearishTrainedOIData(cleanBullishTrainedOIData(bearishTrainedData));
          setOIAdvanceDeclineData({
            Advance: oiAdvanceDeclineData.Advance,
            Decline: oiAdvanceDeclineData.Decline,
            AdvanceActive: oiAdvanceDeclineData.AdvanceActive,
            DeclineActive: oiAdvanceDeclineData.DeclineActive
          });
        }
      )
      .catch((error) => console.error("Error fetching data:", error));
    }
    // Fetch initially and then every 30 seconds
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 30000); // Fetch every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // custom hooks for Handle Change Rows Per Page
  const handleChangeRowsPerPage = useHandleChangeRowsPerPage(event, setRowsPerPage, setPage);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowActiveOnly(event.target.checked);
  };

  const callSelecteddata = (row: any) => {
    setSelectedData(row);
    setOpen(true);
  }

  const closeModal = () => { 
    setOpen(false);
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
        <TodaySentimentBar oiAdvanceDeclineData={oiAdvanceDeclineData} />
        <ActiveSentimentBar oiAdvanceDeclineData ={oiAdvanceDeclineData} />
      </div>
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
              label="Active"
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
            callSelecteddata={callSelecteddata}
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
            callSelecteddata={callSelecteddata}
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
            callSelecteddata={callSelecteddata}
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
            callSelecteddata={callSelecteddata}
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
            callSelecteddata={callSelecteddata}
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

        <Modal open={open} onClose={closeModal} className="custom-modal">
          <LineChartModal closeModal={closeModal} row={selectedData} />
        </Modal>
      </Box>
    </>
  );
};

export default DashboardTable;
