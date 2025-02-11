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

type NotificationData = {
    stock: string;
    message: string;
    time: string;
}

interface NotificationTableProps {
 notificationData: NotificationData[];
 orderBy: string;
 order: "asc" | "desc";
 handleSort: (col: string) => void;
 page: number;
 rowsPerPage: number;
 handleChangePage: (event: unknown, newPage: number) => void;
 handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = (props) => {
const { notificationData, orderBy, order, handleSort, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = props;

return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "id",
                "stock",
                "time",
                "message"
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
            {notificationData &&
              notificationData?.map((data: NotificationData, index: number) => (
                <TableRow key={index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.stock}</TableCell>
                  <TableCell>{data.time}</TableCell>
                  <TableCell>{data.message}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        component="div"
        count={notificationData?.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default NotificationTable;
