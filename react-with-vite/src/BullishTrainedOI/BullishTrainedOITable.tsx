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
import { IBUllishTrainedOIData } from "../Dashboard/types";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

interface BullishTrainedOITableProps {
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
  bullishTrainedOIData: IBUllishTrainedOIData[];
  getProcessedData: (data: any) => any[];
  filterData: (data: any) => any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  callSelecteddata: any;
}

const BullishTrainedOITable: React.FC<BullishTrainedOITableProps> = (props) => {
const { order, orderBy, handleSort, bullishTrainedOIData, getProcessedData, filterData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, callSelecteddata } = props;
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
                "stock",
                "active",
                "count",
                "added time",
                "removed time",
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
            {bullishTrainedOIData &&
              getProcessedData(bullishTrainedOIData).map((data: IBUllishTrainedOIData) => (
                <TableRow key={data.id} hover onClick={() => handleRowClick(data)} style={{ cursor: "pointer" }}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.stock}</TableCell>
                  <TableCell>{data.active.toString()}</TableCell>
                  <TableCell>
                      {data.count}{" "}
                      {data.active ? (
                        <ArrowUpward
                          sx={{
                            fontSize: 24,
                            color: `green`,
                            verticalAlign: "middle",
                          }}
                        />
                      ) : (
                        <ArrowDownwardIcon
                          sx={{
                            fontSize: 24,
                            color: `red`,
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                    </TableCell>
                  <TableCell>{data.added_time}</TableCell>
                  <TableCell>{data.removed_time}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        component="div"
        count={filterData(bullishTrainedOIData).length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default BullishTrainedOITable;
