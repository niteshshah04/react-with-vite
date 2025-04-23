import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./OIBuildupChart.css";

interface ILineChartModalProps {
  closeModal: () => void;
  row: any;
  oiData:any;
}

const DetailsModal = React.forwardRef<HTMLDivElement, ILineChartModalProps>(({ closeModal, row, oiData }, ref) => {
  const stock = row.stock;
  // Filter data from oiData for 0 or 1 index having key same as stock and assign it to data variable
  // If data is not present return null
  const data = oiData[0][stock] ?? oiData[1][stock];
  if (!data) {
    return null;
  }

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 2, mb: 4, backgroundColor: "white", p: 3, borderRadius: 2, boxShadow: 3 }} tabIndex={0} ref={ref}>
      <Typography id="modal-title" variant="h6" gutterBottom align="center">
        <Button variant="contained" color="error" onClick={closeModal} sx={{ position: "absolute", top: 5, right: 16 }}>Close</Button>
        {row.stock}
      </Typography>
      <div className="container">
        <div className="table-container">
          {data && data.timeAndPrice && (
            <table className="styled-table">
              <thead>
                <tr className="table-row">
                  <th>Time</th>
                  <th>R Time</th>
                  <th>LTP</th>
                  <th>CE Short Covering</th>
                  <th>PE Short BuildUp</th>                  
                  <th>CE Short BuildUp</th>
                  <th>PE Short Covering</th>
                  <th>PE Long Unwinding</th>
                  <th>CE Long Buildup</th>
                </tr>
              </thead>
              <tbody>
                {data.timeAndPrice.map((item: any, index: number) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{item.time}</td>
                    <td className="table-cell">{item.removed}</td>
                    <td className="table-cell">{item.ltp}</td>
                    <td className="table-cell">{item.CE_ShortCovering}</td>
                    <td className="table-cell">{item.PE_ShortBuildUp}</td>
                    <td className="table-cell">{item.CE_ShortBuildUp}</td>
                    <td className="table-cell">{item.PE_ShortCovering}</td>
                    <td className="table-cell">{item.PE_LongUnwinding}</td>
                    <td className="table-cell">{item.CE_LongBuildup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Box>
  );
});

export default DetailsModal;