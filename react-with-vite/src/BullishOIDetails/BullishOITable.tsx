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
    TableSortLabel
  } from "@mui/material";
  import { IBullishOIData } from '../Dashboard/types';

  interface BullishOITableProps {
    order: string;
    orderBy: string;
    handleSort: (col: string) => void;
    bullishOIData: IBullishOIData;
    getProcessedData: (data: any) => void;
    filterData: (data: any) => void;
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

                  {["id", "stock", "ltp", "active", 'count', 'time', 'CE_LB', 'CE_LU', 'CE_SB', 'CE_SC', 'PE_LB', 'PE_LU', 'PE_SB', 'PE_SC'].map((col) => (
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
                {bullishOIData && getProcessedData(bullishOIData).map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.stock}</TableCell>
                    <TableCell>{user.ltp}</TableCell>
                    <TableCell>{user.active.toString()}</TableCell>
                    <TableCell>{user.count}</TableCell>
                    <TableCell>{user.time}</TableCell>
                    <TableCell>{user.CE_LongBuildup}</TableCell>
                    <TableCell>{user.CE_LongUnwinding}</TableCell>
                    <TableCell>{user.CE_ShortBuildup}</TableCell>
                    <TableCell>{user.CE_ShortCovering}</TableCell>
                    <TableCell>{user.PE_LongBuildUp}</TableCell>
                    <TableCell>{user.PE_LongUnwinding}</TableCell>
                    <TableCell>{user.PE_ShortBuildUp}</TableCell>
                    <TableCell>{user.PE_ShortCovering}</TableCell>
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