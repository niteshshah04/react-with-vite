import { useState } from "react";
import './Dashboard.css';
import { Tabs, Tab, Box, Modal } from "@mui/material";
import { useDataFetching } from "./hooks/useDataFetching";
import { useDataProcessing } from "./hooks/useDataProcessing";
import TableControls from "./components/TableControls";
import OITrendChart from "../Graph/OITrendChart";
import StockListTable from "../StockListTable/StockListTable";
import BullishOITable from "../BullishOIDetails/BullishOITable";
import BearishOITable from "../BearishOIDetails/BearishOITable";
import NotificationTable from "../Notification/NotificationTable";
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";
import BullishTrainedOITable from "../BullishTrainedOI/BullishTrainedOITable";
import BearishTrainedOITable from "../BearishTrainedOI/BearishTrainedOITable";
import CombinedOptionsTrendChart from "../Graph/CombinedOptionsTrendChart";
import HeatMap from "../HeatMap/HeatMap";
import MUITable from "../SectorInfo/SectorInfo";
import SectorIndexTable from "../SectorIndex/SectorIndexTable";
import NewsCard from "../News/NewsCard";
import OIBuildupChart from "../Graph/OIBuildupChart"; 
import DetailsModal from "../Graph/DetailsModal";

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
    isLoading,
    sectorInfo,
    sectorIndex,
    news,
    combinedOIData
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
    getProcessedData,
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
    callSelecteddata,
  };

  const handleModalTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
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
          <Tab label="Sector Info" />
          <Tab label="Sector Index" />
          <Tab label="News" />
          <Tab label="Heat Map" />
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
          <Box className="modal-content">
            <Box className="modal-tabs">
              <Tabs
                value={modalTabIndex}
                onChange={handleModalTabChange}
                centered
              >
                <Tab label="CE/PE Trends" />
                <Tab label="Sentiment" />
                <Tab label="OI BuildUp" />
                <Tab label="Details" />
              </Tabs>
            </Box>

            <Box className="modal-body">
              {modalTabIndex === 0 && (
                <OITrendChart closeModal={closeModal} row={selectedData} />
              )}
              {modalTabIndex === 1 && (
                <div className="chart-container">
                  <CombinedOptionsTrendChart
                    closeModal={closeModal}
                    row={selectedData}
                  />
                </div>
              )}
              {modalTabIndex === 2 && (
                <OIBuildupChart closeModal={closeModal} row={selectedData}/>
              )}
               {modalTabIndex === 3 && (
                <DetailsModal closeModal={closeModal} row={selectedData} oiData={combinedOIData}/>
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
      {tabIndex === 6 && (
        <MUITable sectorInfo={sectorInfo} />
      )}
      {tabIndex === 7 && (
        <SectorIndexTable sectorIndex={sectorIndex} />
      )}
      {tabIndex === 8 && (
        <NewsCard news={news} />
      )}
      {tabIndex === 9 && (
        <HeatMap />
      )}
    </>
  );
};

export default DashboardTable;
