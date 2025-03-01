import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
  } from "@mui/material";
import { INiftyStockList } from "../Dashboard/types";

interface StockListTableProps {
    order: "asc" | "desc";
    orderBy: string;
    handleSort: (col: string) => void;
    stockData: INiftyStockList[];
    getProcessedData: (data: any) => any[];
    filterData: (data: any) => any[];
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    callSelecteddata: (data: INiftyStockList) => void;
}

const TABLE_HEADERS = [
  "id",
  "symbol",
  "name",
  "close price",
  "exchange seg",
  "nifty50",
  "lot size",
  "sector",
  "exchange type",
  "high",
  "ath"
] as const;

const StockListTable: React.FC<StockListTableProps> = (props) => {
    const { order, orderBy, handleSort, stockData, getProcessedData, filterData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, callSelecteddata } = props;
    return (
        <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEADERS.map((col) => (
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
            <TableBody>
              {stockData &&
                getProcessedData(stockData).length > 0 ?
                getProcessedData(stockData).map((data: INiftyStockList) => (
                <TableRow 
                  key={data.id} 
                  hover 
                  onClick={() => callSelecteddata(data)} 
                  className="table-row"
                >
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.symbol}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.closePrice}</TableCell>
                    <TableCell>{data.exchangeSeg}</TableCell>
                    <TableCell>{data.nifty50.toString()}</TableCell>
                    <TableCell>{data.lotSize}</TableCell>
                    <TableCell>{data.sector}</TableCell>
                    <TableCell>{data.exchangeType}</TableCell>
                    <TableCell>{data.high}</TableCell>
                    <TableCell>{data.ath}</TableCell>
                  </TableRow>
                ))
                 : (
                  <TableRow>
                    <TableCell colSpan={TABLE_HEADERS.length} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          component="div"
          count={filterData(stockData).length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 20]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
};

export default StockListTable;