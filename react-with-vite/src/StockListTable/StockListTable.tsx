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
    stockData: INiftyStockList;
    getProcessedData: (data: any) => any[];
    filterData: (data: any) => any[];
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    callSelecteddata: any;
}


const StockListTable: React.FC<StockListTableProps> = (props) => {
    const { order, orderBy, handleSort, stockData, getProcessedData, filterData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, callSelecteddata } = props;
    const handleRowClick = (row: any) => {
      callSelecteddata(row);
    }
    return (
        <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "id",
                  "symbol",
                  "name",
                  "close price",
                  "exchange seg",
                  "nifty50",
                  "lotsize",
                  "sector",
                  "exchange type",
                  "high",
                  "ath"
                ].map((col) => (
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
                getProcessedData(stockData).map((data: INiftyStockList) => (
                  <TableRow key={data.id} hover onClick={() => handleRowClick(data)} style={{ cursor: "pointer" }}>
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
                ))}
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
          rowsPerPageOptions={[3, 5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
};

export default StockListTable;