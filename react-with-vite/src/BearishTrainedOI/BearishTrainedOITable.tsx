import React, { useMemo } from "react";
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

interface BearishTrainedOITableProps {
  order: "asc" | "desc";
  orderBy: string;
  handleSort: (col: string) => void;
  bearishTrainedOIData: IBUllishTrainedOIData[];
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

const BearishTrainedOITable: React.FC<BearishTrainedOITableProps> = React.memo((props) => {
  const {
    order,
    orderBy,
    handleSort,
    bearishTrainedOIData,
    getProcessedData,
    filterData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    callSelecteddata
  } = props;

  const processedData = useMemo(() => 
    getProcessedData(bearishTrainedOIData),
    [bearishTrainedOIData, getProcessedData]
  );

  const filteredDataLength = useMemo(() => 
    filterData(bearishTrainedOIData).length,
    [bearishTrainedOIData, filterData]
  );

  const renderArrowIcon = (active: boolean) => 
    active ? (
      <ArrowUpward
        sx={{
          fontSize: 24,
          color: 'green',
          verticalAlign: "middle",
        }}
      />
    ) : (
      <ArrowDownwardIcon
        sx={{
          fontSize: 24,
          color: 'red',
          verticalAlign: "middle",
        }}
      />
    );

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
            {processedData.map((data: IBUllishTrainedOIData) => (
              <TableRow 
                key={data.id} 
                hover 
                onClick={() => callSelecteddata(data)} 
                style={{ cursor: "pointer" }}
              >
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.stock}</TableCell>
                <TableCell>{data.active.toString()}</TableCell>
                <TableCell>
                  {data.count} {renderArrowIcon(data.active)}
                </TableCell>
                <TableCell>{data.added_time}</TableCell>
                <TableCell>{data.removed_time}</TableCell>
              </TableRow>
            ))}
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

BearishTrainedOITable.displayName = 'BearishTrainedOITable';

export default BearishTrainedOITable;
