
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