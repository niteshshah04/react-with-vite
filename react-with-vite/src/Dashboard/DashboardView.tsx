import React from "react";
import DashboardTable from "./DashboardTable";
import TodaySentimentBar from "../SentimentProgressBar/TodaySentimentBar";
import ActiveSentimentBar from "../SentimentProgressBar/ActiveSentimentBar";
const DashboardView: React.FC = () => {
  return (
    <>
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
      <TodaySentimentBar />
      <ActiveSentimentBar />
    </div>
      <DashboardTable />
    </>
  );
};

export default DashboardView;
