import { useState, useEffect } from 'react';
import { transformDataWithStrikePice } from "../../Utils/helper";

export const useOIBuildUpData = (row: any) => {
    const [oiBuildUpData, setOIBuildUpData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const token = row.stock ? row.stock : row.name;
                const response = await fetch(`${API_URL}/api/v1/getOIData?sybmol=${token}`);
                const data = await response.json();
                setOIBuildUpData(transformDataWithStrikePice(data, token));
            } catch (error) {
                console.error('Error fetching graph data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [row]);

    return { oiBuildUpData, isLoading };
}; 