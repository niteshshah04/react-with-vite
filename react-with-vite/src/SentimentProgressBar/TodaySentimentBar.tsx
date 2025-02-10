import "./SentimentBar.css"; // Import the CSS file
import { Box, Typography, LinearProgress, Card } from "@mui/material";

interface SentimentDataProps {
  oiAdvanceDeclineData: {
    Advance: number;
    Decline: number;
  }
}

const TodaySentimentBar = (props: SentimentDataProps) => {
  const { Advance, Decline } = props.oiAdvanceDeclineData;
  const total = Advance + Decline;
  const advancePercentage = total > 0 ? (Advance / total) * 100 : 0;

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
            <Typography color="green">{Advance}</Typography>
            <Typography color="red">{Decline}</Typography>
          </Box>
        </Card>
      </Box>
    </div>

  );
};

export default TodaySentimentBar;
