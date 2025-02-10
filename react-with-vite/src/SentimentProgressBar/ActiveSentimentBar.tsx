import "./SentimentBar.css"; // Import the CSS file
import { Box, Typography, LinearProgress, Card } from "@mui/material";

interface SentimentDataProps {
  oiAdvanceDeclineData: {
    AdvanceActive: number;
    DeclineActive: number;
  }
}

const ActiveSentimentBar = (props: SentimentDataProps) => {
  const { AdvanceActive, DeclineActive } = props.oiAdvanceDeclineData;

  const total = AdvanceActive + DeclineActive;
  const advancePercentage = total > 0 ? (AdvanceActive / total) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box fontWeight={800} display="flex" justifyContent="center" alignItems="center" marginBottom={1}>Active Sentiment</Box>
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
            <Typography color="green">{AdvanceActive}</Typography>
            <Typography color="red">{DeclineActive}</Typography>
          </Box>
        </Card>
      </Box>
    </div>

  );
};

export default ActiveSentimentBar;
