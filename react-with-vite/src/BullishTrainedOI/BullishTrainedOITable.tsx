import React, { useMemo } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from "@mui/material";
import { IBUllishTrainedOIData } from "../Dashboard/types";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import './BullishTrainedOITable.css';

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

const TABLE_HEADERS = [
  "id",
  "stock",
  "active",
  "count",
  "added time",
  "removed time",
] as const;

const DirectionArrow: React.FC<{ active: boolean }> = React.memo(({ active }) => (
  active ? (
    <ArrowUpward
      className="arrow-up"
    />
  ) : (
    <ArrowDownwardIcon
      className="arrow-down"
    />
  )
));

const BullishTrainedOITable: React.FC<BullishTrainedOITableProps> = React.memo((props) => {
  const {
    order,
    orderBy,
    handleSort,
    bullishTrainedOIData,
    getProcessedData,
    filterData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    callSelecteddata
  } = props;

  const processedData = useMemo(
    () => getProcessedData(bullishTrainedOIData),
    [bullishTrainedOIData, getProcessedData]
  );

  const filteredDataLength = useMemo(
    () => filterData(bullishTrainedOIData).length,
    [bullishTrainedOIData, filterData]
  );

  return (
    <Box p={2}>
      <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3 }}>
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
            {processedData.length > 0 ? (
              processedData.map((data: IBUllishTrainedOIData) => (
                <TableRow 
                  key={data.id} 
                  hover 
                  onClick={() => callSelecteddata(data)} 
                  className="table-row"
              >
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.stock}</TableCell>
                <TableCell>{data.active.toString()}</TableCell>
                <TableCell>
                  {data.count}{" "}
                  <DirectionArrow active={data.active} />
                </TableCell>
                <TableCell>{data.added_time}</TableCell>
                <TableCell>{data.removed_time}</TableCell>
              </TableRow>
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
});

BullishTrainedOITable.displayName = 'BullishTrainedOITable';

export default BullishTrainedOITable;
