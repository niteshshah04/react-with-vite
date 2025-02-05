import React, { useContext, useEffect, useState } from "react";
import "./SentimentBar.css"; // Import the CSS file
import { Box, Typography, LinearProgress, Card } from "@mui/material";

const SentimentBar = () => {
  // const baseURL = useContext(baseURLContext);
  const [data, setData] = useState({ advance: 0, decline: 0 });

  useEffect(() => {
    setData({ advance: 39, decline: 3 });
  }, []);

  const total = data.advance + data.decline;
  const advancePercentage = total > 0 ? (data.advance / total) * 100 : 0;
  const declinePercentage = total > 0 ? (data.decline / total) * 100 : 0;

  return (
    //   <Box sx={{ width: "100%", maxWidth: 1000, p: 2, border: "1px solid #ddd", borderRadius: 2, bgcolor: "white", boxShadow: 1 }}>
    //   <Typography variant="subtitle1" sx={{ color: "#1f4b99", fontWeight: "bold", mb: 1 }}>
    //     Advance / Decline (NSE)
    //   </Typography>

    //   <Box sx={{ display: "flex", alignItems: "center", height: 10, borderRadius: 5, overflow: "hidden", bgcolor: "#ddd" }}>
    //     <Box sx={{ width: `${advancePercentage}%`, bgcolor: "#4caf50", height: "100%" }} />
    //     <Box sx={{ width: `${declinePercentage}%`, bgcolor: "#f44336", height: "100%" }} />
    //   </Box>

    //   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
    //     <Typography variant="caption" sx={{ color: "#4caf50", fontWeight: "bold" }}>{data.advance}</Typography>
    //     <Typography variant="caption" sx={{ color: "#f44336", fontWeight: "bold" }}>{data.decline}</Typography>
    //   </Box>
    // </Box>

    <>
      <Box fontWeight={800} display="flex" justifyContent="center" alignItems="center">Market Sentiment</Box>
      <Box marginTop={2} marginBottom={2} display="flex" justifyContent="center" alignItems="center" minHeight="100">
        <Card sx={{ width: 500, p: 2, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Advance / Decline (NSE)
          </Typography>
          <LinearProgress
            variant="determinate"
            color="success"
            value={advancePercentage} // Adjust based on data
            sx={{ height: 10, borderRadius: 5, bgcolor: "lightgrey" }}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography color="green">39</Typography>
            <Typography color="red">3</Typography>
          </Box>
        </Card>
      </Box>
    </>

  );
};

export default SentimentBar;
