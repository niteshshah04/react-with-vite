import { useEffect, useState } from "react";
import './Dashboard.css';
import { urls } from "./api/dashboardApi";
import LineChartModal from '../Graph/LineChartModal';
import stockData from '../Mock/getNiftyDataList.json';
import { useCleanData, } from "./hooks/useBullishOITable";
import { useDataProcessing } from "./hooks/useDataProcessing";
import StockListTable from "../StockListTable/StockListTable";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import NotificationTable from "../Notification/NotificationTable";
import { useBullishTrainedOIData } from "./hooks/useBullishTrainedOITable";
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import { IBullishOIData, IBUllishTrainedOIData, INiftyStockList } from "./types";
import { Tabs, Tab, Box, TextField, FormControlLabel, Checkbox, Modal } from "@mui/material";

const DashboardTable = () => {
  const [bullishOIData, setBullishOIData] = useState<IBullishOIData[]>([]);
  const [bullishTrainedOIData, setBullishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [bearishOIData, setBearishOIData] = useState<IBullishOIData[]>([]);
  const [bearishTrainedOIData, setBearishTrainedOIData] = useState<IBUllishTrainedOIData[]>([]);
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false)
  const [oiAdvanceDeclineData, setOIAdvanceDeclineData] = useState({ Advance: 0, Decline: 0, AdvanceActive: 0, DeclineActive: 0 });
  const [notificationData, setNotificationData] = useState([]);

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
          oiAdvanceDeclineData,
          notificationData
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
          setNotificationData(notificationData);
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

  const {
    tabIndex,
    page,
    rowsPerPage,
    order,
    orderBy,
    showActiveOnly,
    searchText,
    setSearchText,
    handleSort,
    handleTabChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCheckboxChange,
    filterData,
    getProcessedData
  } = useDataProcessing();

  const callSelecteddata = (row: any) => {
    setSelectedData(row);
    setOpen(true);
  }

  const closeModal = () => { 
    setOpen(false);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <TodaySentimentBar oiAdvanceDeclineData={oiAdvanceDeclineData} />
        <ActiveSentimentBar oiAdvanceDeclineData={oiAdvanceDeclineData} />
      </div>
      <Box sx={{ width: "100%" }}>
        {/* Tabs */}
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Bullish" />
          <Tab label="Bullish Trained" />
          <Tab label="Bearish" />
          <Tab label="Bearish Trained" />
          <Tab label="F&O Stock" />
          <Tab label="Notifications" />
        </Tabs>

        {/* Common Search Bar */}
        <Box p={2} display="flex" alignItems="center">
          {tabIndex !== 5 && <TextField
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />}
          {tabIndex !== 4 && tabIndex !== 5 && (
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
          )}
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
          />
        )}

        {/* Display Notification Table */}
        {tabIndex === 5 && (
          <NotificationTable
            notificationData={notificationData}
            orderBy={orderBy}
            order={order}
            handleSort={handleSort}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}

        <Modal open={open} onClose={closeModal} className="custom-modal">
          <LineChartModal closeModal={closeModal} row={selectedData} />
        </Modal>
      </Box>
    </>
  );
};

export default DashboardTable;
