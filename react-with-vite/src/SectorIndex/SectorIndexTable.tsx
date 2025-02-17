import { Card, Typography, Grid, Box } from "@mui/material";

// const sectorData = {
//   "India VIX": 2.4,
//   "Nifty FMCG": -0.2,
//   "Nifty IT": -0.36,
//   "Nifty 50": -0.73,
//   "Nifty Fin Service": -0.78,
//   "Nifty Bank": -0.94,
//   "Nifty Pvt Bank": -1,
//   "Nifty 100": -1.03,
//   "Nifty MNC": -1.08,
//   "Nifty Infra": -1.41,
//   "Nifty Auto": -1.63,
//   "Nifty Metal": -2.25,
//   "Nifty Realty": -2.38,
//   "Nifty PSU Bank": -2.41,
//   "Nifty Next 50": -2.46,
//   "Nifty Energy": -2.74,
//   "Nifty Pharma": -2.75,
//   "Nifty Midcap 50": -2.77,
//   "Nifty CPSE": -2.94,
//   "Nifty PSE": -3.01,
//   "Nifty Media": -3.25
// };

interface SectorIndexTableProps {
  sectorIndex: any[];
}

const SectorIndexTable = ({ sectorIndex }: SectorIndexTableProps) => {
  return (
    <Box
      sx={{
        width: "100%", 
        maxWidth: 500, 
        height: 500, 
        overflowY: "auto",
        margin: "auto",
        mt: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        padding: 2,
        backgroundColor: "#fff"
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Sector Index
      </Typography>
      <Grid container spacing={1} direction="column">
        {Object.entries(sectorIndex).length > 0 ? Object.entries(sectorIndex).map(([sector, change]) => (
          <Grid item key={sector}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
                bgcolor: change < 0 ? "#ffebee" : "#e8f5e9",
                borderLeft: `6px solid ${change < 0 ? "red" : "green"}`,
                boxShadow: "none",
                fontSize: "14px" // Reduce font size to fit more items
              }}
            >
              <Typography variant="body2">{sector}</Typography>
              <Typography variant="body2" sx={{ color: change < 0 ? "red" : "green", fontWeight: "bold" }}>
                {change}%
              </Typography>
            </Card>
          </Grid>
        )) : (
          <Grid item>
            <Typography variant="body2" align="center">
              No data available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SectorIndexTable;

