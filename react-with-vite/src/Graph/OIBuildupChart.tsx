import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import "./OIBuildupChart.css";
import { useOIBuildUpData } from "./hooks/useOIBuildUpData";

interface ILineChartModalProps {
  closeModal: () => void;
  row: any;
}

const buildUpColors: any = {
  "Long Buildup": "#008000", // Green
  "Short Covering": "#90EE90", // Light Green
  "Short Buildup": "#FF0000", // Red
  "Long Unwinding": "#FFA500", // Orange
  Unchanged: "#D3D3D3", // Gray
};

const OIBuildupChart = React.forwardRef<HTMLDivElement, ILineChartModalProps>(({ closeModal, row }, ref) => {
  const { oiBuildUpData, isLoading } = useOIBuildUpData(row);
  const getClassName = (value: string) => {
    switch (value) {
      case "Call Buying":
      case "Put Buying":
      case "Long Buildup":
        return "dark-green";
      case "Call Writing":
      case "Put Writing":
      case "Short Buildup":
        return "dark-red";
      case "Call Short Covering":
      case "Put Short Covering":
      case "Short Covering":
        return "light-green";
      case "Call Long Covering":
      case "Put Long Covering":
      case "Long Unwinding":
        return "orange";
      default:
        return "grey";
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "80%", margin: "auto", mt: 2, mb: 4, backgroundColor: "white", p: 3, borderRadius: 2, boxShadow: 3 }} tabIndex={0} ref={ref}>
        <Typography variant="h6" align="center">Loading...</Typography>
      </Box>
    );
  }

  const strikePrices = Object.keys(oiBuildUpData);

  return (
    <div className="container">
      <h2>{row.stock} OI Buildup</h2>
      <div className="table-container">
        {oiBuildUpData && (
          <table className="styled-table">
            <thead>
              <tr className="table-row">
                <th></th>
                {strikePrices.map((strikePrice, index) => (
                  <th key={index}>{strikePrice}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-cell">PE</td>
                {strikePrices.map((strikePrice, index) => (
                  <td
                    key={index}
                    className={`table-cell color-cell ${getClassName(
                      oiBuildUpData[strikePrice]?.PE?.buildUp || ""
                    )}`}
                    style={{
                      backgroundColor: buildUpColors[oiBuildUpData[strikePrice]?.PE?.buildUp] || "transparent",
                    }}
                  ></td>
                ))}
              </tr>
              <tr className="table-row">
                <td className="table-cell">CE</td>
                {strikePrices.map((strikePrice, index) => (
                  <td
                    key={index}
                    className={`table-cell color-cell ${getClassName(
                      oiBuildUpData[strikePrice]?.CE?.buildUp || ""
                    )}`}
                    style={{
                      backgroundColor: buildUpColors[oiBuildUpData[strikePrice]?.CE?.buildUp] || "transparent",
                    }}
                  ></td>
                ))}
              </tr>
              <tr className="table-row">
                <td className="table-cell">PCR</td>
                {strikePrices.map((strikePrice, index) => (
                  <td key={index}>
                    {oiBuildUpData[strikePrice]?.PE && oiBuildUpData[strikePrice]?.CE
                      ? (oiBuildUpData[strikePrice].PE.openInterest / oiBuildUpData[strikePrice].CE.openInterest).toFixed(2)
                      : "N/A"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}

        <div className="legend">
          {Object.entries(buildUpColors).map(([key, color]) => (
            <div key={key} className="legend-item">
              <span
                className="color-box"
                style={{ backgroundColor: color as string }}
              ></span>
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default OIBuildupChart;