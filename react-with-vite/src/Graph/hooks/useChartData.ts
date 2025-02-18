import { useState, useEffect } from 'react';
import { transformData } from "../../Utils/helper";

export const useChartData = (row: any) => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const token = row.stock ? row.stock : row.symbol.replace("-EQ","");
                const response = await fetch(`${API_URL}/api/v1/getOIBuildUp?token=${token}`);
                const data = await response.json();
                setChartData(transformData(data, token));
            } catch (error) {
                console.error('Error fetching graph data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [row]);

    return { chartData, isLoading };
}; 