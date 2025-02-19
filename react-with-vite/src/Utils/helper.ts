
// Data Transformation Function
export const transformData = (dummyData: any, stock: string) => {
    return dummyData[stock].map((item: any) => {
        const [CE_ShortBuildup, CE_LongBuildup, CE_ShortCovering, CE_LongUnwinding] =
            item?.CE?.split(",").map(Number) || [0, 0, 0, 0];
        const [PE_ShortBuildup, PE_LongBuildUp, PE_ShortCovering, PE_LongUnwinding] =
            item?.PE?.split(",").map(Number) || [0, 0, 0, 0];

        return {
            time: item?.time?.split(":").slice(0, 2).join(":") || "", // Removing seconds and milliseconds
            CE_ShortBuildup,
            CE_LongBuildup,
            CE_ShortCovering,
            CE_LongUnwinding,
            PE_ShortBuildup,
            PE_LongBuildUp,
            PE_ShortCovering,
            PE_LongUnwinding,
        };
    });
}


export const transformDataWithStrikePice = (dummyData: any, stock: string) => {
    let groupedData: any;

    if (Array.isArray(dummyData)) {
        groupedData = dummyData.reduce((acc: any, item: any) => {
            const strikePrice = item.strikePrice;
            if (!acc[strikePrice]) {
                acc[strikePrice] = [];
            }
            const symbolType = item.symbol.includes("CE") ? "CE" : "PE";
            if (!acc[strikePrice][symbolType]) {
                acc[strikePrice][symbolType] = [];
            }
            acc[strikePrice][symbolType] = item;
            return acc;
        }, {});
    } else {
        groupedData = dummyData[stock].reduce((acc: any, item: any) => {
            const strikePrice = item.strikePrice;
            if (!acc[strikePrice]) {
                acc[strikePrice] = [];
            }
            const symbolType = item.symbol.includes("CE") ? "CE" : "PE";
            if (!acc[strikePrice][symbolType]) {
                acc[strikePrice][symbolType] = [];
            }
            acc[strikePrice][symbolType] = item;
            return acc;
            }, {});
    }

    return groupedData;
}