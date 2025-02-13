import { useState } from "react";
import './Dashboard.css';
import { Tabs, Tab, Box, Modal } from "@mui/material";
import { useDataFetching } from "./hooks/useDataFetching";
import { useDataProcessing } from "./hooks/useDataProcessing";
import TableControls from "./components/TableControls";
import OITrendChart from '../Graph/OITrendChart';
import StockListTable from "../StockListTable/StockListTable";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import NotificationTable from "../Notification/NotificationTable";
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import CombinedOptionsTrendChart from "../Graph/CombinedOptionsTrendChart";


const DashboardTable = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalTabIndex, setModalTabIndex] = useState(0);

  const {
    bullishOIData,
    bullishTrainedOIData,
    bearishOIData,
    bearishTrainedOIData,
    oiAdvanceDeclineData,
    notificationData,
    niftyStockList,
    isLoading
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

  const handleModalTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setModalTabIndex(newValue);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="sentiment-bars-container">
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

        {tabIndex === 0 && (
          <BullishOITable {...commonTableProps} bullishOIData={bullishOIData} />
        )}
        {tabIndex === 1 && (
          <BullishTrainedOITable
            {...commonTableProps}
            bullishTrainedOIData={bullishTrainedOIData}
          />
        )}
        {tabIndex === 2 && (
          <BearishOITable {...commonTableProps} bearishOIData={bearishOIData} />
        )}
        {tabIndex === 3 && (
          <BearishTrainedOITable
            {...commonTableProps}
            bearishTrainedOIData={bearishTrainedOIData}
          />
        )}
        {tabIndex === 4 && (
          <StockListTable {...commonTableProps} stockData={niftyStockList} />
        )}
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

        <Modal open={open} onClose={closeModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: 2,
              maxHeight: "90vh",
              width: "90%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={modalTabIndex}
                onChange={handleModalTabChange}
                centered
              >
                <Tab label="Chart" />
                <Tab label="Details" />
              </Tabs>
            </Box>

            <Box sx={{ overflow: "auto", p: 2, flexGrow: 1 }}>
              {modalTabIndex === 0 && (
                <OITrendChart closeModal={closeModal} row={selectedData} />
              )}
              {modalTabIndex === 1 && (
                <div style={{ padding: "20px" }}>
                  <CombinedOptionsTrendChart
                    closeModal={closeModal}
                    row={selectedData}
                  />
                </div>
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default DashboardTable;