import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TablePagination } from "@mui/material";
import { NotificationTableHeader } from './components/NotificationTableHeader';
import { useNotificationTable } from './hooks/useNotificationTable';
import { NotificationTableProps } from './types';
import { ROWS_PER_PAGE_OPTIONS } from './constants/tableConstants';

const NotificationTable: React.FC<NotificationTableProps> = React.memo((props) => {
  const { 
    notificationData, 
    orderBy, 
    order, 
    handleSort, 
    page, 
    rowsPerPage, 
    handleChangePage, 
    handleChangeRowsPerPage 
  } = props;

  const { sortedData } = useNotificationTable(notificationData, orderBy, order);

  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <NotificationTableHeader 
            orderBy={orderBy}
            order={order}
            handleSort={handleSort}
          />
          <TableBody>
            {sortedData.map((data, index) => (
              <TableRow key={`notification-${index}`} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.stock}</TableCell>
                <TableCell>{data.time}</TableCell>
                <TableCell>{data.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={notificationData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
});

NotificationTable.displayName = 'NotificationTable';

export default NotificationTable;
