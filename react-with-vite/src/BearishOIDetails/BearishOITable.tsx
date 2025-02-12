import React, { useCallback, useMemo } from "react";
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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { IBullishOIData } from "../Dashboard/types";

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
      <TableContainer component={Paper}>
        <Table>
          {TableHeaders}
          <TableBody>
            {processedData.map((data: IBullishOIData) => (
              <TableRow 
                key={data.id} 
                hover 
                onClick={() => handleRowClick(data)} 
                style={{ cursor: "pointer" }}
              >
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.stock}</TableCell>
                <TableCell>{data.ltp}</TableCell>
                <TableCell>{data.active.toString()}</TableCell>
                <TableCell>
                  {data.count}{" "}
                  {data.active ? (
                    <ArrowUpward
                      sx={{
                        fontSize: 24,
                        color: "green",
                        verticalAlign: "middle",
                      }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        fontSize: 24,
                        color: "red",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </TableCell>
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
