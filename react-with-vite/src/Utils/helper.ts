
// Data Transformation Function
export const transformData = (dummyData: any, stock: string) => {
    return dummyData[stock].map((item: any) => {
        const [CE_ShortCovering, CE_ShortBuildup, CE_LongBuildup, CE_LongUnwinding] =
            item.CE.split(",").map(Number);
        const [PE_ShortCovering, PE_ShortBuildup, PE_LongBuildUp, PE_LongUnwinding] =
            item.PE.split(",").map(Number);

        return {
            time: item.time.split(":").slice(0, 2).join(":"), // Removing seconds and milliseconds
            CE_ShortCovering,
            CE_ShortBuildup,
            CE_LongBuildup,
            CE_LongUnwinding,
            PE_ShortCovering,
            PE_ShortBuildup,
            PE_LongBuildUp,
            PE_LongUnwinding,
        };
    });
}