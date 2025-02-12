import { useState } from "react";
import './Dashboard.css';
import { Tabs, Tab, Box, Modal } from "@mui/material";
import { useDataFetching } from "./hooks/useDataFetching";
import { useDataProcessing } from "./hooks/useDataProcessing";
import TableControls from "./components/TableControls";
import LineChartModal from '../Graph/LineChartModal';
import stockData from '../Mock/getNiftyDataList.json';
import StockListTable from "../StockListTable/StockListTable";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import NotificationTable from "../Notification/NotificationTable";
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import { INiftyStockList } from "./types";

const DashboardTable = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    bullishOIData,
    bullishTrainedOIData,
    bearishOIData,
    bearishTrainedOIData,
    oiAdvanceDeclineData,
    notificationData
  } = useDataFetching();

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
  };

  const closeModal = () => setOpen(false);

  const commonTableProps = {
    order,
    orderBy,
    handleSort,
    getProcessedData,
    filterData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    callSelecteddata
  };

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "center",
      }}>
        <TodaySentimentBar oiAdvanceDeclineData={oiAdvanceDeclineData} />
        <ActiveSentimentBar oiAdvanceDeclineData={oiAdvanceDeclineData} />
      </div>
      
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Bullish" />
          <Tab label="Bullish Trained" />
          <Tab label="Bearish" />
          <Tab label="Bearish Trained" />
          <Tab label="F&O Stock" />
          <Tab label="Notifications" />
        </Tabs>

        <TableControls
          tabIndex={tabIndex}
          searchText={searchText}
          showActiveOnly={showActiveOnly}
          setSearchText={setSearchText}
          handleCheckboxChange={handleCheckboxChange}
        />

        {tabIndex === 0 && <BullishOITable {...commonTableProps} bullishOIData={bullishOIData} />}
        {tabIndex === 1 && <BullishTrainedOITable {...commonTableProps} bullishTrainedOIData={bullishTrainedOIData} />}
        {tabIndex === 2 && <BearishOITable {...commonTableProps} bearishOIData={bearishOIData} />}
        {tabIndex === 3 && <BearishTrainedOITable {...commonTableProps} bearishTrainedOIData={bearishTrainedOIData} />}
        {tabIndex === 4 && <StockListTable {...commonTableProps} stockData={stockData as unknown as INiftyStockList} />}
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