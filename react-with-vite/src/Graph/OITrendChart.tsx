import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useChartData } from "./hooks/useChartData";
import { TrendChart } from "./components/TrendChart";

interface ILineChartModalProps {
    closeModal: () => void;
    row: any;
}

const CE_LINES = [
    
    { key: 'CE_ShortBuildup', name: 'CE Short Buildup', color: '#C70039' },
    { key: 'CE_LongBuildup', name: 'CE Long Build', color: '#900C3F' },
    { key: 'CE_ShortCovering', name: 'CE Short Covering', color: '#FF5733' },
    { key: 'CE_LongUnwinding', name: 'CE Short Unwinding', color: '#581845' }
];

const PE_LINES = [
    { key: 'PE_ShortBuildup', name: 'PE Short Buildup', color: '#39C7C7' },
    { key: 'PE_LongBuildUp', name: 'PE Long Build', color: '#3F90C7' },
    { key: 'PE_ShortCovering', name: 'PE Short Covering', color: '#33FF57' },
    { key: 'PE_LongUnwinding', name: 'PE Short Unwinding', color: '#4585C7' }
];

const OITrendChart = React.forwardRef<HTMLDivElement, ILineChartModalProps>(({ closeModal, row }, ref) => {
    const { chartData, isLoading } = useChartData(row);
    const [hiddenLines, setHiddenLines] = useState<Record<string, boolean>>({
        CE_ShortBuildup: false,
        CE_LongBuildup: false,
        CE_ShortCovering: false,
        CE_LongUnwinding: false,
        PE_ShortBuildup: false,
        PE_LongBuildUp: false,
        PE_ShortCovering: false,
        PE_LongUnwinding: false,
    });

    const toggleLineVisibility = (lineKey: string) => {
        setHiddenLines(prev => ({
            ...prev,
            [lineKey]: !prev[lineKey],
        }));
    };

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

            <TrendChart
                title="CE Trends"
                data={chartData}
                lines={CE_LINES}
                hiddenLines={hiddenLines}
                onLegendClick={toggleLineVisibility}
                row={row}
            />

            <TrendChart
                title="PE Trends"
                data={chartData}
                lines={PE_LINES}
                hiddenLines={hiddenLines}
                onLegendClick={toggleLineVisibility}
                row={row}
            />
        </>
    );
});

export default OITrendChart;
