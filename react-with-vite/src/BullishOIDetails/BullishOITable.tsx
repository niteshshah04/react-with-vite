import React from "react";
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
import { IBullishOIData } from "../Dashboard/types";

interface BullishOITableProps {
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
  bullishOIData: IBullishOIData[];
  getProcessedData: (data: any) => any[];
  filterData: (data: any) => any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BullishOITable: React.FC<BullishOITableProps> = (props) => {
  const { order, orderBy, handleSort, bullishOIData, getProcessedData, filterData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = props;
  return (
    <div>
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "id",
                  "stock",
                  "ltp",
                  "active",
                  "count",
                  "time",
                  "CE_LB",
                  "CE_LU",
                  "CE_SB",
                  "CE_SC",
                  "PE_LB",
                  "PE_LU",
                  "PE_SB",
                  "PE_SC",
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
              {bullishOIData &&
                getProcessedData(bullishOIData).map((data: IBullishOIData) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.stock}</TableCell>
                    <TableCell>{data.ltp}</TableCell>
                    <TableCell>{data.active.toString()}</TableCell>
                    <TableCell>{data.count}</TableCell>
                    <TableCell>{data.time}</TableCell>
                    <TableCell>{data.CE_LongBuildup}</TableCell>
                    <TableCell>{data.CE_LongUnwinding}</TableCell>
                    <TableCell>{data.CE_ShortBuildup}</TableCell>
                    <TableCell>{data.CE_ShortCovering}</TableCell>
                    <TableCell>{data.PE_LongBuildUp}</TableCell>
                    <TableCell>{data.PE_LongUnwinding}</TableCell>
                    <TableCell>{data.PE_ShortBuildUp}</TableCell>
                    <TableCell>{data.PE_ShortCovering}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          component="div"
          count={filterData(bullishOIData).length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[3, 5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

export default BullishOITable;
