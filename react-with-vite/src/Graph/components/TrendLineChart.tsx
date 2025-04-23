import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CardContent, Typography } from "@mui/material";

interface TrendLineChartProps {
    chartData: any[];
    hiddenLines: Record<string, boolean>;
    onLegendClick: (dataKey: string) => void;
    row: any;
    type: any;
}

const TrendLineChart: React.FC<TrendLineChartProps> = ({ chartData, hiddenLines, onLegendClick, row , type}) => {
    interface LineConfig {
        key: string;
        name: string;
        color: string;
    }

    // Ensure lineConfigs is initialized before use
    const lineConfigs: LineConfig[] = []; // Initialize with an empty array or appropriate default value

    if(type ==='Bullish'){
        lineConfigs.push(
            // { key: 'CE_ShortBuildup', name: 'CE Short Buildup', color: '#C70039' },
            // { key: 'CE_LongBuildup', name: 'CE Long Build', color: '#900C3F' },
            { key: 'CE_ShortCovering', name: 'CE Short Covering', color: 'red' },
            // { key: 'CE_LongUnwinding', name: 'CE Short Unwinding', color: '#581845' },
            { key: 'PE_ShortBuildup', name: 'PE Short Buildup', color: 'green' },
            // { key: 'PE_LongBuildUp', name: 'PE Long Build', color: '#3F90C7' },
            // { key: 'PE_ShortCovering', name: 'PE Short Covering', color: '#33FF57' },
            // { key: 'PE_LongUnwinding', name: 'PE Short Unwinding', color: '#4585C7' }
            { key: 'Average_Bullish', name: 'Average Bullish', color: 'gold' }
        );
    }else if(type ==='Bearish'){
        lineConfigs.push(
            { key: 'CE_ShortBuildup', name: 'CE Short Buildup', color: 'red' },
            // { key: 'CE_LongBuildup', name: 'CE Long Build', color: '#900C3F' },
            // { key: 'CE_ShortCovering', name: 'CE Short Covering', color: 'red' },
            // { key: 'CE_LongUnwinding', name: 'CE Short Unwinding', color: '#581845' },
            // { key: 'PE_ShortBuildup', name: 'PE Short Buildup', color: 'green' },
            // { key: 'PE_LongBuildUp', name: 'PE Long Build', color: '#3F90C7' },
            { key: 'PE_ShortCovering', name: 'PE Short Covering', color: 'green' },
            // { key: 'PE_LongUnwinding', name: 'PE Short Unwinding', color: '#4585C7' }
            { key: 'Average_Bearish', name: 'Average Bearish', color: 'gold' }
        );
    }

    const processedData = chartData.map(data => {
        const averageBullish = (data.CE_ShortCovering + data.PE_ShortBuildup) / 2;
        const averageBearish = (data.CE_ShortBuildup + data.PE_ShortCovering) / 2;
        return {
            ...data,
            Average_Bullish: averageBullish,
            Average_Bearish: averageBearish
        };
    });

    return (
        <CardContent>
            <Typography variant="subtitle1" align="center">
                {row.stock ? row.stock : row.name} - {type}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={processedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={[0, 100]}/>
                    <Tooltip />
                    <Legend onClick={(e) => onLegendClick(e.dataKey as string)} />
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