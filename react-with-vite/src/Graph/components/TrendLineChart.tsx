import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CardContent, Typography } from "@mui/material";

interface TrendLineChartProps {
    chartData: any[];
    hiddenLines: Record<string, boolean>;
    onLegendClick: (dataKey: string) => void;
    row: any;
}

const TrendLineChart: React.FC<TrendLineChartProps> = ({ chartData, hiddenLines, onLegendClick, row }) => {
    const lineConfigs = [
        { key: 'CE_ShortCovering', color: '#FF5733', name: 'CE Short Covering' },
        { key: 'CE_ShortBuildup', color: '#C70039', name: 'CE Short Buildup' },
        { key: 'CE_LongBuildup', color: '#900C3F', name: 'CE Long Build' },
        { key: 'CE_LongUnwinding', color: '#581845', name: 'CE Short Unwinding' },
        { key: 'PE_ShortCovering', color: '#33FF57', name: 'PE Short Covering' },
        { key: 'PE_ShortBuildup', color: '#39C7C7', name: 'PE Short Buildup' },
        { key: 'PE_LongBuildUp', color: '#3F90C7', name: 'PE Long Build' },
        { key: 'PE_LongUnwinding', color: '#4585C7', name: 'PE Short Unwinding' },
    ];

    return (
        <CardContent>
            <Typography variant="subtitle1" align="center">
                {row.stock ? row.stock : row.name} - CE / PE Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend onClick={(e) => onLegendClick(e.value)} />
                    {lineConfigs.map(({ key, color, name }) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={color}
                            name={name}
                            hide={hiddenLines[key]}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    );
};

export default TrendLineChart; 