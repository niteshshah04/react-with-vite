import React, { useMemo } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { IBullishOIData } from "../Dashboard/types";
import './BullishOITable.css';

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
  callSelecteddata: any;
}

const TABLE_HEADERS = [
  "id",
  "stock", "ltp", "active", "count", "time",
  // "CE_LB", "CE_LU",
  "CE_SB", "CE_SC",
  // "PE_LB", "PE_LU",
  "PE_SB", "PE_SC",
] as const;

const TableHeader: React.FC<{
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
}> = React.memo(({ order, orderBy, handleSort }) => (
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
));

const TableRowComponent: React.FC<{
  data: IBullishOIData;
  onRowClick: (data: IBullishOIData) => void;
}> = React.memo(({ data, onRowClick }) => {

  return (
    <TableRow hover onClick={() => onRowClick(data)} className="table-row">
      <TableCell>{data?.id}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <span>{data?.stock}</span>
        </div>
      </TableCell>
      <TableCell>{data?.ltp}</TableCell>
      <TableCell>{data?.active.toString()}</TableCell>
      <TableCell>
        {data?.count}{" "}
        {data?.active ? (
          <ArrowUpward
            className="arrow-icon arrow-icon-up"
          />
        ) : (
          <ArrowDownwardIcon
            className="arrow-icon arrow-icon-down"
          />
        )}
      </TableCell>
      <TableCell>{data?.time}</TableCell>
      {/* <TableCell>{data?.CE_LongBuildup}</TableCell> */}
      {/* <TableCell>{data?.CE_LongUnwinding}</TableCell> */}
      <TableCell>{data?.CE_ShortBuildup}</TableCell>
      <TableCell>{data?.CE_ShortCovering}</TableCell>
      {/* <TableCell>{data?.PE_LongBuildUp}</TableCell> */}
      {/* <TableCell>{data?.PE_LongUnwinding}</TableCell> */}
      <TableCell>{data?.PE_ShortBuildUp}</TableCell>
      <TableCell>{data?.PE_ShortCovering}</TableCell>
    </TableRow>
  );
});

const BullishOITable: React.FC<BullishOITableProps> = ({
  order,
  orderBy,
  handleSort,
  bullishOIData,
  getProcessedData,
  filterData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  callSelecteddata
}) => {
  const processedData = useMemo(
    () => getProcessedData(bullishOIData),
    [bullishOIData, getProcessedData]
  );

  const filteredDataLength = useMemo(
    () => filterData(bullishOIData).length,
    [bullishOIData, filterData]
  );

  return (
    <Box p={2}>
      <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3 }}>
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            handleSort={handleSort}
          />
          <TableBody>
            {processedData.length > 0 ? (
              processedData.map((data: IBullishOIData) => (
                <TableRowComponent
                  key={data?.id}
                  data={data}
                  onRowClick={callSelecteddata}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={TABLE_HEADERS.length} align="center">
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

export default React.memo(BullishOITable);
