import React, { useCallback, useMemo } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from "@mui/material";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import { IBullishOIData } from "../Dashboard/types";
import './BearishOITable.css';

interface BearishOITableProps {
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
  bearishOIData: IBullishOIData[];
  getProcessedData: (data: any) => any[];
  filterData: (data: any) => any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  callSelecteddata: any;
}

const TABLE_COLUMNS = [
  "id",
  "stock",
  "ltp",
  "active",
  // "count",
  "time",
  "PE_SB",
  "CE_SC",
  "CE_LB",
  "CE_LU",
  "CE_SB",
  "PE_LB",
  "PE_LU",
  "PE_SC",
] as const;

const BearishOITable: React.FC<BearishOITableProps> = (props) => {
  const {
    order,
    orderBy,
    handleSort,
    bearishOIData,
    getProcessedData,
    filterData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    callSelecteddata
  } = props;

  const handleRowClick = useCallback((row: IBullishOIData) => {
    callSelecteddata(row);
  }, [callSelecteddata]);

  const TableHeaders = useMemo(() => (
    <TableHead>
      <TableRow>
        {TABLE_COLUMNS.map((col) => (
          <TableCell key={col}>
            <TableSortLabel
              active={orderBy === col}
              direction={orderBy === col ? order : "asc"}
              onClick={() => handleSort(col)}
            >
              {col.toUpperCase()}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  ), [order, orderBy, handleSort]);

  const processedData = useMemo(() => 
    getProcessedData(bearishOIData),
    [bearishOIData, getProcessedData]
  );

  const filteredDataLength = useMemo(() => 
    filterData(bearishOIData).length,
    [bearishOIData, filterData]
  );

  return (
    <Box p={2}>
      <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3 }}>
        <Table>
          {TableHeaders}
          <TableBody>
            {processedData.length > 0 ? (
              processedData.map((data: IBullishOIData) => {
                const highlightClass = Number(data?.CE_SB) > 80 ? "highlight-row" : "";
                const resultStockClass = data?.resultToday ? "result-stock-bearish" : "";
                return (
                  <TableRow 
                    key={data.id} 
                    hover 
                    onClick={() => handleRowClick(data)} 
                    className={`table-row ${highlightClass} ${resultStockClass}`}
                  >
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.stock}
                      {data?.resultToday && (
                        <InsertChartOutlinedOutlinedIcon
                          className="result-icon "
                          style={{ color: "green" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{data.ltp}</TableCell>
                    <TableCell>{data.active.toString()}</TableCell>
                    {/* <TableCell>
                      {data.count}{" "}
                     {data.active ? (
                        <ArrowUpward className="arrow-up-icon" />
                      ) : (
                        <ArrowDownwardIcon className="arrow-down-icon" />
                      )}
                    </TableCell> */} 
                    
                    <TableCell>{data.time}</TableCell>
                    <TableCell>{data?.PE_SB}</TableCell>
                    <TableCell>{data?.CE_SC}</TableCell>
                    <TableCell>{data?.CE_LB}</TableCell>
                    <TableCell>{data?.CE_LU}</TableCell>
                    <TableCell>{data?.CE_SB}</TableCell>
                    <TableCell>{data?.PE_LB}</TableCell>
                    <TableCell>{data?.PE_LU}</TableCell>
                    
                    <TableCell>{data?.PE_SC}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredDataLength}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default React.memo(BearishOITable);
