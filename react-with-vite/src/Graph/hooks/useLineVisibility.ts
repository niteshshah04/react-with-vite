import { useState } from 'react';

interface HiddenLines {
    CE_ShortCovering: boolean;
    CE_ShortBuildup: boolean;
    CE_LongBuildup: boolean;
    CE_LongUnwinding: boolean;
    PE_ShortCovering: boolean;
    PE_ShortBuildup: boolean;
    PE_LongBuildUp: boolean;
    PE_LongUnwinding: boolean;
}

export const useLineVisibility = () => {
    const [hiddenLines, setHiddenLines] = useState<HiddenLines>({
        CE_ShortCovering: false,
        CE_ShortBuildup: false,
        CE_LongBuildup: false,
        CE_LongUnwinding: false,
        PE_ShortCovering: false,
        PE_ShortBuildup: false,
        PE_LongBuildUp: false,
        PE_LongUnwinding: false,
    });

    const toggleLineVisibility = (lineKey: string) => {
        setHiddenLines((prevState) => ({
            ...prevState,
            [lineKey]: !prevState[lineKey as keyof HiddenLines],
        }));
    };

    return { hiddenLines, toggleLineVisibility };
}; 