import React, { useContext, useEffect, useState } from "react";
import "./SentimentBar.css"; // Import the CSS file
import { Box, Typography, LinearProgress, Card } from "@mui/material";

const TodaySentimentBar = () => {
  // const baseURL = useContext(baseURLContext);
  const [data, setData] = useState({ advance: 0, decline: 0 });

  useEffect(() => {
    setData({ advance: 39, decline: 3 });
  }, []);

  const total = data.advance + data.decline;
  const advancePercentage = total > 0 ? (data.advance / total) * 100 : 0;
  const declinePercentage = total > 0 ? (data.decline / total) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box fontWeight={800} display="flex" justifyContent="center" alignItems="center" marginBottom={1}>Today Sentiment</Box>
      <Box marginTop={2} marginBottom={2} display="flex" justifyContent="center" alignItems="center" minHeight="100">
        <Card sx={{ width: 500, p: 2, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Advance / Decline (NSE)
          </Typography>
          <LinearProgress
            variant="determinate"
            color="success"
            value={advancePercentage} // Adjust based on data
            sx={{ height: 10, borderRadius: 5, bgcolor: "red" }}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography color="green">39</Typography>
            <Typography color="red">3</Typography>
          </Box>
        </Card>
      </Box>
    </div>

  );
};

export default TodaySentimentBar;
