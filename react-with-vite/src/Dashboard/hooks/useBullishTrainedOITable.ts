import { useCallback } from "react";
import { IBullishTrainedOIResponse } from "../types";

const useBullishTrainedOIData = () => {
    const cleanBullishTrainedOIData = useCallback((data: IBullishTrainedOIResponse) => {
        return Object.keys(data).map((key, index) => {
            const lastRecord = data[key].times[data[key].times.length - 1];
            return {
                id: index + 1,
                stock: key,
                count: data[key].counter,
                active: data[key].active,
                added_time: lastRecord.added_time,
                removed_time: lastRecord.removed_time,
            };
        });
    }, []);

    return { cleanBullishTrainedOIData };
};

export { useBullishTrainedOIData };