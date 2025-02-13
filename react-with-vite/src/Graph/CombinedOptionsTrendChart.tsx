import React from "react";
import { Box, Button, Typography, Card } from "@mui/material";
import { useChartData } from "./hooks/useChartData";
import { useLineVisibility } from "./hooks/useLineVisibility";
import TrendLineChart from "./components/TrendLineChart";

interface ILineChartModalProps {
    closeModal: () => void;
    row: any;
}

const CombinedOptionsTrendChart = React.forwardRef<HTMLDivElement, ILineChartModalProps>(({ closeModal, row }, ref) => {
    const { chartData, isLoading } = useChartData(row);
    const { hiddenLines, toggleLineVisibility } = useLineVisibility();

    if (isLoading) {
        return (
            <Box sx={{ width: "80%", margin: "auto", mt: 2, mb: 4, backgroundColor: "white", p: 3, borderRadius: 2, boxShadow: 3 }} tabIndex={0} ref={ref}>
                <Typography variant="h6" align="center">Loading...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Typography id="modal-title" variant="h6" gutterBottom align="center">
                <Button variant="contained" color="error" onClick={closeModal} sx={{ position: "absolute", top: 5, right: 16 }}>Close</Button>
                {/* {row.stock ? row.stock : row.name} - OI Trends */}
            </Typography>

            <Card sx={{ padding: 2, boxShadow: 3, mb: 3 }}>
                <TrendLineChart
                    chartData={chartData}
                    hiddenLines={hiddenLines as unknown as Record<string, boolean>}
                    onLegendClick={toggleLineVisibility}
                    row={row}
                />
            </Card>
        </>
    );
});

export default CombinedOptionsTrendChart;
