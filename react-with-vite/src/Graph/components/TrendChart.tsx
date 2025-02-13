import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import './TrendChart.css';

interface TrendChartProps {
    title: string;
    data: any[];
    lines: {
        key: string;
        name: string;
        color: string;
    }[];
    hiddenLines: Record<string, boolean>;
    onLegendClick: (key: string) => void;
    row: any;
}

export const TrendChart: React.FC<TrendChartProps> = ({
    title,
    data,
    lines,
    hiddenLines,
    onLegendClick,
    row
}) => {
    return (
        <Card className="trend-chart-card" sx={{ boxShadow: 3 }}>
            <CardContent>
                <Typography variant="subtitle1" align="center">
                    {row.stock ? row.stock : row.name} - {title}
                </Typography>
                <div className="trend-chart-container">
                    <ResponsiveContainer>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend onClick={(e) => onLegendClick(e.dataKey as string)} />
                            {lines.map(({ key, name, color }) => (
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
                </div>
            </CardContent>
        </Card>
    );
}; 