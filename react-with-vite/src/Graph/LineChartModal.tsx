import React, { useState } from "react";
import { transformData } from "../Utils/helper";
import getGraphData from "../Mock/getGraphData.json";
import { Box, Button, Typography, CardContent, Card } from "@mui/material"; 
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Convert Data
const data = transformData(getGraphData);

interface ILineChartModalProps {
  closeModal: () => void;
  row: any;
}

const LineChartModal = React.forwardRef<HTMLDivElement, ILineChartModalProps>(({ closeModal, row }, ref) => {
    // State to manage visibility of each line
    const [hiddenLines, setHiddenLines] = useState({
        CE_ShortCovering: false,
        CE_ShortBuildup: false,
        CE_LongBuildup: false,
        CE_LongUnwinding: false,
        PE_ShortCovering: false,
        PE_ShortBuildup: false,
        PE_LongBuildUp: false,
        PE_LongUnwinding: false,
    });

    // Toggle the visibility of a line when the legend is clicked
    const toggleLineVisibility = (lineKey: string) => {
        setHiddenLines((prevState: any) => ({
            ...prevState,
            [lineKey]: !prevState[lineKey],
        }));
    };

    return (
        <Box sx={{ width: "80%", margin: "auto", mt: 2, mb: 4, backgroundColor: "white", p: 3, borderRadius: 2, boxShadow: 3 }} tabIndex={0} ref={ref}>
            <Typography id="modal-title" variant="h6" gutterBottom align="center">
                <Button variant="contained" color="error" onClick={closeModal} sx={{ position: "absolute", top: 16, right: 16 }}>Close</Button>
                {row.stock} - OI Trends
            </Typography>

            {/* CE Chart */}
            <Card sx={{ padding: 2, boxShadow: 3, mb: 3 }}>
                <CardContent>
                    <Typography variant="subtitle1" align="center">
                        CE Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                onClick={(e) => toggleLineVisibility(e.dataKey as string)} // Trigger toggle on legend click
                            />
                            <Line
                                type="monotone"
                                dataKey="CE_ShortCovering"
                                stroke="#FF5733"
                                name="CE Short Covering"
                                hide={hiddenLines["CE_ShortCovering"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="CE_ShortBuildup"
                                stroke="#C70039"
                                name="CE Short Buildup"
                                hide={hiddenLines["CE_ShortBuildup"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="CE_LongBuildup"
                                stroke="#900C3F"
                                name="CE Long Build"
                                hide={hiddenLines["CE_LongBuildup"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="CE_LongUnwinding"
                                stroke="#581845"
                                name="CE Short Unwinding"
                                hide={hiddenLines["CE_LongUnwinding"]}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* PE Chart */}
            <Card sx={{ padding: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="subtitle1" align="center">
                        PE Trends
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend
                                onClick={(e) => toggleLineVisibility(e.dataKey as string)} // Trigger toggle on legend click
                            />
                            <Line
                                type="monotone"
                                dataKey="PE_ShortCovering"
                                stroke="#33FF57"
                                name="PE Short Covering"
                                hide={hiddenLines["PE_ShortCovering"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="PE_ShortBuildup"
                                stroke="#39C7C7"
                                name="PE Short Buildup"
                                hide={hiddenLines["PE_ShortBuildup"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="PE_LongBuildUp"
                                stroke="#3F90C7"
                                name="PE Long Build"
                                hide={hiddenLines["PE_LongBuildUp"]}
                            />
                            <Line
                                type="monotone"
                                dataKey="PE_LongUnwinding"
                                stroke="#4585C7"
                                name="PE Short Unwinding"
                                hide={hiddenLines["PE_LongUnwinding"]}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Box>
    );
});

export default LineChartModal;
